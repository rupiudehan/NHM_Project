/// <reference path="../../PMS/Service/CommonService.asmx" />
$(document).ready(function () {
    alert(11);
    $('#loading').ajaxStart(function() {
        $.showprogress();
    });
    $('#loading').ajaxStop(function() {
        $.hideprogress();
    });
    BindTable();
    // GetEmpDetail();

    //  var branchcode = $('#hdnbranchcode').val();

});

(function($) {

    $.showprogress = function() {
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
    $.hideprogress = function() {
        $("#processing_container").remove();
        $("#processing_overlay").remove();
    },
    $.showmsg = function(msgEle, msgText, msgClass, msgIcon, msgHideIcon, autoHide) {
        var tblMsg;

        tblMsg = '<table width="100%" cellpadding="1" cellspacing="0" border="0" class="' + msgClass + '"><tr><td style="width:30px;" align="center" valign="middle">' + msgIcon + '</td><td>' + msgText + '</td><td style="width:30px;" align="center" valign="middle"><a href="javascript:void(0);" onclick="$(\'#' + msgEle + '\').toggle(400);">' + msgHideIcon + '</a></td></tr></table>';

        $("#" + msgEle).html(tblMsg);
        $("#" + msgEle).show();
        if (autoHide) {
            setTimeout(function() {
                $('#' + msgEle).fadeOut('normal')
            }, 10000
	        );
        }
    }
})(jQuery);

function BindTable() {
    alert(1);
    $.ajax({
        type: 'Post',
        url: 'Service/CommonService.asmx/BindTable',
        contentType: "application/json;",
        dataType: "json",
        success: function(result) {
            //$('#dvContent').dataTable().fnDestroy();
            $('#dvContent').dataTable();
            $('#tblbody').html(result.d);
            $("#dvContent").dataTable({ "iDisplayLength": 10, "sPaginationType": "full_numbers", "bLengthChange": true, "bFilter": true, "bInfo": true, "bPaginate": true, "aoColumns": [0, 1, 2, 3, 4, 5, 6, { "bSortable": false}] });
        }
    });
}

function GetEmpDetail() {
    var data = "";
    var branchcode = $('#hdnbranchcode').val();

    $.ajax({
        type: 'GET',
        url: 'Handler/LoadCities.ashx?functionKey=23&EmpId=' + branchcode,
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function(country) {
            $.each(country, function() {
                data += "<tr><td>" + this['Name'] + "</td><td>" + this['FatherName'] + "</td><td>" + this['MotherName'] + "</td><td>" + this['Address'] + "</td><td>" + this['MobileNo'] + "</td><td>" + this['PostalCode'] + "</td><td>" + this['IsActive'] + "</td>";

                data += "<td><a class='btn btn-info' href='#' id='EmpClick' onclick='bindEmployee(" + this['ID'] + ")'><i class='icon-edit icon-white'></i>Edit </a>";
            });
            $('#tblbody').append(data);
            $("#dvContent").dataTable({
                "sPaginationType": "full_numbers",
                "bDestroy": true,
                "bFilter": true,
                "bAutoWidth": true,
                "bJQueryUI": false,
                "bRetrieve": true,
                "bSort": false,
                "iDisplayLength": 50,

                "oLanguage": { "sZeroRecords": "No data available", "sSearch": "Filter" }
            });
        },
        error: function(xhr) {
            console.log
        }
    });
}

function bindEmployee(Eid) {

    window.location.href = "Employee.aspx?EmpId=" + Eid + "&i=" + 1003;
}
