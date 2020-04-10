---
layout: single
permalink: /blog/2020/04/10/downloading-files-from-rss-with-jdownloader-packegizer💻💥😍
author: max
title:  "Downloading Files from RSS with Jdownloader Packegizer"
date:   2020-04-10 00:00:00 +1100
categories:
  - blog
tags:
  - jdownloader
  - packegizer
  - rss
  - xslt
redirect_from:
  -  /blog/2020/04/10/downloading-files-from-rss-with-jdownloader-packegizer
---

# Intro 

I wanted to download some podcasts from an RSS feed, here is how to do this with help of RSS, XML Tools and JDownloader (be care full downloading this, Ill make a safe source verison of this some day)

To do this I just transformed the RSS into a list of good URLS with appended #TITLE and used JDownloaded Packagizer Rule to rename downloaded fiels.

# RSS Source
https://feeds.megaphone.fm/WWO4858695911

This source has a bunch of generated names but I want to use "# - Title" as good file name.

# XSLT for RSS 

You can run it here https://maxbarrass.com/tools/xml-transform, download the RSS source and transform it, you will get a list of urls with #title, we will use this # in jdownloader to create proper names for files.

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <xsl:output method="xml" omit-xml-declaration="yes" indent="yes" encoding="utf-16"/>
  <xsl:template match="/">
    <xsl:apply-templates/>
  </xsl:template>
  <xsl:template match="//channel">
<xsl:for-each select="//item">
<xsl:apply-templates select="enclosure/@url" mode="fixtext"/>
                <xsl:text>#</xsl:text>
          <xsl:if test="not(string(itunes:episode))">
         <xsl:value-of select="concat(normalize-space(title),'.mp3')"/>
        </xsl:if>
        <xsl:if test="string(itunes:episode)">
         <xsl:value-of select="concat(itunes:episode,' - ',normalize-space(title),'.mp3')"/>
        </xsl:if>
      <xsl:text>
</xsl:text>
    </xsl:for-each>
  </xsl:template>
  <xsl:template match="*" mode="fixtext" >
<xsl:value-of select="normalize-space(.)" />
  </xsl:template>
</xsl:stylesheet>
```

# Jdownloader Setup

Packegizer rule - HTML RSS Links
- If
  - Sourceurls(s) using Regex: .*#(.*)
    - this will split url into group wich will be everything after #
- Then
  - Filename: <jd:source:1>
    - this will grab proper name for our download file
    
    
Thats all save and copy your link you will now see a list of RSS link to download with proper titles.

# Reference 

Here is a list of config variable that can be used in [Jdownloader Packegizer rules config](https://board.jdownloader.org/showpost.php?p=421993&postcount=2).

```
<jd:append>
-> this placeholder will be replaced by previous value where the placeholder is being used in

<jd:prop:KEY>
-> this placeholder reads out an internal property of the downloadlink itself. properties are plugin specific and there are plans that plugins can return a list of supported properties that can be used here

<jd:indexof>
-> this placeholder will be replaced by number of index of the downloadlink within its package. first link will be 1, second link will be 2 and so on. It's just the index within the package!
-> will be replaced in real time

<jd:subfolderbyplugin>
-> some plugins support recursive folder support. if supported by plugin, then the downloads will have same directory structure like shown in browser

<jd:env:KEY>
-> this placeholder will be replaced by KEY environment variable of your system
-> will be replaced in real time

<jd:orgfilename> <jd:orgfilename:number>
-> this placeholder will be replaced by original filename or matching group(number) of filename pattern

<jd:packagename>
-> this placeholder will be replaced by the current package name
-> will be replaced in real time

<jd:orgfiletype> <jd:orgfiletype:Pattern>
-> this placeholder will be replaced by the file extension of the file or the match of the given pattern

<jd:orgfilenamewithoutext>
-> this placeholder will be replaced by original filename without file extension

<jd:hoster:number>
-> this placeholder will be replaced by the matching group(number) of downloadurl pattern or the host itself if number is -1

<jd:source:(number)pattern>
-> this placeholder will be replaced by the match of sourceurl pattern. with number you can specify which sourceurl to process

<jd:simpledate:simpleDateFormatString>
-> this placeholder will be replaced by time formatted with simpleDateFormatString, see docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html
-> will be replaced in real time

<jd:orgpackagename>
-> this placeholder will be replaced by the original package name
```
