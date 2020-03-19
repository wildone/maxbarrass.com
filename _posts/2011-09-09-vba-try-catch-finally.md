---
layout: single
permalink: /blog/2011/09/09/vba-try-catch-finally
author: max
title:  "VBA Try...Catch...Finally"
date:   2011-09-09 00:00:00 +1100
categories:
  - blog
tags:
  - vba
  - try-catch-finally
---


When writing function and in particular custom error handling in VBA please remember this common patern for error handling when using "On Error".

Function template:


Sub|Function SomeName()
    On Error GoTo Err_SomeName                  ' Initialize error handling.
    ' Code to do something here.
Exit_SomeName:                                  ' Label to resume after error.
    Exit Sub|Function                           ' Exit before error handler.
Err_SomeName:                                   ' Label to jump to on error.
    Call MsgBox(Err.Number & Err.Description)   ' Place error handling here.
    Call Err.Clear                              ' Clear the error
    Resume Exit_SomeName                        ' Pick up again and quit.
End Sub|Function

In-line template:

On Error Resume Next                            ' Initialize error handling.
    ' Code to do something here.
    If Err.Number <> 0 Then                     ' Check if error occured
        ' Code to do something here on error
        Call Err.Clear                          ' Clear the error
    End If
On Error GoTo 0                                 ' Disable error handling in current procedure
                                                ' make other unexpected errors bubble up


Why you ask?! Well because VBA only has single Error object into which all function write their errors, so if you are going to use "On Error Resume Next", handle the error and clear it, because when an error occurs its not cleared automatically when leave a function. Basically using this pattern you are mimicking the Try..Catch..Finally statements that are explicit in other languages.

This is particular important if you write a deterministic functions (functions that supposed to return a value, not an error) because you are going to use them to perform logic not a good idea to leave errors handing around!

Here is an example of a conundrum you could experience:

```asp
Sub WhatOnEarth()
    Dim ItsTrue As Boolean
    
    On Error Resume Next
    
    ItsTrue = IsItTrue
    
    If Err.Number <> 0 Then
        MsgBox Err.Description
        ItsTrue = False
    End If
    
    If ItsTrue = True Then
        Call MsgBox("Eureka!")
    Else
        Call MsgBox("Eureka!...NOT!!")
    End If
End Sub

Function IsItTrue() As Boolean
    Dim tester

    On Error Resume Next
    
    tester = 1 / 0
    
    IsItTrue = True
        
End Function
```

And really this is all you should have experienced:

```asp
Sub WhatOnEarth()
    Dim ItsTrue As Boolean
    
    On Error Resume Next
    
    ItsTrue = IsItTrue
    
    If Err.Number <> 0 Then
        MsgBox Err.Description
        ItsTrue = False
    End If
    
    If ItsTrue = True Then
        Call MsgBox("Eureka!")
    Else
        Call MsgBox("Eureka!...NOT!!")
    End If
End Sub

Function IsItTrue() As Boolean
    Dim tester


    On Error Resume Next        'try
    
    tester = 1 / 0
    
    If Err.Number <> 0 Then     'catch
        Call Err.Clear
    End If
                            
    IsItTrue = True             'finaly
End Function
```

glhf!
