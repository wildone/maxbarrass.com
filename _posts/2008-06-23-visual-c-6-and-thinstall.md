---
layout: single
permalink: /blog/2008/06/23/liquid-cooled-monolith
author: max
title:  "Visual C++ 6 and Thinstall"
date:   2008-06-23 00:00:00 +1100
categories:
  - blog
tags:
  - visual-c
  - thinstall
---

To make VC6 work in Thinstall environment makesure you change all installation paths to a path that does not contain spaces, example:

default path is:
```
c:\program files\microsoft visual studio
```

isntead use:
```
c:\ms\mvs\
```

if you dont do this you will get errors when compiling, errors such as:
- error executing ~vecchio!Compiling
- error spawning VcSpawn exe

Also dont forget to set up the path entries, here is the ```HKEY_LOCAL_MACHINE.txt``` entry if you are missing it:

```
isolation_writecopy HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment Value=MSVCDir REG_SZ~C:\MS\MVS\VC98#00 Value=MSDevDir REG_SZ~C:\MS\MVS\Common\msdev98#00 Value=INCLUDE REG_SZ~C:\MS\MVS\VC98\ATL\INCLUDE;C:\MS\MVS\VC98\INCLUDE;C:\MS\MVS\VC98\MFC\INCLUDE;#00 Value=LIB REG_SZ~C:\MS\MVS\VC98\LIB;C:\MS\MVS\VC98\MFC\LIB;#00 Value=VirtualPath REG_SZ~C:\MS\MVS\Common\msdev98\BIN;C:\MS\MVS\VC98\BIN;C:\MS\MVS\Common\TOOLS;C:\MS\MVS\Common\TOOLS\WINNT;#25windir#25\SYSTEM;#25PATH#25#00
```

In addition place the MFC42.dll and MSVCRT.dll into %SystemSystem% directory, this will work for XP, you can find them DLL's in windows\system32 dir. If you want to make VC6 work through thininstall on a Windows 2003 box, copy the respective DLL's from the Windows 2003, they should be a newer version. Same goes for Windows 2008.