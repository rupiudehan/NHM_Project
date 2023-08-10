$(document).ready(function () {
 $('#loading').ajaxStart(function () {
        $.showprogress();
    });
    $('#loading').ajaxStop(function () {
        $.hideprogress();
    });
    $("[id$=ddlMarketCommittee]").chosen();
    $('#myModal').hide();
    $('#btnPopUp').click(function () {
        $('#myModal').show();
    });
    $('.close').click(function () {
        $('#myModal').hide();
    });
    $("[id$=ddlDistrict]").change(function () {
        BindMarketCommittee();
    });
    $('#btnSaveCommodity').click(function () {
        insert();
    });
    $('#btnPopUp').click(function () {
        clear();
    });
    $('.number').live('keydown', function (event) {
        if (event.which == 8 || event.which == 0 || event.which == 9)
        { }
        else {
            if (event.shiftKey || (event.keyCode < 46 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode != 110 && event.keyCode != 190) {
                event.preventDefault();
            }
        }
        if ((event.keyCode == 110 || event.keyCode == 190) && ($(this).val().indexOf('.') != -1)) {
            event.preventDefault();
        }
    });
    BindTable();
    //BindDistrict($('[id$=hdDistCode]').val(), $('[id$=hdMandiCode]').val());
     BindDistrict();
    BindDesignation();
    BindCategory();

});
function validateEmail(email) {
    if ($(email).val() != '') {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailReg.test($(email).val())) {
            $(email).val('');
        }
    }
}
function clear() {
    $('#txtname').val('');
    $('#txtAddress').val('');
    $('#txtPhoneNo').val('');
    $('#txtEmail').val('');
    $('#HdSerialCode').val('0');
}
function BindTable() {
    $.ajax({
        type: 'Post',
        url: 'Service/Employee.asmx/select',
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        success: function (result) {
            $('#DataTables').dataTable().fnDestroy();
            $('#tempbody').html(result.d);
            $("#DataTables").dataTable({ "iDisplayLength": 10, "sPaginationType": "full_numbers", "bLengthChange": true, "bFilter": true, "bInfo": true, "bPaginate": true, "aoColumns": [0, 1, 2, 3, { "bSortable": false}] });
        }
    });
}

(function ($) {

    $.showprogress = function () {
        $.hideprogress();
        $("BODY").append('<div id="processing_overlay"></div>');
        $("BODY").append(
		      '<div id="processing_container">' +
        //'<div id="processing_title">This is title</div>' +
		        '<div id="processing_content">' +
    		            '<img src="img/30.gif"  alt=""/>' +
		                '<br/><br/>Please wait While Loading...' +
			    '</div>' +
		      '</div>');
        var pos = ($.browser.msie && parseInt($.browser.version) <= 6) ? 'absolute' : 'fixed';

        $("#processing_container").css({
            position: pos,
            zIndex: 99999,
            padding: 0,
            margin: 0
        });

        $("#processing_container").css({
            minWidth: $("#processing_container").outerWidth(),
            maxWidth: $("#processing_container").outerWidth()
        });

        var top = (($(window).height() / 2) - ($("#processing_container").outerHeight() / 2)) + (-75);
        var left = (($(window).width() / 2) - ($("#processing_container").outerWidth() / 2)) + 0;
        if (top < 0) top = 0;
        if (left < 0) left = 0;

        // IE6 fix
        if ($.browser.msie && parseInt($.browser.version) <= 6) top = top + $(window).scrollTop();

        $("#processing_container").css({
            top: top + 'px',
            left: left + 'px'
        });
        $("#processing_overlay").height($(document).height());
    },
    $.hideprogress = function () {
        $("#processing_container").remove();
        $("#processing_overlay").remove();
    },
    $.showmsg = function (msgEle, msgText, msgClass, msgIcon, msgHideIcon, autoHide) {
        var tblMsg;

        tblMsg = '<table width="100%" cellpadding="1" cellspacing="0" border="0" class="' + msgClass + '"><tr><td style="width:30px;" align="center" valign="middle">' + msgIcon + '</td><td>' + msgText + '</td><td style="width:30px;" align="center" valign="middle"><a href="javascript:void(0);" onclick="$(\'#' + msgEle + '\').toggle(400);">' + msgHideIcon + '</a></td></tr></table>';

        $("#" + msgEle).html(tblMsg);
        $("#" + msgEle).show();
        if (autoHide) {
            setTimeout(function () {
                $('#' + msgEle).fadeOut('normal')
            }, 10000
	        );
        }
    }
})(jQuery);

function BindDistrict() {
    var DistrictId = $('[id$=hdDistCode]').val()
    $.ajax({
        type: 'Post',
        url: 'Service/Employee.asmx/GetDistrict',
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        data: JSON.stringify({ DistrictId: DistrictId }),
        success: function (result) {
            $("[id$=ddlDistrict]").find('option').remove();
            var strData = eval('(' + result.d + ')');
            
            $("[id$=ddlDistrict]").append('<option value="0">Select District</option>');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("[id$=ddlDistrict]").append($("<option></option>").val(strData[i].fsDistId).html(strData[i].fsDistrictName));
            }
          

            $("[id$=ddlDistrict]").chosen();
            $('[id$=ddlDistrict]').prop('disabled', false).trigger("liszt:updated");
            //$('[id$=ddlDistrict]').trigger("chzn:updated");
        }
    });
}
function BindMarketCommittee() {
  
    var DistCode = $("[id$=ddlDistrict]").val();
    var Type = $('#hdntype2').val();
    var cmpcode = $('#hdncmpcode2').val();
    $.ajax({
        type: 'Post',
        url: 'Service/LinanceDetail.asmx/GetMarketCommittee',
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        data: JSON.stringify({ DistCode: DistCode, Type: Type, cmpcode: cmpcode }),
        success: function (result) {
            $("[id$=ddlMarketCommittee]").find('option').remove();
            var strData = eval('(' + result.d + ')');
          //  $("[id$=ddlMarketCommittee]").append('<option value="0">Select Market Committee</option>');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("[id$=ddlMarketCommittee]").append($("<option></option>").val(strData[i].fanSerialCode).html(strData[i].fsCityName));
            }

           
            $("[id$=ddlMarketCommittee]").trigger("liszt:updated");
            $('[id$=ddlMarketCommittee]').trigger("chzn:updated");
        }
    });
}
function BindCategory() {
    $.ajax({
        type: 'Post',
        url: 'Service/Employee.asmx/GetCategory',
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        success: function (result) {
            $("[id$=ddlECategory]").find('option').remove();
            var strData = eval('(' + result.d + ')');
            $("[id$=ddlECategory]").append('<option value="0">Select Category</option>');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("[id$=ddlECategory]").append($("<option></option>").val(strData[i].SerialCode).html(strData[i].Name));
            }
            $("[id$=ddlECategory]").chosen();
        }
    });
}
function BindDesignation() {
    $.ajax({
        type: 'Post',
        url: 'Service/Employee.asmx/GetDesignation',
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        success: function (result) {
            $("[id$=ddlEDesignation]").find('option').remove();
            var strData = eval('(' + result.d + ')');
            $("[id$=ddlEDesignation]").append('<option value="0">Select Designation</option>');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("[id$=ddlEDesignation]").append($("<option></option>").val(strData[i].SerialCode).html(strData[i].Name));
            }
            $("[id$=ddlEDesignation]").chosen();
        }
    });
}
function Edit(obj) {
    $('#HdSerialCode').val(obj);

    $.ajax({
        type: 'Post',
        url: 'Service/Employee.asmx/EditDetail',
        contentType: "application/json;",
        dataType: "json",
        data: JSON.stringify({ Serial: obj }),
        success: function (result) {
            var strdata = eval('(' + result.d + ')');
            $('#txtname').val(strdata[0].Name);
            $('#txtAddress').val(strdata[0].Address);
            $('#txtPhoneNo').val(strdata[0].PhoneNo);
            $('#txtEmail').val(strdata[0].EmailID);
            $('#ddlECategory').val(strdata[0].CategoryID);
            $("#ddlECategory").trigger("liszt:updated");
            $('#ddlEDesignation').val(strdata[0].Designation);
            $("#ddlEDesignation").trigger("liszt:updated");
            BindMarketCommittee(strdata[0].MarketCommitteeId);
            if (strdata[0].Status == 1) {
                $('#IsActive').attr('checked', 'checked');
                $('#IsActive').parent().addClass("checked");
            }
            else {
                $('#IsActive').attr('checked', '');
                $('#IsActive').parent().removeClass("checked");
            }
            $('#myModal').show();
        }

    });
}
function DeleteEmployee(obj, obj1) {
    var r = confirm("Are you sure you want to delete ?");
    if (r == true) {
        $.ajax({
            type: 'Post',
            url: 'Service/Employee.asmx/DeleteEmployee',
            contentType: "application/json;",
            dataType: "json",
            data: JSON.stringify({ Serial: obj }),
            success: function (result) {
                if (result.d > 0)
                    BindTable();
                alert('Record deleted successfully');
            }
        });
    }
}
function insert() {
    var check = 0;
    $('[id$=contact-form]').find('select').each(function () {
        if ($(this).val() == '0') {
            $(this).parent().addClass('error');
            check = 1;
        }
    });
    if (check == 0) {
        var Active = 0;
        var SerialCode = $('#HdSerialCode').val();
        var Name = $('#txtname').val();
        var Category = $('[id$=ddlECategory]').val();
        var Designation = $('[id$=ddlEDesignation]').val();
        var MarketCommittee = $('[id$=ddlMarketCommittee]').val();
        var Address = $('#txtAddress').val();
        var Phone = $('#txtPhoneNo').val();
        var Email = $('#txtEmail').val();
        if ($('#IsActive').attr('checked')) {
            Active = 1;
        }
        $.ajax({
            type: 'Post',
            url: 'Service/Employee.asmx/Insert',
            contentType: "application/json;",
            dataType: "json",
            data: JSON.stringify({ SerialCode: SerialCode, Name: Name, Category: Category, Designation: Designation, MarketCommittee: MarketCommittee, Address: Address, Phone: Phone, Email: Email, Active: Active }),
            success: function (result) {
                if (result.d > 0)
                    BindTable();
                alert('Record saved successfully');
                $('#myModal').hide();
            }
        });
    }
}