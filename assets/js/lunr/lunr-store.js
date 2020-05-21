var store = [{
        "title": "SQL 2005 XML XQuery: Ignore Namespaces",
        "excerpt":"A dba mentioned to change XML schema of the xml being save to the database, not to include namespaces….well why not just ignore them. Tested on: SQL 2005. WORKS WITHOUT NAMESPACE DECLARE @xmlDoc xml SET @xmlDoc = ' &lt;authors xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"&gt; &lt;child&gt; &lt;id&gt;77696c646f6e65&lt;/id&gt; &lt;lname&gt;Barrass&lt;/lname&gt; &lt;fname&gt;Max&lt;/fname&gt; &lt;/child&gt; &lt;/authors&gt;' select @xmlDoc.query('data(/authors/child/id)') as...","categories": ["blog"],
        "tags": ["sql-2005","xml-xquery"],
        "url": "https://maxbarrass.com/blog/2008/02/04/sql-2005-xml-xquery-ignore-namespaces",
        "teaser": null
      },{
        "title": "Liquid Cooled Monolith!",
        "excerpt":"Well the project has been in the air for a while, but now its getting some needed objectification.   You can check out work log by clicking the image above or on this New Rig Worklog  ","categories": ["blog"],
        "tags": ["new-pc","custom-build"],
        "url": "https://maxbarrass.com/blog/2008/02/05/liquid-cooled-monolith",
        "teaser": null
      },{
        "title": "Visual C++ 6 and Thinstall",
        "excerpt":"To make VC6 work in Thinstall environment makesure you change all installation paths to a path that does not contain spaces, example: default path is: c:\\program files\\microsoft visual studio isntead use: c:\\ms\\mvs\\ if you dont do this you will get errors when compiling, errors such as: error executing ~vecchio!Compiling error...","categories": ["blog"],
        "tags": ["visual-c","thinstall"],
        "url": "https://maxbarrass.com/blog/2008/06/23/liquid-cooled-monolith",
        "teaser": null
      },{
        "title": "Life",
        "excerpt":"Was doing a bit of pondering yesterday, on life, as you do.The main point that was constantly being in the spotlight is the inability to control your thoughts.The fact that your thoughts are controlled not by you but by the reality you actively participate in. This paradox reminded me of...","categories": ["blog"],
        "tags": ["life","thoughts"],
        "url": "https://maxbarrass.com/blog/2008/07/21/life",
        "teaser": null
      },{
        "title": "Monolith is complete!",
        "excerpt":"More than a year ago I set off on a journey to build a custom PC Case, that journey lead me to building a water-cooled monolith. Initial requirements were to ensure that the rig would be scalable to the ever changing hardware market and have capacity to manage the ever...","categories": ["blog"],
        "tags": ["new-pc","custom-build"],
        "url": "https://maxbarrass.com/blog/2009/01/15/monolith-is-complete",
        "teaser": null
      },{
        "title": "SQL 2008 Full-text index Add button is disabled!",
        "excerpt":"I restored an SQL 2000 database to sql 2008 server, upgraded etc, but the Full-text index menu uption is disable, obviously full-text indexing is always on in SQL 2008 but the MS Studio looks like using options from the past so to check if this is the case for you...","categories": ["blog"],
        "tags": ["sql-2008","full-text-index"],
        "url": "https://maxbarrass.com/blog/2009/03/18/sql-2008-full-text-index-add-button-is-disabled",
        "teaser": null
      },{
        "title": "TreeView in Office 2010 - ActiveX Control Workaround",
        "excerpt":"Getting the ActiveX controls working in Office 2010 is easy, but making sure every one has those controls is not so. Here is my solution for this, I was unable to find anything sustainable so I had to do it my self. I had a dilema geting a TreeView control...","categories": ["blog"],
        "tags": ["office","treeview","activex"],
        "url": "https://maxbarrass.com/blog/2010/07/23/treeview-in-office-2010-activex-control",
        "teaser": null
      },{
        "title": "Training for your first marathon.",
        "excerpt":"I remember starting out training for my first marathon not long just over 8 months ago now, never ran long distance before that, never thought I could but was fortunate to have some people around me who helped me with some words of wisdom. I followed the LSD style of...","categories": ["blog"],
        "tags": ["marathon","training"],
        "url": "https://maxbarrass.com/blog/2010/09/15/training-for-your-first-marathon",
        "teaser": null
      },{
        "title": "How to pair iPhone and Blueant ST3...",
        "excerpt":"If you are having trouble pairing your iPhone4 with Blueant ST3, try to turn off Blueant by holding down the green button, once off press and hold the green button to reset to factory a settings. Then use iPhone Bluetooth detected devices to pair both devices.  ","categories": ["blog"],
        "tags": ["iphone","blueant-st3"],
        "url": "https://maxbarrass.com/blog/2010/10/04/how-to-pair-iphone4-and-blueant-st3",
        "teaser": null
      },{
        "title": "How to manually update iPhone 4 from ipsw file?",
        "excerpt":"I followed the following steps to restore my iPhone from IPSW file: These steps are for the following scenarios: Your download in iTunes does not work! You have lots of iPhones and you don’t want to download the file for all of them! You just want to be a geek!...","categories": ["blog"],
        "tags": ["iphone","restore","ipsw"],
        "url": "https://maxbarrass.com/blog/2010/11/24/how-to-manually-update-iphone-4-from",
        "teaser": null
      },{
        "title": "VBA Try...Catch...Finally",
        "excerpt":"When writing function and in particular custom error handling in VBA please remember this common patern for error handling when using “On Error”. Function template: Sub|Function SomeName() On Error GoTo Err_SomeName ‘ Initialize error handling. ‘ Code to do something here. Exit_SomeName: ‘ Label to resume after error. Exit Sub|Function...","categories": ["blog"],
        "tags": ["vba","try-catch-finally"],
        "url": "https://maxbarrass.com/blog/2011/09/09/vba-try-catch-finally",
        "teaser": null
      },{
        "title": "VBA and Office 2013",
        "excerpt":"I’ve installed office 2013 Preview and found one of my projects not working in my case it was WebBrowser component. Well turns out bunch of ActiveX controls are disabled to protect you from yourself. But nothing to complicated that a bit of registry magic did not fix. The key and...","categories": ["blog"],
        "tags": ["vba","office"],
        "url": "https://maxbarrass.com/blog/2012/09/10/vba-and-office-2013",
        "teaser": null
      },{
        "title": "My move from Polar to Garmin",
        "excerpt":"I’ve finally completed my journey from Polar to Garmin. Just after I started running 3 years ago and before my first marathon I bough my self a training watch and a GPS from Polar. The version at the time I settled for was RXS800 with a matching GPS unit. That...","categories": ["blog"],
        "tags": ["running","polar","garmin"],
        "url": "https://maxbarrass.com/blog/2013/10/05/my-move-from-polar-to-garmin",
        "teaser": null
      },{
        "title": "JCR Predicate Operations in AEM",
        "excerpt":"Here are some samples of JCR search in AEM. There is very little doco on this so here it goes. Two things you maybe wondering, number one how to use the Operations on a predicate and second how to do full text case insensitive search on attributes. Well without any...","categories": ["blog"],
        "tags": ["aem","querybuilder","cheatsheet"],
        "url": "https://maxbarrass.com/blog/2014/05/27/jcr-predicate-operations-in-aem",
        "teaser": null
      },{
        "title": "Lucene Index Configuration in AEM",
        "excerpt":"If you need to update index configuration to speed up your searches in AEM, you will need to add add an indexing_config.xml to your quickstart. A good example of why you would extend would be if you have searches that search cq:Page and cq:PageContent at the same time, or you...","categories": ["blog"],
        "tags": ["aem","lucene-index","configuration"],
        "url": "https://maxbarrass.com/blog/2014/05/28/lucene-index-configuration-in-aem",
        "teaser": null
      },{
        "title": "AEM Capability Matrix",
        "excerpt":"I always get asked does AEM has any components that come out of the box (OOTB)? What is the list of OOTB component? Can I use them? A lot of people don’t know and believe that AEM is a blank canvas and you just start from scratch. Obviously this assumptions...","categories": ["blog"],
        "tags": ["aem","capability-matrix"],
        "url": "https://maxbarrass.com/blog/2015/06/01/aem-capability-matrix",
        "teaser": null
      },{
        "title": "Linkmoji 💪😎👍",
        "excerpt":"Linkmoji! Something random doing the rounds online at the moment Linkmoji. http://🎁🍊🎩🍍🐌🐱😐🐙.🍕💩.ws Translates to: http://pizza-poop.ws/present-orange-tophat-pineapple-snail-kitty-speechless-tako These guys wrote this service in an hour very impressive :) Also, you can use emoji’s in you article url’s and I use this list of emoji’s to create URL and add some punch to...","categories": ["blog"],
        "tags": ["linkmoji"],
        "url": "https://maxbarrass.com/blog/2016/11/04/linkmoji%F0%9F%92%AA%F0%9F%98%8E%F0%9F%91%8D",
        "teaser": null
      },{
        "title": "Downloading Files from RSS with Jdownloader Packegizer 💻💥😍",
        "excerpt":"Intro I wanted to download some podcasts from an RSS feed, here is how to do this with help of RSS, XML Tools and JDownloader (be care full downloading this, Ill make a safe source verison of this some day) To do this I just transformed the RSS into a...","categories": ["blog"],
        "tags": ["jdownloader","packegizer","rss","xslt"],
        "url": "https://maxbarrass.com/blog/2020/04/10/downloading-files-from-rss-with-jdownloader-packegizer%F0%9F%92%BB%F0%9F%92%A5%F0%9F%98%8D",
        "teaser": null
      },{
        "title": "Google Photos Metadata 😗😙😚",
        "excerpt":"My cousin Anton, in Moscow, and I making a cross-continental photo album. We have started scanning some old photos so that we can preserve the memory of our ancestors for your generation. We have all the latest scanning technology that black market offers. And we have managed to acquire all...","categories": ["blog"],
        "tags": ["google-photos","metadata","exif"],
        "url": "https://maxbarrass.com/blog/2020/05/21/google-photos-metadata%F0%9F%98%97%F0%9F%98%99%F0%9F%98%9A",
        "teaser": null
      },{
        "title": "Ascii Table",
        "excerpt":"Sometimes you just need to lookup things, this is the place. Description Ascii conversion reference table. Source Support ie: live firefox: partialy opera: nightly safari: live chrome: live DEC OCT HEX BIN Symbol HTML Number HTML Name Description 00000000000000NUL&amp;#000;&nbsp;Null char 10010100000001SOH&amp;#001;&nbsp;Start of Heading 20020200000010STX&amp;#002;&nbsp;Start of Text 30030300000011ETX&amp;#003;&nbsp;End of Text 40040400000100EOT&amp;#004;&nbsp;End...","categories": ["blog"],
        "tags": ["tools","ascii-table"],
        "url": "https://maxbarrass.com/tools/ascii-table",
        "teaser": null
      },{
        "title": "Image Convert",
        "excerpt":"Simple tool to create image DataURI's. Basically convert image to Base64 in the browser using Canvas and SVG. Plus some bonus features. You can use this to convert your images in prep for embedding these into your CSS, HTML or any other useful purpose. Image Selection Image Pick File Width...","categories": ["tools"],
        "tags": ["image","convert","data-uri"],
        "url": "https://maxbarrass.com/tools/image-convert",
        "teaser": null
      },{
        "title": "Image Map Workbench",
        "excerpt":"                             Simple visual tool to create image maps for an image.                                                                                    Image Selection                                                                                                                                                                                                                    Custom Image                                                              Pick File                                                                                                                                                                                                                            Image Map                                                                                                                                                                                                                    Generated Map                                                                                                                                                                                       Generate                                                                                                                                       Image Workbench                      Area Type                     rectcirclepoly                     New Region                     Reset Image Map                                                                                                                                                                                       Workbench                                                                                                                                                   Preview Visual                                                                                                                                                   Preview Actual                                                                                                                                                                                      ","categories": ["tools"],
        "tags": ["image","map"],
        "url": "https://maxbarrass.com/tools/image-map",
        "teaser": null
      },{
        "title": "Json Path",
        "excerpt":"Description Json-Path tester using JSONPath - XPath for JSON javascript library Support ie: live firefox: partialy opera: nightly safari: live chrome: live JSON Source { \"store\": { \"book\": [ { \"category\": \"reference\", \"author\": \"Nigel Rees\", \"title\": \"Sayings of the Century\", \"price\": 8.95 }, { \"category\": \"fiction\", \"author\": \"Evelyn Waugh\", \"title\":...","categories": ["tools"],
        "tags": ["json-path","json"],
        "url": "https://maxbarrass.com/tools/json-path",
        "teaser": null
      },{
        "title": "Json and XML Tools",
        "excerpt":"                                                                 Description                      Online tool for converting between Json and XML formats.                                                                                   Support                                               ie: live                         firefox: partialy                         opera: nightly                         safari: live                         chrome: live                                                                                                                        JSON                      {\"e\":{\"a\":\"text\",\"b\":\"text\"}}                                                                                 XML                                                                                                                                              Error                                                                                                       Error                                                                                                    Actions                                       Json to XML                     XML to Json                     Format Json                     Format XML                                                                              Options                                       Json Exclude Blanks:                      XML Extended:                                                ","categories": ["tools"],
        "tags": ["json","xml"],
        "url": "https://maxbarrass.com/tools/json-xml",
        "teaser": null
      },{
        "title": "Script Tools",
        "excerpt":"Description Online Javascript script obfuscation and testing. Support ie: live firefox: partialy opera: nightly safari: live chrome: live Source (function(){var _response=\"\";var test={a:10,b:11};addLine(\"typeof test = \"+typeof test);addLine(\"for\");for(var key in test){addLine(\" \"+key+\"=\"+test[key])}function addLine(line){_response+=\"-> \"+line+\"\\n\"}return _response})() Result Source Actions Beautify Source -> Result Actions Alert Output Silent Output Result Output Inline Output Uglify2...","categories": ["tools"],
        "tags": ["script-tools","beatify","inline","uglify"],
        "url": "https://maxbarrass.com/tools/script-tools",
        "teaser": null
      },{
        "title": "String Tools",
        "excerpt":"Sometimes you just need to play with some strings. Description Various online String and Number tools. Convert numbers between generic bases. Encode and format strings. Support ie: live firefox: partialy opera: nightly safari: live chrome: live From ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`0123456789-=~!@#$%^&amp;*()_+,./;'[]&lt;&gt;?:\"{}\\| To Direction From =&gt; To From &lt;= To Actions Escape Unecape encode/decode...","categories": ["tools"],
        "tags": ["string-tools"],
        "url": "https://maxbarrass.com/tools/string-tools",
        "teaser": null
      },{
        "title": "XML Transform",
        "excerpt":"                                                                 Description                      Online XML ad XSLT transofrmation tool.                                                                                  Support                                               ie: live                         firefox: partialy                         opera: nightly                         safari: live                         chrome: live                                                                                                                        Source                       TEST1 TEST2                                                                                 Transformation (Stylesheet)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Error                                                                                                                                                 Output                                                                                                    Actions                                       Process                                               ","categories": ["tools"],
        "tags": ["xml-transform","xml","xslt"],
        "url": "https://maxbarrass.com/tools/xml-transform",
        "teaser": null
      }]
