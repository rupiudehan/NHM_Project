// JScript File
function EnableDisable(mode) {
    var i;
    var ctr;
    for (i = 0; i < document.forms[0].elements.length - 1; i++) {
        ctr = document.forms[0].elements[i];
        //alert(document.forms[0].elements[i].innerText);
        if (ctr.type == 'select-one') {
            if (ctr.id != 'ctl00_ContentPlaceHolder1_ddlRicemillSearch' && ctr.id != 'ctl00_ContentPlaceHolder1_ddlSearchCropYear') {
                ctr.disabled = mode;
            }
        }
        if (ctr.type == 'text') {
            if (ctr.id != 'ctl00_ContentPlaceHolder1_txtDateSearch') {
                ctr.disabled = mode;
                //ctr.style.backgroundColor ="#ffffff";
            }
        }
        if (ctr.type == 'textarea') {
            ctr.disabled = mode;
            //ctr.style.backgroundColor ="#ffffff";
        }
        //        if(ctr.id=='ctl00_ContentPlaceHolder1_TxtRefNoDate')
        //        {
        //            ctr.disabled=mode;
        //        }
        //        if(ctr.id=='ctl00_ContentPlaceHolder1_txtReceiptSearch')
        //        {
        //            ctr.disabled=mode;
        //        }
        //        if(ctr.id=='ctl00_ContentPlaceHolder1_txtDispatchSearch')
        //        {
        //            ctr.disabled=mode;
        //        }
        //        if(ctr.id=='ctl00_ContentPlaceHolder1_txtDateSearch')
        //        {
        //            ctr.disabled=mode;
        //        }
    }
}

function AddMode() {
    EnableDisable(false);
    document.getElementById('btnAdd').style.visibility = 'hidden';
    //document.getElementById('BtnSave').style.visibility='visible';
    //document.getElementById('btnEdit').style.visibility='hidden';    
    document.getElementById('ctl00_ContentPlaceHolder1_BtnDelete').style.visibility = 'hidden';
    document.getElementById('ctl00_ContentPlaceHolder1_BtnSave').style.visibility = 'visible';
    document.getElementById('btnCancel').style.visibility = 'visible';
    document.getElementById('btnStackIn').style.visibility = 'hidden';
    document.getElementById('ctl00_ContentPlaceHolder1_txtSerial').value = '';
    //document.getElementById('summary').style.visibility='hidden'
    //alert('fdsf');
    //closeBox();
    removesession();
}
function AddModeD() {
    EnableDisable(false);
    document.getElementById('btnDAdd').style.visibility = 'hidden';
    //document.getElementById('btnEdit').style.visibility='hidden';    
    document.getElementById('ctl00_ContentPlaceHolder1_btnDDelete').style.visibility = 'hidden';
    document.getElementById('ctl00_ContentPlaceHolder1_btnDSave').style.visibility = 'visible';
    document.getElementById('btnDCancel').style.visibility = 'visible';
    document.getElementById('ctl00_ContentPlaceHolder1_txtDSerial').value = '';
    //document.getElementById('summary').style.visibility='hidden'
    //closeBox();
}
function LoadMode() {
    EnableDisable(true);
    //document.getElementById( 'ctl00_ContentPlaceHolder1_ddlRiceMill' ).disabled='true';
    //document.getElementById( 'ctl00_ContentPlaceHolder1_TxtRefNo' ).disabled='true';
    //document.getElementById( 'ctl00$ContentPlaceHolder1$TxtDate' ).disabled='true';
    //document.getElementById( 'ctl00_ContentPlaceHolder1_DdlVariety' ).disabled='true';
    //document.getElementById( 'ctl00_ContentPlaceHolder1_TxtRiceBags' ).disabled='true';
    //document.getElementById( 'ctl00_ContentPlaceHolder1_TxtRiceWeight' ).disabled='true';
    document.getElementById('btnAdd').style.visibility = 'visible';
    //document.getElementById('btnEdit').style.visibility='hidden';
    document.getElementById('ctl00_ContentPlaceHolder1_BtnDelete').style.visibility = 'hidden';
    document.getElementById('ctl00_ContentPlaceHolder1_BtnSave').style.visibility = 'hidden';
    //document.getElementById('ctl00_ContentPlaceHolder1_btnStackIn').style.visibility='hidden';
    document.getElementById('btnCancel').style.visibility = 'hidden';
    var i;
    var ctr;
    for (i = 0; i < document.forms[0].elements.length - 1; i++) {
        ctr = document.forms[0].elements[i];
        //alert(document.forms[0].elements[i].innerText);
        if (ctr.type == 'text') {
            ctr.value = '';
        }
        //alert("hhhh");
        if (ctr.id == 'ctl00_ContentPlaceHolder1_TxtRefNoDate') {
            ctr.innerHTML = '';
        }
        if (ctr.id == 'ctl00_ContentPlaceHolder1_txtSerial') {
            ctr.value = '';
        }
    }
    //document.getElementById('btnStackIn').style.visibility='hidden';
    //document.getElementById('summary').style.visibility='hidden'
    closeBox();
}
function LoadModeD() {
    EnableDisable(true);
    document.getElementById('btnDAdd').style.visibility = 'visible';
    //document.getElementById('btnEdit').style.visibility='hidden';
    document.getElementById('ctl00_ContentPlaceHolder1_btnDDelete').style.visibility = 'hidden';
    document.getElementById('ctl00_ContentPlaceHolder1_btnDSave').style.visibility = 'hidden';
    document.getElementById('btnDCancel').style.visibility = 'hidden';
    //document.getElementById('btnStackOut').style.visibility='hidden';
    var i;
    var ctr;
    for (i = 0; i < document.forms[0].elements.length - 1; i++) {
        ctr = document.forms[0].elements[i];
        //alert(document.forms[0].elements[i].innerText);
        if (ctr.type == 'text') {
            ctr.value = '';
        }
        if (ctr.id == 'ctl00_ContentPlaceHolder1_txtDSerial') {
            ctr.value = '';
        }
        document.getElementById('autocomplete').style.visibility = 'hidden';
    }
    document.getElementById('btnStackOut').style.visibility = 'hidden';
}
function SelectMode() {
    document.getElementById('btnAdd').style.visibility = 'hidden';
    //document.getElementById('btnEdit').style.visibility='hidden';
    document.getElementById('ctl00_ContentPlaceHolder1_BtnDelete').style.visibility = 'visible';
    document.getElementById('ctl00_ContentPlaceHolder1_BtnSave').style.visibility = 'hidden';
    document.getElementById('btnCancel').style.visibility = 'visible';
    //document.getElementById('ctl00_ContentPlaceHolder1_btnStackIn').style.visibility='visible';
    var i;
    var ctr;
    for (i = 0; i < document.forms[0].elements.length - 1; i++) {
        ctr = document.forms[0].elements[i];
        //alert(document.forms[0].elements[i].innerText);
        if (ctr.type == 'text') {
            ctr.disabled = false;
            ctr.style.backgroundColor = "#ffffff";
        }
    }
    document.getElementById('btnStackIn').style.visibility = 'visible';
}
function SelectModeIM() {
    document.getElementById('btnAdd').style.visibility = 'hidden';
    //document.getElementById('btnEdit').style.visibility='hidden';
    document.getElementById('ctl00_ContentPlaceHolder1_BtnDelete').style.visibility = 'visible';
    document.getElementById('ctl00_ContentPlaceHolder1_BtnSave').style.visibility = 'visible';
    document.getElementById('btnCancel').style.visibility = 'visible';
    //document.getElementById('ctl00_ContentPlaceHolder1_btnStackIn').style.visibility='visible';
    var i;
    var ctr;
    for (i = 0; i < document.forms[0].elements.length - 1; i++) {
        ctr = document.forms[0].elements[i];
        //alert(document.forms[0].elements[i].innerText);
        if (ctr.type == 'text') {
            ctr.disabled = false;
            ctr.style.backgroundColor = "#ffffff";
        }
    }
}
function SelectDMode() {
    document.getElementById('btnDAdd').style.visibility = 'hidden';
    //document.getElementById('btnEdit').style.visibility='hidden';
    document.getElementById('ctl00_ContentPlaceHolder1_btnDDelete').style.visibility = 'visible';
    document.getElementById('ctl00_ContentPlaceHolder1_btnDSave').style.visibility = 'visible';
    document.getElementById('btnDCancel').style.visibility = 'visible';
    //document.getElementById('btnStackOut').style.visibility='visible';
    var i;
    var ctr;
    for (i = 0; i < document.forms[0].elements.length - 1; i++) {
        ctr = document.forms[0].elements[i];
        //alert(document.forms[0].elements[i].innerText);
        if (ctr.type == 'text') {
            ctr.disabled = false;
            ctr.style.backgroundColor = "#ffffff";
        }
    }
    document.getElementById('btnStackOut').style.visibility = 'visible';
}

function check_date(field) {
    var checkstr = "0123456789";
    var DateField = field;
    var DataField = field;
    var Datevalue = "";
    var DateTemp = "";
    var seperator = "/";
    var day;
    var month;
    var year;
    var leap = 0;
    var err = 0;
    var i;
    err = 0;
    DateValue = DateField.value;
    var d = new Date();
    var curdate = d.getDate();
    var curmonth = d.getMonth() + 1;
    var ayear = d.getFullYear();
    /* Delete all chars except 0..9 */
    for (i = 0; i < DateValue.length; i++) {
        if (checkstr.indexOf(DateValue.substr(i, 1)) >= 0) {
            DateTemp = DateTemp + DateValue.substr(i, 1);
        }
    }
    DateValue = DateTemp
    /* Always change date to 8 digits - string*/
    /* if year is entered as 2-digit / always assume 20xx */
    if (DateValue.length == 6) {
        DateValue = DateValue.substr(0, 4) + '20' + DateValue.substr(4, 2);
    }
    if (DateValue.length != 8) {
        err = 19;
    }
    /* year is wrong if year = 0000 */
    year = DateValue.substr(4, 4);
    if (year == 0) {
        err = 20;
    }
    /* Validation of month*/
    month = DateValue.substr(2, 2);
    if ((month < 1) || (month > 12)) {
        err = 21;
    }
    /* Validation of day*/
    day = DateValue.substr(0, 2);

    if (day < 1) {
        err = 22;
    }
    /* Validation leap-year / february / day */
    if ((year % 4 == 0) || (year % 100 == 0) || (year % 400 == 0)) {
        leap = 1;
    }
    if ((month == 2) && (leap == 1) && (day > 29)) {
        err = 23;
    }
    if ((month == 2) && (leap != 1) && (day > 28)) {
        err = 24;
    }
    /* Validation of other months */
    if ((day > 31) && ((month == "01") || (month == "03") || (month == "05") || (month == "07") || (month == "08") || (month == "10") || (month == "12"))) {
        err = 25;
    }
    if ((day > 30) && ((month == "04") || (month == "06") || (month == "09") || (month == "11"))) {
        err = 26;
    }
    /* if 00 ist entered, no error, deleting the entry */
    if ((day == 0) && (month == 0) && (year == 00)) {
        err = 0; day = ""; month = ""; year = ""; seperator = "";
    }
    /* if no error, write the completed date to Input-Field (e.g. 13.12.2001) */
    if (day == '')
        err = 50;
    if (err == 0) {
        if (((day >= curdate) && (month >= curmonth) && (year > ayear)) || ((day > curdate) && (month >= curmonth) && (year >= ayear)) || ((day <= curdate) && (month > curmonth) && (year == ayear)) || ((day == curdate) && (month == curmonth) && (year > ayear)) || ((day > curdate) && (month <= curmonth) && (year > ayear))) {
            alert('Date cant be future date');
            DateField.value = '';
            DateField.select();
            DateField.focus();
        }
        else if ((year != "") && (DateField.value != "")) {
            DateField.value = day + seperator + month + seperator + year;
        }
        else if ((DataField.value == "")) {
            DateField.value = day + seperator + month + seperator + year;
        }
    }


        /* Error-message if err != 0 */
    else {
        alert('Date is incorrect!');
        DateField.value = '';
        DateField.select();
        DateField.focus();
    }
}

function check_dateOnly(field) {
    var checkstr = "0123456789";
    var DateField = field;
    var Datevalue = "";
    var DateTemp = "";
    var seperator = "/";
    var day;
    var month;
    var year;
    var leap = 0;
    var err = 0;
    var i;
    err = 0;
    DateValue = DateField.value;
    var d = new Date();
    var curdate = d.getDate();
    var curmonth = d.getMonth() + 1;
    var ayear = d.getFullYear();
    /* Delete all chars except 0..9 */
    for (i = 0; i < DateValue.length; i++) {
        if (checkstr.indexOf(DateValue.substr(i, 1)) >= 0) {
            DateTemp = DateTemp + DateValue.substr(i, 1);
        }
    }
    DateValue = DateTemp

    /* Always change date to 8 digits - string*/
    /* if year is entered as 2-digit / always assume 20xx */
    if (DateValue.length == 6) {
        DateValue = DateValue.substr(0, 4) + '20' + DateValue.substr(4, 2);
    }
    if (DateValue.length != 8) {
        err = 19;
    }
    /* year is wrong if year = 0000 */
    year = DateValue.substr(4, 4);
    if (year == 0) {
        err = 20;
    }
    /* Validation of month*/
    month = DateValue.substr(2, 2);
    if ((month < 1) || (month > 12)) {
        err = 21;
    }
    /* Validation of day*/
    day = DateValue.substr(0, 2);
    if (day < 1) {
        err = 22;
    }
    /* Validation leap-year / february / day */
    if ((year % 4 == 0) || (year % 100 == 0) || (year % 400 == 0)) {
        leap = 1;
    }
    if ((month == 2) && (leap == 1) && (day > 29)) {
        err = 23;
    }
    if ((month == 2) && (leap != 1) && (day > 28)) {
        err = 24;
    }
    /* Validation of other months */
    if ((day > 31) && ((month == "01") || (month == "03") || (month == "05") || (month == "07") || (month == "08") || (month == "10") || (month == "12"))) {
        err = 25;
    }
    if ((day > 30) && ((month == "04") || (month == "06") || (month == "09") || (month == "11"))) {
        err = 26;
    }
    /* if 00 ist entered, no error, deleting the entry */
    if ((day == 0) && (month == 0) && (year == 00)) {
        err = 0; day = ""; month = ""; year = ""; seperator = "";
    }
    /* if no error, write the completed date to Input-Field (e.g. 13.12.2001) */
    if (err == 0) {
        if (((day >= curdate) && (month >= curmonth) && (year > ayear)) || ((day > curdate) && (month >= curmonth) && (year >= ayear)) || ((day <= curdate) && (month > curmonth) && (year == ayear)) || ((day == curdate) && (month == curmonth) && (year > ayear)) || ((day > curdate) && (month <= curmonth) && (year > ayear))) {
            DateField.value = day + seperator + month + seperator + year;
            //alert('Date cant be future date');
            //DateField.value='';
            //DateField.select();
            //DateField.focus();
        }
        else if ((year != "") && (DateField.value != "")) {
            DateField.value = day + seperator + month + seperator + year;
        }
        else if ((DateField.value == "")) {
            DateField.value = day + seperator + month + seperator + year;
        }
    }


        /* Error-message if err != 0 */
    else {
        alert('Date is incorrect!');
        DateField.value = '';
        cDateField.select();
        DateField.focus();
    }
}
function isNumberDate(evt) {

    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 47 || charCode > 57))
        return false;

    return true;
}
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}

function isFloatKey(evt, input) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    if (charCode == 46 && input.split('.').length > 1) {
        return false;
    }

    if (input.indexOf('.') != -1) {
        x = input;
        var count = countDecimals(x);
        if (count > 4) {
            return false;
        }
    }

    return true;
}

var countDecimals = function (value) {
    if (Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
}

