$(document).ready(function () {
    var user = $('#hdnfield').val();
    var StateID = 1;
    Html = "";

    $("#ddlPreferDist").change(function () {
        fillCity(this);
    });

});
$(document).ready(function () {
    $('#btnAdd').click(function () {

        var r = ($('#MainTable tr:gt(0)').length);
        // $("#ddlCity1").unchosen();
        var ddlData = '';
        if (r < 5) {
            ddlData = "<option value='0'>Select...</option>";
            $.getJSON('Handler/LoadCities.ashx?functionKey=2&StateId=1', function (country) {
                $.each(country, function () {
                    ddlData = ddlData + "<option value='" + this['ID'] + "'>" + this['DistrictName'] + "</option>";
                });
                $('#MainTable').append("<tr id='row'><td><label id='PreferredOrder1'>" + r + ".</label> </td> <td class=controls><select class='input-medium' id='ddlPreferDist" + r + "' onchange='fillCity2(this.id,0);'>" + ddlData + "</select></td><td class='controls'><select class='input-medium' id='ddlPreferCity" + r + "'><option value='0'>Select...</option></select></td><td><a href=javascript:void(0)  id='btnDelete' onclick='DeleteThis(this);'  class='btn btn-danger'>Delete</a></td></tr>");
                $('#MainTable tr:last').find("#ddlPreferDist" + r).chosen();
                $('#MainTable tr:last').find("#ddlPreferCity" + r).chosen();
            });
            r++;
        }
        else {
            alert('You can not add more then 5 Preffer city');
            return false;
        }
    });
    $('#btnSubmit').click(function () {
        // var preferredOrde = $("#PreferredOrder1").html();
        var EmpCode = $('#hdnEmpCode').val();
        if (EmpCode > 0) {
            var i = 1;
            var count = 0;
            $("#MainTable tr:gt(0)").each(function () {
                var obj = $(this).find("#PreferredOrder1");
                var valp = $(obj).html();
                if (valp == "1.") {
                    var val = $(this).find('td:first').next().children('select').val();
                    var valc = $(this).find('td:first').next().next().children('select').val();
                    if (val == 0) {
                        $(this).find('td:first').next().children('select').removeClass('controls').addClass("control-group error").focus();
                        return;
                    }
                    if (valc == 0) {
                        $(this).find('td:first').next().next().children('select').removeClass('controls').addClass("control-group error").focus();
                        return;
                    }
                }
            });
            i = 0;
            $.getJSON('Handler/LoadCities.ashx?functionKey=65&EmpId=' + EmpCode, function (country) {
                $("#MainTable tr:gt(0)").each(function () {
                    i = i + 1;
                    var city = $(this).find('td:first').next().next().children('select').val();
                    if (city == 0) {
                        return;
                    }

                    $.getJSON('Handler/LoadCities.ashx?functionKey=9&EmpId=' + EmpCode + '&CityId=' + city + '&PreferredOrder=' + i, function (country) {
                       
                    });

                    count = 1;
                });
                if (count == 1) {
                    alert('Record Saved Successfully');
                }
            });
            
        }
        else {
            alert('Please Enter Personal Detail first');
        }
    });


});
function fillCity(obj) {
    var id = obj.id;
    var city = id.replace("ddlPreferDist", "");
    var ddlData;
    var rowid = $(obj).parent().parent();
    $(rowid).find('#ddlPreferCity' + city).html('');
    $(rowid).find('#ddlPreferCity').html(ddlData);

    $.getJSON('Handler/LoadCities.ashx?functionKey=3&ID=' + obj.value, function (country) {
        ddlData = "<option value='0'>Select...</option>";
        $.each(country, function () {
            ddlData += "<option value='" + this['CityId'] + "'>" + this['Name'] + "</option>";
        });
        $(rowid).find('#ddlPreferCity' + city).html(ddlData);
        $(rowid).find('#ddlPreferCity' + city).chosen();
    });



}
function DeleteThis(obj) {
    var tbl = $(obj).parent().parent().parent();
    var rowCount = ($('#MainTable tr:gt(0)').length);
    if (rowCount == 1) {
        alert('You can not delete this row');
        return false;
    }
    var listItemId = $(obj).parent().parent();
    listItemId.remove(); // remove row
    var r = ($('#MainTable tr').length);
    var i = 1;
    $("#MainTable tr:gt(0)").each(function () {
        //var lblid = $(this).find('td:first').children('label').attr('id');
        $(this).find('td:first').children('label').html(i + '.');
        //var ddddstid = $(this).find('td:first').next().children('select').attr('id');
        //$(this).find('td:first').next().children('select').unchosen();
        $(this).find('td:first').next().children('select').attr('id', 'ddlPreferDist' + i);
        $(this).find('td:first').next().children('select').chosen();

        // $(this).find('td:first').next().next().children('select').unchosen();
        $(this).find('td:first').next().next().children('select').attr('id', 'ddlPreferCity' + i);
        $(this).find('td:first').next().next().children('select').chosen();
        // alert($(this).find('td').children('select').attr('id'));
        // alert($(this).find('td:second').children('select'));
        //$(this).find('td').children('select').attr('id', 'ddlDistrict' + i);
        i = i + 1;

    });

}
$.fn.rowCount = function () {
    return $(this).find('tr').length;
};

