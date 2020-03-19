---
layout: single
permalink: /blog/2013/10/05/my-move-from-polar-to-garmin
author: max
title:  "My move from Polar to Garmin"
date:   2013-10-05 00:00:00 +1100
categories:
  - blog
tags:
  - running
  - polar
  - garmin
---

I've finally completed my journey from Polar to Garmin. Just after I started running 3 years ago and before my first marathon I bough my self a training watch and a GPS from Polar. The version at the time I settled for was RXS800 with a matching GPS unit. That watch saw me though my first marathon, several races, athletics events and another 3 marathons. I think it was a worthy investment now that I look over the amount of activities I accumulated in the Polar Pro Trainer.

Despite the times that Polar saw me though, before my last marathon I switched to a Garmin 900xt, this was largely because the GPS unit on Polar take way to long to find satellites, its not water-off (more on this later) and its separate from the watch (only so many times half way though your run you realize that GPS is back home and then you look with envy at all the Garmin users).

The GPS unit for Polar run of a AA battery, which you have to make sure you charge pretty much before each run. The unit it self gives you little indication that it will run out of juice by the time you are done. As I mentioned earlier its not actually water proof. I would say its splash proof, submersion proof or what ever you want to call it, but as long as it describes the usage withing first ~50 battery replacements after coming out of the box. This is is because after a while the O-ring on the round battery door stops being effective, as the whole door comes out! After this happens and you get it wet it turns into a paperweight.

Moving right along, I've switched to Garmin, I use their Garmin online offering [1] and I sync activities to Strava [2] automatically [3]! Cool right! Yes, but. All my polar activities still sat in the Polar Pro Trainer, which is a desktop software, its ok but in this day and age its a little 90's nostalgia. I've tried Polar's online offering and its not Garmin and its not Strava, its clinically sterile which is not always about fun.

Anyways, my transition Polar and Garmin was quick and it did not effect my training, but I can say that much for the amount of exercise data that I collected in the Polar Pro Trainer. There is no actual working migration tools available to do this painlessly and I did not want to write one. I tried all the tools available on both  Mac and Windows including import and cleanup mechanisms and found the following process to work like a charm.

Over all process is to convert your Polar GPX and HRM files to TCX files [4] then import them into Garmin's Training Center [5], then use Garmin Training Center and upload those activities in bulk to Garmin and you are in business! If you are syncing from Garmin to Strava [3], go to Garmin and set default activity privacy to Everyone before you do a bulk upload from Garmin Training Center. This will save you lots of time after :)

Good luck and keep running!

Links

1. http://connect.garmin.com/
2. http://www.strava.com
3. http://www.copymysports.com/
4. http://github.com/wildone/gpx2tcx
5. http://www8.garmin.com/support/collection.jsp?product=999-99999-04
