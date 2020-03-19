---
layout: single
permalink: /blog/2014/05/28/lucene-index-configuration-in-aem
author: max
title:  "Lucene Index Configuration in AEM"
date:   2014-05-28 00:00:00 +1100
categories:
  - blog
tags:
  - aem
  - lucene-index
  - configuration
---

If you need to update index configuration to speed up your searches in AEM,  you will need to add add an indexing_config.xml to your quickstart.

A good example of why you would extend would be if you have searches that search cq:Page and cq:PageContent at the same time, or you may have multilevel search requirement and you are tempted to do traditional subquery mechanism. In this scenario you can just create an index with all the attributes you want to use for search.

Do note that the more indexes the more space this will take up. Also if you have a large dataset this will take a long time to create, so you need to think about this early on.

Location for the config:

```
crx-quickstart/repository/workspaces/crx.default/indexing_config.xml
```

Default configuration can be found here: [How to modify the search index configurations in CQ5](http://helpx.adobe.com/experience-manager/kb/SearchIndexingConfig.html)

Extended configuration

```xml

<?xml version="1.0"?>
<!DOCTYPE configuration SYSTEM "http://jackrabbit.apache.org/dtd/indexing-configuration-1.2.dtd">
<configuration
xmlns:cq="http://www.day.com/jcr/cq/1.0"
xmlns:dam="http://www.day.com/dam/1.0"
xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
xmlns:jcr="http://www.jcp.org/jcr/1.0"
xmlns:sling="http://sling.apache.org/jcr/sling/1.0">

<!-- Disable indexing of cq:AuditEvent -->
<index-rule nodeType="cq:AuditEvent"></index-rule>

<!-- Do not index content of subassets -->
<index-rule nodeType="nt:resource"
condition="ancestor::subassets/@jcr:primaryType='{http://www.jcp.org/jcr/nt/1.0}unstructured'">
</index-rule>

<!--
Exclude some well known properties from the node scope
fulltext index. Do not add rules below this one, since
this rule matches any node and acts as a default/fallback.
-->
<index-rule nodeType="nt:base">
<property nodeScopeIndex="false">analyticsProvider</property>
<property nodeScopeIndex="false">analyticsSnippet</property>
<property nodeScopeIndex="false">hideInNav</property>
<property nodeScopeIndex="false">offTime</property>
<property nodeScopeIndex="false">onTime</property>
<property nodeScopeIndex="false">cq:allowedTemplates</property>
<property nodeScopeIndex="false">cq:childrenOrder</property>
<property nodeScopeIndex="false">cq:cugEnabled</property>
<property nodeScopeIndex="false">cq:cugPrincipals</property>
<property nodeScopeIndex="false">cq:cugRealm</property>
<property nodeScopeIndex="false">cq:designPath</property>
<property nodeScopeIndex="false">cq:isCancelledForChildren</property>
<property nodeScopeIndex="false">cq:isDeep</property>
<property nodeScopeIndex="false">cq:lastModified</property>
<property nodeScopeIndex="false">cq:lastModifiedBy</property>
<property nodeScopeIndex="false">cq:lastPublished</property>
<property nodeScopeIndex="false">cq:lastPublishedBy</property>
<property nodeScopeIndex="false">cq:lastReplicated</property>
<property nodeScopeIndex="false">cq:lastReplicatedBy</property>
<property nodeScopeIndex="false">cq:lastReplicationAction</property>
<property nodeScopeIndex="false">cq:lastReplicationStatus</property>
<property nodeScopeIndex="false">cq:lastRolledout</property>
<property nodeScopeIndex="false">cq:lastRolledoutBy</property>
<property nodeScopeIndex="false">cq:name</property>
<property nodeScopeIndex="false">cq:parentPath</property>
<property nodeScopeIndex="false">cq:segments</property>
<property nodeScopeIndex="false">cq:siblingOrder</property>
<property nodeScopeIndex="false">cq:template</property>
<property nodeScopeIndex="false">cq:trigger</property>
<property nodeScopeIndex="false">cq:versionComment</property>
<property nodeScopeIndex="false">jcr:createdBy</property>
<property nodeScopeIndex="false">jcr:lastModifiedBy</property>
<property nodeScopeIndex="false">sling:alias</property>
<property nodeScopeIndex="false">sling:resourceType</property>
<property nodeScopeIndex="false">sling:vanityPath</property>
<property isRegexp="true">.*:.*</property>
</index-rule>

<!-- Cq Page for jcr:contains(jcr:content, "...") searches -->
<aggregate primaryType="cq:PageContent">
<include>*</include>
<include>*/*</include>
<include>*/*/*</include>
<include>*/*/*/*</include>
</aggregate>

<aggregate primaryType="dam:Asset">
<include>jcr:content</include>
<include>jcr:content/metadata</include>
<include>jcr:content/metadata/*</include>
<include>jcr:content/renditions</include>
<include>jcr:content/renditions/original</include>
<include>jcr:content/renditions/original/jcr:content</include>
<!-- child axis orderby index -->
<include>jcr:content/renditions/original/jcr:content/jcr:lastModified</include>
</aggregate>

<!-- nt:file child axis orderby index -->
<aggregate primaryType="nt:file">
<include>jcr:content</include>
<include>jcr:content/jcr:lastModified</include>
</aggregate>

<!-- cq:Page child axis orderby index -->
<aggregate primaryType="cq:Page">
<include>jcr:content</include>
<include>jcr:content/cq:lastModified</include>
</aggregate>

<!-- cq:Page child axis orderby index -->
<aggregate primaryType="cq:Page">
<include>jcr:content</include>
<include>jcr:content/par/*/date</include>
<include>jcr:content/par/*/tags</include>
<include>jcr:content/par/*/sling:resourceType</include>
<include>jcr:content/cq:tags</include>
</aggregate>

</configuration>
```
