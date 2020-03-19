---
layout: single
permalink: /blog/2009/03/18/sql-2008-full-text-index-add-button-is-disabled
author: max
title:  "SQL 2008 Full-text index Add button is disabled!"
date:   2009-03-18 00:00:00 +1100
categories:
  - blog
tags:
  - sql-2008
  - full-text-index
---

I restored an SQL 2000 database to sql 2008 server, upgraded etc, but the Full-text index menu uption is disable, obviously full-text indexing is always on in SQL 2008 but the MS Studio looks like using options from the past so to check if this is the case for you run this:

```sql
select name, is_fulltext_enabled from sys.databases
```

to configure it as it should be run this:

```sql
sp_fulltext_database 'enable'
```

Done!