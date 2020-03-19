---
layout: single
permalink: /blog/2008/02/04/sql-2005-xml-xquery-ignore-namespaces
title:  "SQL 2005 XML XQuery: Ignore Namespaces"
date:   2008-02-04 00:00:00 +1100
author: me@maxbarrass.com
categories:
  - blog
tags:
  - sql-2005
  - xml-xquery
---

A dba mentioned to change XML schema of the xml being save to the database,
not to include namespaces....well why not just ignore them.

Tested on: SQL 2005.

## WORKS WITHOUT NAMESPACE

```sql
DECLARE @xmlDoc xml
SET @xmlDoc = ' <authors xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
<child> <id>77696c646f6e65</id> <lname>Barrass</lname> <fname>Max</fname>
</child> </authors>'

select @xmlDoc.query('data(/authors/child/id)') as UserID
```

## NAMESPACE DOES NOT WORK

```sql

DECLARE @xmlDoc xml
SET @xmlDoc = ' <authors xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
<child xmlns="http://maxbarrass.spaces.live.com">
<id>77696c646f6e65</id> <lname>Barrass</lname> <fname>Max</fname> </child>
</authors>'

select @xmlDoc.query('data(/authors/child/id)') as UserID
```

## WORKS WITH NAMESPACE 

```sql
DECLARE @xmlDoc xml
SET @xmlDoc = ' <authors xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:xsd="http://www.w3.org/2001/XMLSchema">
<child xmlns="http://maxbarrass.spaces.live.com">
<id>77696c646f6e65</id> <lname>Barrass</lname> <fname>Max</fname> </child>
</authors>'

select @xmlDoc.query('data(/*:authors/*:child/*:id)') as UserID
```
