/* index.tools.js */

var objFrom;
var objTo;
//var objScriptSource;
//var objScriptResult;
var objRadixTo;
var objRadixFrom;
var strBase64KeyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function loadBodyScript(url) {
    var script= document.createElement('script');
    script.type= 'text/javascript';
    script.src= url;
    script.async = false;
    document.body.appendChild(script);
}

var enumEncodeType = {
    plainEscape: 0,
    plainUnescape: 1,
    URIEncode: 2,
    URIDecode: 3,
    HTMLEncode: 4,
    HTMLDecode: 5,
    HexEncode: 6,
    HexDecode: 7,
    BaseChange: 8,
    Base64Encode: 9,
    Base64Decode: 10
}





var enumTextFormatType = {
    asXMLText:0,
    asJsonText:1
}

var enumValueType = {
    Value: 0,
    Text: 1,
    InnerText: 2,
    InnerHTML: 3
}

var enumRadixType = {
    2: "Binary",
    3: "Ternary",
    4: "Quaternary",
    5: "Quinary",
    6: "Senary",
    7: "Septenary",
    8: "Octal",
    9: "Nonary",
    10: "Decimal",
    11: "11",
    12: "Duodecimal ",
    13: "13",
    14: "14",
    15: "15",
    16: "Hexadecimal",
    17: "17",
    18: "18",
    19: "19",
    20: "Vigesimal",
    21: "21",
    22: "22",
    23: "23",
    24: "24",
    25: "25",
    26: "26",
    27: "27",
    28: "28",
    29: "29",
    30: "30",
    31: "31",
    32: "32"
}




function doCheckOption(optionName) {
    switch (optionName) {
        case "trackHistory":
            return $("#chkTrackHistory").is(":checked"); // document.getElementById("chkTrackHistory").checked;
            break;
        case "littleEndian":
            return $("#chkLittleEndian").is(":checked"); // document.getElementById("chkLittleEndian").checked;
            break;
    }
}

function doSetValue(object, valueText, ValueType) {
    var objSource;
    if (typeof object == "string") {
        objSource = $(object); //document.getElementById(object);
    } else {
        objSource = object;
    }
    switch (ValueType) {
        case enumValueType.Value:
            objSource.value = valueText;
            break;
        case enumValueType.Text:
            objSource.text = valueText;
            break;
        case enumValueType.InnerText:
            if (typeof (objSource.innerText) != "undefined") {
                objSource.innerText = valueText;
            } else if (typeof (objSource.textContent) != "undefined") {
                objSource.textContent = valueText;
            } else {
                objSource.value = valueText;
            }
            break;
        case enumValueType.InnerHTML:
            objSource.innerHTML = valueText;
            break;
    }
}

function doGetValue(object, ValueType) {
    var objSource;
    if (typeof object == "string") {
        objSource = document.getElementById(object);
    } else {
        objSource = object;
    }
    switch (ValueType) {
        case enumValueType.Value:
            return objSource.value;
            break;
        case enumValueType.Text:
            return objSource.text;
            break;
        case enumValueType.InnerText:
            if (objSource.innerText) {
                return objSource.innerText;
            } else if (objSource.textContent) {
                return objSource.textContent;
            } else {
                return objSource.value;
            }
            break;
        case enumValueType.InnerHTML:
            return objSource.innerHTML;
            break;
    }
}




function parseBool(boolText) {
    try {
        return !!$.parseJSON(boolText.toLowerCase());
    } catch (e) { }
}



function doEncode(encodeType,recordHistory) {
    var strLabel = "";
    switch (encodeType) {
        case enumEncodeType.plainEscape:
            strLabel = "Escape";
            objTo.value = escape(objFrom.value);
            break;
        case enumEncodeType.plainUnescape:
            strLabel = "Unescape";
            objTo.value = unescape(objFrom.value);
            break;
        case enumEncodeType.URIEncode:
            strLabel = "URI encode";
            objTo.value = encodeURIComponent(objFrom.value);
            break;
        case enumEncodeType.URIDecode:
            strLabel = "URI decode";
            objTo.value = decodeURIComponent(objFrom.value);
            break;
        case enumEncodeType.HTMLEncode:
            strLabel = "HTML encode";
            var objTemp = document.createElement("div");
            //objTemp.innerText = objFrom.value;
            doSetValue(objTemp,objFrom.value,enumValueType.InnerText);
            objTo.value = objTemp.innerHTML;
            break;
        case enumEncodeType.HTMLDecode:
            strLabel = "HTML decode";
            var objTemp = document.createElement("div");
            objTemp.innerHTML = objFrom.value;
            objTo.value = doGetValue(objTemp,enumValueType.InnerText);
            break;
        case enumEncodeType.HexEncode:
            strLabel = "HEX Encode";
            objTo.value = encodeToHex(objFrom.value);
            break;
        case enumEncodeType.HexDecode:
            strLabel = "HEX Decode";
            objTo.value = decodeFromHex(objFrom.value);
            break;
        case enumEncodeType.BaseChange:
            strLabel = "Convert Base";
            objTo.value = baseChange(objFrom.value, objRadixFrom.value, objRadixTo.value);
            break;
        case enumEncodeType.Base64Encode:
            strLabel = "Base64 Encode";
            objTo.value = base64Encode(objFrom.value);
            break;
        case enumEncodeType.Base64Decode:
            strLabel = "Base64 Decode";
            objTo.value = base64Decode(objFrom.value);
            break;
    }

    if (doCheckOption("trackHistory") != false && recordHistory != false) {
        doHistoryAdd(strLabel, document.getElementById("selDirection").value, encodeType, objFrom.value);
    }
}

function base64Encode(SourceString) {
    var strReturn = "";
    var lngStringLength = SourceString.length;
    var lngCharPosition = 0;
    var strChar1, strChar2, strChar3, strIndex1, strIndex2, strIndex3, strIndex4;

    while (lngCharPosition < lngStringLength) {
        strChar1 = SourceString.charCodeAt(lngCharPosition++);
        strChar2 = SourceString.charCodeAt(lngCharPosition++);
        strChar3 = SourceString.charCodeAt(lngCharPosition++);

        //convert 24 bits from 3 chracters to 4 index numbers for Base64 map
        strIndex1 = strChar1 >> 2;
        strIndex2 = ((strChar1 & 3) << 4) | (strChar2 >> 4);
        strIndex3 = ((strChar2 & 15) << 2) | (strChar3 >> 6);
        strIndex4 = strChar3 & 63;

        if (isNaN(strChar2)) {
            strIndex3 = strIndex4 = 64;
        } else if (isNaN(strChar3)) {
            strIndex4 = 64;
        }

        strReturn = strReturn + strBase64KeyStr.charAt(strIndex1) + strBase64KeyStr.charAt(strIndex2) + strBase64KeyStr.charAt(strIndex3) + strBase64KeyStr.charAt(strIndex4);
    }

    return strReturn;
}

function base64Decode(SourceString) {
    var strReturn = "";
    var lngStringLength = 0;
    var lngCharPosition = 0;
    var strChar1, strChar2, strChar3, strIndex1, strIndex2, strIndex3, strIndex4;

    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(SourceString)) {
        //SourceString = SourceString.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        strReturn = "error: has incorrect characters.";
    }

    lngStringLength = SourceString.length;

    if ((lngStringLength % 4) != 0) {
        //SourceString = SourceString + StringRepeat("=", lngStringLength % 4);
        strReturn = "error: incorrect length.";
    }

    if (strReturn == "") {
        while (lngCharPosition < lngStringLength) {
            strIndex1 = strBase64KeyStr.indexOf(SourceString.charAt(lngCharPosition++));
            strIndex2 = strBase64KeyStr.indexOf(SourceString.charAt(lngCharPosition++));
            strIndex3 = strBase64KeyStr.indexOf(SourceString.charAt(lngCharPosition++));
            strIndex4 = strBase64KeyStr.indexOf(SourceString.charAt(lngCharPosition++));

            //convert 24 bits of 4 index numbers from Base64 map to 3 characters
            strChar1 = (strIndex1 << 2) | (strIndex2 >> 4);
            strChar2 = ((strIndex2 & 15) << 4) | (strIndex3 >> 2);
            strChar3 = ((strIndex3 & 3) << 6) | strIndex4;

            strReturn = strReturn + String.fromCharCode(strChar1);

            if (strIndex3 != 64) {
                strReturn = strReturn + String.fromCharCode(strChar2);
            }
            if (strIndex4 != 64) {
                strReturn = strReturn + String.fromCharCode(strChar3);
            }
        }
    }

    return strReturn;
}

function baseChange(SourceString, baseOrigin, baseDest, leadString) {
    return (leadString == undefined ? '' : leadString) + parseInt(SourceString, baseOrigin).toString(baseDest);
}

function encodeToHex(SourceString) {
    var strReturn = "";
    var lngStringLength = SourceString.length;
    var lngCharPosition = 0;
    var strChar;
    while (lngCharPosition < lngStringLength) {
        strChar = SourceString.charCodeAt(lngCharPosition++).toString(16);

        while (strChar.length < 2) {
            strChar = "0" + strChar;
        }

        if (doCheckOption("littleEndian") == false) {
            //big endian
            strReturn += strChar;
        } else {
            //little endian
            strReturn = strChar + strReturn;
        }

    }
    return strReturn;
}
function decodeFromHex(SourceString) {
    var strReturn = "";
    var lngStringLength = SourceString.length;
    var lngCharPosition;
    while (lngStringLength > 0) {
        lngCharPosition = lngStringLength - 2;
        if (doCheckOption("littleEndian") == false) {
            //big endian
            strReturn = String.fromCharCode("0x" + SourceString.substring(lngCharPosition, lngStringLength)) + strReturn;
        } else {
            //little endian
            strReturn += String.fromCharCode("0x" + SourceString.substring(lngCharPosition, lngStringLength));
        }
        lngStringLength = lngCharPosition;
    }

    return strReturn;
}

function StringRepeat(SourceString, NumberRepeat) {
    var arrString = [];
    while (arrString.length < NumberRepeat) {
        arrString.push(SourceString);
    }
    return arrString.join('');
}

function doDirection() {
    switch (document.getElementById("selDirection").value) {
        case "1":
            objFrom = $("#txtTo").get(0); // document.getElementById("txtFrom");
            objTo = $("#txtFrom").get(0); //  document.getElementById("txtTo");

            objRadixFrom = $("#cboRadixTo").get(0); // document.getElementById("cboRadixFrom");
            objRadixTo = $("#cboRadixFrom").get(0); // document.getElementById("cboRadixTo");

            break;
        default:
            objFrom = $("#txtFrom").get(0); // document.getElementById("txtFrom");
            objTo = $("#txtTo").get(0); //  document.getElementById("txtTo");

            objRadixTo = $("#cboRadixTo").get(0); // document.getElementById("cboRadixTo");
            objRadixFrom = $("#cboRadixFrom").get(0); // document.getElementById("cboRadixFrom");

            break;
    }

}


function HistoryEntry( id, label, value, type, direction ) {
    this._id     = id;
    this._label   = label;
    this._value = value;
    this._type = type;
    this._direction = direction;

    this.id = function () {
        return this._id;
    };

    this.label = function () {
        return this._label;
    };

    this.value = function () {
        return this._value;
    };

    this.type = function () {
        return this._type;
    };

    this.direction = function () {
        return this._direction;
    };
}

function doRowHistoryEdit(row,field,value) {
    var data = editors.history.row( row ).data();
    data[field] = value;
    editors.history.row( row ).data(data)

    editors.history.draw();
}


function doHistoryAdd(label, encodeDirection, encodeType, text) {

    editors.history.rows.add([new HistoryEntry(
        editors.history.rows().count(),
        label, //'<a href="#" class="historyLabel" data-type="text" data-pk="1" data-placement="right" data-original-title="Enter your label"></a>',
        text, //'<a href="#" class="historyData" data-type="textarea" data-pk="1" data-placeholder="Source data" data-original-title="Enter comments"></a>',
        encodeType,
        encodeDirection
    )]).draw( false );

}
function doRowHistoryDelete(row) {
    bootbox.confirm("Are you sure to delete this row ?", function(result) {
        if(result) {
            editors.history
                .row( row )
                .remove()
                .draw();
            //
            // var nRow = $(object).parents('tr')[0];
            // editors.history.fnDeleteRow(nRow);
        }
    });
}
function doHistoryClear() {
    bootbox.confirm("Are you sure to clear the table ?", function(result) {
        if(result) {
            editors.history.clear().draw();
        }
    });
}
function doHistoryReplay(row) {

    var aData  = editors.history.row( row ).data();
    selDirection.value = aData.direction();
    objFrom.value  = aData.value();
    doEncode(aData.type(), false);
}

function switchTab(TabName) {
    if (TabName != "") {
        var _tabs = document.getElementsByTagName("div");
        var _tabSelectors = document.getElementsByName("radTabs");

        for (var i = 0; i < _tabs.length; i++) {
            var tab = _tabs[i];
            if (tab.getAttribute("name") == "tab") {
                if (tab.id == TabName) {
                    tab.className = "tabShow";
                    tab.setAttribute("checked", "checked");
                    tab.setAttribute("defaultChecked", "checked");
                } else {
                    tab.className = "tabHidden";
                    tab.removeAttribute("checked");

                }
            }
        }

        for (var i = 0; i < _tabSelectors.length; i++) {
            var tab = _tabSelectors[i];
            if (tab.value == TabName) {
                tab.setAttribute("checked", "checked");
            } else {
                tab.removeAttribute("checked");
            }
        }
        //console.log(tabSelectors);
        /*if (document.getElementsByName("radTabs").getAttribute("currentTab") == null) {
         document.getElementById("radTabs").setAttribute("currentTab", document.getElementById("radTabs").defaultValue);
         }

         document.getElementById(document.getElementById("radTabs").getAttribute("currentTab")).className = "tabHidden";
         document.getElementById(TabName).className = "tabShow";
         document.getElementById("radTabs").setAttribute("currentTab", TabName);
         */
        setQueryString("tab", TabName);
        //console.log(getQueryString("tab"));
    }
}
function getQueryString(paramName) {
    var strValue = "";
    var arrayParams = splitQueryString();
    if (arrayParams) {
        if (arrayParams.constructor == Array) {
            var _paramName = encodeURIComponent(paramName);
            for (var i = 0; i < arrayParams.length; i++) {
                if (arrayParams[i][0] == _paramName) {
                    strValue = arrayParams[i][1];
                }
            }
        }
    }
    return strValue;
}
function setQueryString(paramName, paramValue) {
    if (paramName!="" & paramValue!="") {
        var arrayParams = splitQueryString();

        var _paramName = encodeURIComponent(paramName);
        var _paramValue = encodeURIComponent(paramValue);

        //console.log(arrayParams);
        if (arrayParams) {
            for (var i = 0; i < arrayParams.length; i++) {
                if (arrayParams[i][0] == _paramName) {
                    arrayParams[i][1] = _paramValue;
                }
            }
        } else {
            arrayParams = new Object([new Object([_paramName, _paramValue])]);
        }
        for (var i = 0; i < arrayParams.length; i++) {
            var param = arrayParams[i];
            arrayParams[i] = param.join("=");
        }
        //console.log("#" + arrayParams.join(","));
        location.href = "#" + arrayParams.join(",");
    }
}
function splitQueryString() {
    if (location.href.indexOf("#") > 0) {
        var strQueryString = location.href.substr(location.href.lastIndexOf("#") + 1);
        var arrayParams;
        if (strQueryString.indexOf(",") > 0) {
            arrayParams = strQueryString.split(",");
            for (var i = 0; i < arrayParams.length; i++) {
                var param = arrayParams[i];
                arrayParams[i] = param.split("=");
            }
        } else {
            if (location.href.indexOf("#") > 0) {
                arrayParams = new Object([strQueryString.split("=")]);
            }
        }

        return arrayParams;
    }
}