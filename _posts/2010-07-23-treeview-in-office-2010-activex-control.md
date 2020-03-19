---
layout: single
permalink: /blog/2010/07/23/treeview-in-office-2010-activex-control
author: max
title:  "TreeView in Office 2010 - ActiveX Control Workaround"
date:   2010-07-24 00:00:00 +1100
categories:
  - blog
tags:
  - office
  - treeview
  - activex
---

Getting the ActiveX controls working in Office 2010 is easy, but making sure every one has those controls is not so. Here is my solution for this, I was unable to find anything sustainable so I had to do it my self. I had a dilema geting a TreeView control this working in Excel accross multiple workstations so this is what I came up with, this is a simple concept and will work for other Office and VBA type products.

In a nutshell you are hosting a WebBrowser control in your app, using a Linking class and a good old HTML magic to get controls into your app withough having to register them in the application. This way when you load your Workbook or Document on others PC it does not complain that you dont have controls installed. The example here is limited to what I needed but its can be extended further if needed.

Without any further ado..

Making HTML Magic:
1. Create default.css
2. Create Lic.lpk
3. Create TreeView.htm
4. Dowload and extract http://activex.microsoft.com/controls/vb6/MSComCtl.cab

Making The Excel

1. Create new workbook
2. Enable Developer toolbar, Toggle developer mode
3. Add "Microsoft Web Browser" control to Sheet1
4. Add ActiveX Button control to Sheet1, double click on button

In VBAProject,

5. Create a new class clsLinkObject
6. Add code to Sheet1
7. Add Reference to "Microsoft HTML Object Library"
8. Done.


NOTE: Code for all items you are creating is bellow.


# Files you will need

## default.css
```css
BODY
{
MARGIN: 0px;
}

TABLE.tblPopup
{
WIDTH: 100%;
HEIGHT: 100%;
TEXT-ALIGN: center
}
TABLE.tblPopup .treeSelectionTree
{
FONT-SIZE: 10pt;
COLOR: black;
FONT-FAMILY: Arial, Tahoma, Verdana, 'MS Sans Serif'
}
```

## Lic.lpk

```text
LPK License Package
//////////////////////////////////////////////////////////////////////////////
// WARNING: The information in this file is protected by copyright law //
// and international treaty provisions. Unauthorized reproduction or //
// distribution of this file, or any portion of it, may result in severe //
// criminal and civil penalties, and will be prosecuted to the maximum //
// extent possible under the law. Further, you may not reverse engineer, //
// decompile, or disassemble the file. //
//////////////////////////////////////////////////////////////////////////////
{3d25aba1-caec-11cf-b34a-00aa00a28331}
iwsnya1ZuUedNEhVNzj9IA=

AQAAAA=

tpBBx4mF0RGxagDA8Cg2KCQAAAA
5ADMANgA4ADIANgA1AEUALQA4ADUARgBFAC0AMQAxAGQAMQAtADgAQgBFADMALQAw
ADAAMAAwAEYAOAA3ADUANABEAEEAMQA=
```

## TreeView.htm

```html
<html>

<head>
<link rel="stylesheet" type="text/css" href="default.css">
</head>

<body scroll="no">

<form id="frmPageForm" method="post" action>
<table BORDER="0" CELLSPACING="0" CELLPADDING="0" class="tblPopup">
<tr>
<td align="left">

<div id="divLoading" class="treeSelectionTree" style="WIDTH: 100%; HEIGHT: 100%; background-color:white;text-align:center;VERTICAL-ALIGN: middle"> Loading...</div>


<object class="Hidden" classid="clsid:5220cb21-c88d-11cf-b347-00aa00a28331" id="Microsoft_Licensed_Class_Manager_1_0" VIEWASTEXT>
<param name="LPKPath" value=".\Lic.lpk">
</object>

<object classid="clsid:C74190B6-8589-11D1-B16A-00C0F0283628" class="treeSelectionTree" id="treeHierarchy" name="treeHierarchy" style="WIDTH: 100%; HEIGHT: 100%; display:none" codebase=".\MSCOMCTL.OCX" VIEWASTEXT>
<param NAME="_ExtentX" VALUE="6959">
<param NAME="_ExtentY" VALUE="5927">
<param NAME="_Version" VALUE="327682">
<param NAME="HideSelection" VALUE="1">
<param NAME="Indentation" VALUE="100">
<param NAME="LabelEdit" VALUE="0">
<param NAME="LineStyle" VALUE="1">
<param NAME="PathSeparator" VALUE="\">
<param NAME="Sorted" VALUE="1">
<param NAME="Style" VALUE="7">
<param NAME="ImageList" VALUE>
<param NAME="BorderStyle" VALUE="0">
<param NAME="Appearance" VALUE="0">
<param NAME="MousePointer" VALUE="0">
<param NAME="Enabled" VALUE="1">
<param NAME="FullRowSelect" VALUE="0">
<param NAME="Placement" VALUE="2">
<param NAME="SingleSel" VALUE="0">
<param NAME="Scroll" VALUE="1">
<param NAME="OLEDragMode" VALUE="0">
<param NAME="OLEDropMode" VALUE="0">
</object>



</td>
</tr>
</table>
</form>


<SCRIPT LANGUAGE=vbscript defer>
<!--

dim blnLoaded
dim objLinkObject
dim objTreeView

blnLoaded = false

set objTreeView = document.all("treeHierarchy")


sub DoLoadSample


if IsObject(objTreeView) = true then

objTreeView.Nodes.Clear
objTreeView.LabelEdit = 1

objTreeView.Nodes.Add ,, "oRoot", "root"
dim i
for i = 0 to 100
if i = 0 then
objTreeView.Nodes.Add "oRoot", 4, "oChild" & i, "Child " & i
else
objTreeView.Nodes.Add "oChild" & i-1, 4, "oChild" & i, "Child " & i
end if
next

end if

end sub


function CreateLink
on error resume next

set objLinkObject = window.document.body.getAttribute("external_LinkObject")
call objLinkObject.SetData(document.all("treeHierarchy"))

if err.number <> 0 then
err.clear
else
blnLoaded = true
end if


end function

function LinkObject_NodeClick
if blnLoaded = true then
call objLinkObject.NodeClick(objTreeView.SelectedItem)
end if
end function

function LinkObject_Click
if blnLoaded = true then
call objLinkObject.Click()
end if
end function

function LinkObject_DblClick
if blnLoaded = true then
call objLinkObject.DblClick()
end if
end function

//-->
</SCRIPT>


<script LANGUAGE="javascript" FOR="treeHierarchy" EVENT="NodeClick">
<!--
LinkObject_NodeClick();
//-->
</script>
<script LANGUAGE="javascript" FOR="treeHierarchy" EVENT="Click">
<!--
LinkObject_Click();
//-->
</script>
<script LANGUAGE="javascript" FOR="treeHierarchy" EVENT="DblClick">
<!--
LinkObject_DblClick();
//-->
</script>

<script LANGUAGE="javascript" defer>
<!--

try {
document.all("divLoading").style.display="none";
objTreeView.style.display="block";
objTreeView.focus();
} catch (ex) {

}

//-->
</script>


</body>

</html>
```

## clsLinkObject code

```asp
Option Explicit

Public LinkObject As Object

Public Event NodeClick(ByRef Node As Object)
Public Event Click()
Public Event DblClick()
Public Event Loaded()

Public Function SetData(ByRef SourceObject As Object)
Set LinkObject = SourceObject
RaiseEvent Loaded
End Function

Public Function NodeClick(ByRef Node As Object)
RaiseEvent NodeClick(Node)
End Function

Public Function Click()
RaiseEvent Click
End Function

Public Function DblClick()
RaiseEvent DblClick
End Function
```

## Sheet1 code

```asp
Option Explicit
Const constTreeViewPage As String = "\Components\TreeView.htm"
Const constDefaultPage As String = "about:blank"
Dim objSelectedItem As Range
Dim blnLoaded As Boolean
Dim blnRegistred As Boolean
Dim objTreeView As Object
Dim WithEvents objDocument As MSHTML.HTMLDocument
Dim WithEvents objWindow As MSHTML.HTMLWindow2
Dim WithEvents objTreeViewElement As MSHTML.HTMLObjectElement
Dim strDefaultPage As String
Dim strDocumentPage As String
Dim WithEvents objLinkObject As clsLinkObject
Dim blnDebug As Boolean
Dim strErrorStack As String

Private Sub CommandButton1_Click()
'Call LoadDefault
On Error GoTo ErrorHandler

CommandButton1.Enabled = False

If blnRegistred = False Then
Call RegisterObjects
End If

If Not objTreeView Is Nothing Then
call objTreeView.Nodes.Clear
call objTreeView.Nodes.Add(, , "oRoot", "Root")
call objTreeView.Nodes.Add("oRoot", 4, "oChild", "Child")
Else
GoTo ErrorHandler
End If


ErrorExit:
CommandButton1.Enabled = True
Exit Sub

ErrorHandler:
If blnDebug = False Then
MsgBox "Component did not load."
Call LoadDefault
Else
MsgBox strErrorStack, , "Component did not load."
End If
GoTo ErrorExit
End Sub

Function SelectRange()
If Not objSelectedItem Is Nothing Then
objSelectedItem.Interior.Color = vbGreen
End If
End Function

Function UnselectRange()
If Not objSelectedItem Is Nothing Then
objSelectedItem.Interior.Color = vbWhite
End If
End Function


Private Sub objLinkObject_Loaded()
Set objTreeView = objLinkObject.LinkObject
End Sub

Private Sub objLinkObject_NodeClick(Node As Object)
'
End Sub
Private Sub objLinkObject_Click()
'
End Sub
Private Sub objLinkObject_DblClick()
'
End Sub

Private Sub Worksheet_Deactivate()
Call UnselectRange
End Sub




Private Sub Worksheet_Activate()
blnDebug = False
Call ResetDebug
If blnLoaded = False Then
Call LoadDefault
blnLoaded = True
End If
End Sub






Private Sub WebBrowser1_DocumentComplete(ByVal pDisp As Object, URL As Variant)

Select Case URL
Case strDefaultPage:
Call LoadDocument
Case strDocumentPage:
Call RegisterObjects
Case Else:
End Select
End Sub


Private Sub LoadDefault()


strDefaultPage = constDefaultPage
strDocumentPage = ActiveWorkbook.Path & constTreeViewPage

Call WebBrowser1.Navigate2(strDefaultPage)
End Sub
Private Sub LoadDocument()
Call WebBrowser1.Navigate2(strDocumentPage)
End Sub

Private Sub RegisterObjects()

On Error GoTo ErrorHandler

blnRegistred = False

Call AddDebug(Nothing, "RegisterObjects", "Accessing host element")
Set objDocument = WebBrowser1.Document

Call AddDebug(Nothing, "RegisterObjects", "Accessing host client")
Set objWindow = objDocument.parentWindow

Call AddDebug(Nothing, "RegisterObjects", "Accessing host object")
Set objTreeViewElement = objDocument.all("treeHierarchy")

'Call objWindow.execScript("DoLoadSample", "VBScript")

Set objLinkObject = New clsLinkObject

Call AddDebug(Nothing, "RegisterObjects", "Init host link")
Call objWindow.Document.body.setAttribute("external_LinkObject", objLinkObject)

Call AddDebug(Nothing, "RegisterObjects", "Load host link")
Call objWindow.execScript("CreateLink", "VBScript")

blnRegistred = True


ErrorExit:
Exit Sub
ErrorHandler:
Call AddDebug(Err, "RegisterObjects")
GoTo ErrorExit
End Sub

Function ResetDebug()
strErrorStack = ""
If blnDebug = True Then
WebBrowser1.Silent = False
Else
WebBrowser1.Silent = True
End If
End Function

Function AddDebug(SourceError As ErrObject, MethodSource As String, Optional Description As String = "")
Dim strErrorText As String
If strErrorStack <> "" Then
strErrorStack = strErrorStack & vbCrLf
End If
If Not SourceError Is Nothing Then
strErrorText = " -> " & SourceError.Description
End If
strErrorStack = strErrorStack & MethodSource & ":: " & Description & strErrorText
End Function
```