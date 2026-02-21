---
layout: single
permalink: /blog/2026/02/17/fixing-openclaw-gateway-powershell7-path-errors
author: max
title:  "Fixing OpenClaw Gateway: Forcing PowerShell 7 and Handling Path Errors"
date:   2026-02-17 00:00:00 +1100
categories:
  - blog
tags:
  - openclaw
  - powershell
  - windows
  - nvm4w
header:
  overlay_image: /assets/images/posts/2026/openclaw-pwsh.png
---

If you're running OpenClaw on Windows using NVM4W, you've likely run into two major headaches:

1. **OpenClaw runs in PowerShell.** The gateway runs via a .cmd file that ultimately executes in PowerShell, which forces a visible window to stay open and causes parsing bugs (e.g., `#` in paths gets treated as a comment).

2. **Hardcoded PATH params.** The generated gateway bakes in the PATH at install time. New apps (Node versions, tools) you install later never appear—the gateway keeps using the frozen PATH snapshot, so your new tools are invisible to OpenClaw.

Here is the "Smart Bridge" solution I developed to force OpenClaw into PowerShell 7 (pwsh) while using your current system PATH—so new apps actually show up. When the process starts, a window will appear; that's where you can see your gateway logs, and it runs in pwsh instead of CMD.

![OpenClaw gateway running in pwsh](/assets/images/posts/2026/openclaw-pwsh.png)

## The Problem

OpenClaw generates a `gateway.cmd` that hardcodes environment variables and the system PATH. Because it runs in PowerShell, you get a visible window, and paths with `#` break. Worse, that hardcoded PATH never updates: install a new Node via NVM or add a new tool, and OpenClaw won't see it.

## The Solution: The Smart Bridge Script

Instead of editing the generated .cmd file every time OpenClaw updates, we use a PowerShell Bridge. This script reads the configuration (Port, Token) from the .cmd file but ignores the PATH variable, allowing pwsh to use your modern system paths.

### 1. Create config.json

Create `~/.openclaw/config.json` with this content so OpenClaw uses pwsh as the gateway shell:

```json
{
  "gateway": {
    "shell": "pwsh"
  }
}
```

### 2. Create gateway.ps1

Save this in `~/.openclaw/gateway.ps1`:

```powershell
# 1. Force pwsh as the shell
$env:SHELL = "pwsh"

# 2. Path to your existing gateway.cmd
$cmdFile = Join-Path $PSScriptRoot "gateway.cmd"

# 3. Parse the CMD file, ignoring PATH and empty lines
Get-Content $cmdFile | ForEach-Object {
    $line = $_.Trim()
    
    # Extract SET commands, but SKIP 'set PATH='
    if ($line -match '^set\s+(?!PATH=)([^=]+)=(.*)$') {
        $name = $Matches[1].Trim()
        $value = $Matches[2].Trim()
        
        # Expand any existing %variables% 
        $expandedValue = [System.Environment]::ExpandEnvironmentVariables($value)
        
        # FIX: Use Set-Item on the env: drive to avoid the ParserError
        Set-Item -Path "env:$name" -Value $expandedValue
    }
    
    # 4. Find and run the execution line
    if ($line -match 'node\.exe' -or $line -match 'node\s') {
        $execLine = $line -replace '^@?echo\s+off\s*', ''
        
        # Execute the command exactly as written in the CMD file
        Invoke-Expression "& $execLine"
    }
}
```

### 3. Update the Windows Task Scheduler

Windows Task Scheduler is notoriously bad at handling special characters in the "Arguments" field. To fix this, we Base64 encode the launch command.

Run this in an Elevated (Admin) PowerShell window to update your existing OpenClaw task:

```powershell
# 1. Resolve ~/.openclaw path (works for any user)
$scriptPath = Join-Path $HOME ".openclaw\gateway.ps1"
$command = "& { & '$scriptPath' }"

# 2. Encode to Base64 to bypass Task Scheduler parsing bugs
$bytes = [System.Text.Encoding]::Unicode.GetBytes($command)
$encoded = [Convert]::ToBase64String($bytes)

# 3. Apply to the existing task
$Action = New-ScheduledTaskAction -Execute "pwsh.exe" `
    -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -EncodedCommand $encoded"

Set-ScheduledTask -TaskName "OpenClaw Gateway" -Action $Action

# 4. Restart the task
Stop-ScheduledTask -TaskName "OpenClaw Gateway" -ErrorAction SilentlyContinue
Start-ScheduledTask -TaskName "OpenClaw Gateway"
```

Once the update is done, run `openclaw gateway start` to start the gateway.

## Why this is the ultimate fix

- **Runs in pwsh:** The gateway runs in PowerShell 7 instead of CMD. When it starts, a window appears—that's where you can see your logs—and it's pwsh, so PATH handling, `#` in paths, and your modern tools work correctly.
- **Path Safety:** The `#` in paths like `C:\data\apps\#dev` is handled correctly by using Invoke-Expression and EncodedCommand, so PowerShell doesn't treat it as a comment.
- **Live PATH:** By ignoring the hardcoded PATH in the .cmd file, pwsh uses your current system PATH. New apps you install (Node versions, CLI tools) appear automatically—no reinstall of OpenClaw needed.

## Verification

Once the gateway has started, you can confirm the scheduled task is running with:

```powershell
Get-ScheduledTask -TaskName "OpenClaw Gateway" | Select-Object TaskName, State
```

![OpenClaw Gateway scheduled task status](/assets/images/posts/2026/openclaw-schtasks.png)
