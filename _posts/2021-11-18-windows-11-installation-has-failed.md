---
layout: single
permalink: /blog/2021/11/18/windows-11-installation-has-failed😭💪😘
author: max
title:  "Windows 11 installation has failed"
date:   2021-11-18 00:00:00 +1100
categories:
  - blog
tags:
  - windows-11
  - setup
  - failed
redirect_from:
  -  /blog/2021/11/18/windows-11-installation-has-failed
header:
  overlay_image: /assets/images/posts/windows11upgrade/windows-11-installation-has-failed-banner.png
---

If you have been attempting to upgrade to Windows 11 and having issues then read on!

It would be amazing if everyone would go out and buy the latest PC's with the latest TPM and latest CPU and install windows 11 on it following the supported pathway. Well, in reality, most people will update their existing Windows 10 to Windows 11; that's just logical, right?

So this is my case; I have updated my registry to allow installation with unsupported CPU as follows:

```
[HKEY_LOCAL_MACHINE\SYSTEM\Setup\MoSetup]
"AllowUpgradesWithUnsupportedTPMOrCPU"=dword:00000001
```

Downloaded an ISO from [Micorosfts Download Windows 11](https://www.microsoft.com/software-download/windows11) and created a USB using [Rufus](https://rufus.ie/en/). Then I started setup from the USB and waited patiently for the 100% on this screen:

![Windows 11 setup progress](/assets/images/posts/windows11upgrade/windows-11-setup-progress.png)

Not surprisingly, this screen closed and just gave me an good-old self explanatory error message:

![Windows 11 installation has failed](/assets/images/posts/windows11upgrade/windows-11-installation-has-failed.png)

Typical as it is, googling will not help; no one knows why it is failing on my PC.

In this case, Uncle Bill is relying on you to fix your problem, as he has already given you all the tools and give you all the bread crumbs to follow.

So let's see if you can find your issue and fix it.

- open Event Viewer
- open Application Log
- start at the top and look for information entry for the upgrade process failure (yeah, breadcrumbs)
- when you find the log entry, it should list a bunch of log files, open the top Setup log file
- scroll to the bottom of the setup log file and scroll up slowly, looking for ERROR lines; you can also search for the `aborting` keyword from the bottom up
- now you should be finding some real breadcrumbs

The log should tell you why it aborted the install. The reasons for this are specific to your PC, so you would need to do some googling to fix them.

My setup aborted because it detected a duplicate account without a profile, so I deleted that in the registry, restarted and ran the install successfully. You should be able to google all the issues that will appear in the log and fix them one by one. I feel that the upgrade process is probably the same as the old process, so it's going to have similar issues and existing solutions.

I hope this will help; leave a comment if it did, or leave your errors for others to know about.
