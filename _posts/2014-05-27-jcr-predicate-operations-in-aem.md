---
layout: single
permalink: /blog/2014/05/27/jcr-predicate-operations-in-aem
author: max
title:  "JCR Predicate Operations in AEM"
date:   2014-05-27 00:00:00 +1100
categories:
  - blog
tags:
  - aem
  - querybuilder
  - cheatsheet
---

Here are some samples of JCR search in AEM. There is very little doco on this so here it goes.

Two things you maybe wondering, number one how to use the Operations on a predicate and second how to do full text case insensitive search on attributes. Well without any further ado:

- [Operation Exists](http://localhost:4502/libs/cq/search/content/querydebug.html?_charset_=UTF-8&query=path%3D%2Fcontent%2Fgeometrixx%0D%0Atype%3Dcq%3APage%0D%0Aproperty%3Djcr%3Acontent%2Fcq%3Atoolbars%0D%0Aproperty.operation%3Dexists%0D%0A)
- [Operation Like](http://localhost:4502/libs/cq/search/content/querydebug.html?_charset_=UTF-8&query=path%3D%2Fcontent%2Fgeometrixx%0D%0Atype%3Dcq%3APage%0D%0Aproperty%3Djcr%3Acontent%2Fjcr%3Atitle%0D%0Aproperty.operation%3Dlike%0D%0Aproperty.value%3D%25ac%25)
- [Operation Equals](http://localhost:4502/libs/cq/search/content/querydebug.html?_charset_=UTF-8&query=path%3D%2Fcontent%2Fgeometrixx%0D%0Atype%3Dcq%3APage%0D%0Aproperty%3Djcr%3Acontent%2Fjcr%3Atitle%0D%0Aproperty.operation%3Dequals%0D%0Aproperty.value%3DContact)
- [Operation UnEquals](http://localhost:4502/libs/cq/search/content/querydebug.html?_charset_=UTF-8&query=path%3D%2Fcontent%2Fgeometrixx%0D%0Atype%3Dcq%3APage%0D%0Aproperty%3Djcr%3Acontent%2Fjcr%3Atitle%0D%0Aproperty.operation%3Dunequals%0D%0Aproperty.value%3DContact)
- [Operation Not Exist](http://localhost:4502/libs/cq/search/content/querydebug.html?_charset_=UTF-8&query=path%3D%2Fcontent%2Fgeometrixx%0D%0Atype%3Dcq%3APage%0D%0Aproperty%3Djcr%3Acontent%2Fcq%3Atoolbars%0D%0Aproperty.operation%3Dnot)
- [Full Text Case-Insensitive Search Example](http://localhost:4502/libs/cq/search/content/querydebug.html?_charset_=UTF-8&query=path%3D%2Fcontent%2Fgeometrixx%0D%0Atype%3Dcq%3APage%0D%0Agroup.p.or%3Dtrue%0D%0Agroup.1_fulltext%3D*Z*%0D%0Agroup.1_fulltext.relPath%3D%40jcr%3Acontent%2Fjcr%3Atitle%0D%0Agroup.2_fulltext%3D*tt*%0D%0Agroup.2_fulltext.relPath%3D%40jcr%3Acontent%2Fcq%3Atoolbars%0D%0A%0D%0A)

You can find lots more examples in [Query Builder Cheat Sheet](https://github.com/wildone/aem-links/blob/master/querybuilder_cheatsheet.md) and Adobe info [AEM Query Builder API Docs](http://dev.day.com/docs/en/cq/current/dam/customizing_and_extendingcq5dam/query_builder.html)
