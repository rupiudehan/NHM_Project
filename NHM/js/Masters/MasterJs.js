
var domainUrl = "";
var domainUrl = "";
var ddlCountry = $('#ddlCountry');
var ddlState = $('#ddlState');
var hdnID = $('#hdnDistrictID');
var txtCode = $('#txtDistrictCode');
var txtName = $('#txtDistrictName');
var btnSave = $('#btnSave');
var myModalLabel = $('#myModalLabel');
var body = $('#tbDistrict');
var table = $("#tblDistrict");
$(document).ready(function () {
    getUrl('../');
    domainUrl = $('#hdnUrl').val();
    LoadCountries(domainUrl);
    LoadStates(domainUrl);
    LoadData(domainUrl);
});

ddlCountry.on('change', function () {
    LoadStates(domainUrl);
});

function ClearData() {
    RestData();
    $('#myModal').modal('hide');
}

function RestData() {
    ddlCountry.val(0);
    ddlState.val(0);
    hdnID.val(0);
    txtCode.val('');
    txtName.val('');
    btnSave.html('Add');
    myModalLabel.html('Add');
}

function LoadCountries(domainUrl) {
    ddlCountry.empty();
    ddlCountry.append($("<option></option>").val(0).html('--Select--'));
    $.ajax({

        type: "GET",
        url: domainUrl + 'app/GetCountryDetail/0',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.isSucess) {
                $.each(data.responseData, function (index, value) {
                    ddlCountry.append($("<option></option>").val(value.countryId).html(value.countryName));
                });
            }
        }

    });
}

function LoadStates(domainUrl) {
    var CountryId = ddlCountry.val();
    ddlState.empty();
    ddlState.append($("<option></option>").val(0).html('--Select--'));
    if (CountryId != '0' && CountryId != '') {
        $.ajax({

            type: "GET",
            url: domainUrl + 'app/GetStates/0/' + CountryId,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.isSucess) {
                    $.each(data.responseData, function (index, value) {
                        ddlState.append($("<option></option>").val(value.stateID).html(value.stateName));
                    });
                }
            }

        });
    }

}

function LoadData(url,forFn) {
    body.empty();

    $.ajax({

        type: "GET",
        url: domainUrl+url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.isSucess) {
                var count = 1;
                $.each(data.responseData, function (index, value) {

                    var tr = '<tr class="d">';
                    tr += '<td scope="row">' + count + '</td>';
                    if (forFn == 'country') {
                        tr += '<td class="countryCode">' + value.countryCode + '</td>';
                        tr += '<td class="countryName">' + value.countryName + '</td>';
                        tr += '<td class="commCode">' + value.commCode + '</td>';
                        tr += '<td><button class="btn btn-warning btn-xs" id="txtEdit' + count + '" type="button" onclick="EditEntry(' + value.countryId + ',\'txtEdit' + count + '\')"><i class="fa fa-pencil"></i></button>  <button class="btn btn-danger btn-xs" id="txtDelete' + count++ + '" type="button"  onclick="deleteItem(' + value.countryId + ')"><i class="fa fa-trash"></i></button></td>';
                    }
                    else if (forFn == 'state') {
                        tr += '<td class="countryId">' + value.countryName + '</td>';
                        tr += '<td class="stateCode">' + value.stateCode + '</td>';
                        tr += '<td class="stateName">' + value.stateName + '</td>';
                        tr += '<td class="postalCode">' + value.postalCode + '</td>';
                        tr += '<td><button class="btn btn-warning btn-xs" id="txtEdit' + count + '" type="button" onclick="EditEntry(' + value.stateID + ',' + value.countryId + ',\'txtEdit' + count + '\')"><i class="fa fa-pencil"></i></button>  <button class="btn btn-danger btn-xs" id="txtDelete' + count++ + '" type="button"  onclick="deleteItem(' + value.stateID + ')"><i class="fa fa-trash"></i></button></td>';
                    }
                    else if (forFn == 'district') {
                        tr += '<td class="countryId">' + value.countryName + '</td>';
                        tr += '<td class="stateName">' + value.stateName + '</td>';
                        tr += '<td class="districtCode">' + value.districtCode + '</td>';
                        tr += '<td class="districtName">' + value.districtName + '</td>';
                        tr += '<td><button class="btn btn-warning btn-xs" id="txtEdit' + count + '" type="button" onclick="EditEntry(' + value.districtID + ',' + value.stateID + ',' + value.countryId + ',\'txtEdit' + count + '\')"><i class="fa fa-pencil"></i></button>  <button class="btn btn-danger btn-xs" id="txtDelete' + count++ + '" type="button"  onclick="deleteItem(' + value.districtID + ')"><i class="fa fa-trash"></i></button></td>';
                    }
                    tr += '</tr>';
                    body.append(tr);
                });
            }
        }

    });
    table.DataTable();
}

function SaveDetail(url) {
    var districtID = hdnID.val();
    var stateID = ddlCountry.val();
    var Code = txtCode.val().trim();
    var Name = txtName.val().trim();
    var processedBy = '01650';


    if (Code != '' && Name != '' && stateID != '0' && stateID != '') {
        $.ajax({

            type: "POST",
            url: domainUrl+url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.responseData.success == 1) {
                    setMessage("Success", data.message);
                    ClearData();
                    LoadData(domainUrl);
                }
                else if (data.responseData.success == 2) {
                    setMessage("Warning", data.message);
                }
                else if (data.responseData.success == 0) {
                    setMessage("Error", data.message);
                }
            },
            failure: function (response) {
                setMessage("Error", response.responseText);
            },
            error: function (response) {
                setMessage("Error", response.responseText);
            }
        });
    }
    else {
        setMessage("Warning", '(*) Marked fields are required');
    }
}

function deleteItem(id) {
    if (window.confirm('Are you sure you want to delete detail?')) {
        DeleteEntry(domainUrl + 'app/DeleteDistrictDetail/' + id);
    }
}

function DeleteEntry(url) {
    $.ajax({

        type: "POST",
        url: domainUrl+url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.responseData.success == 1) {
                setMessage("Success", data.message);
                LoadData(domainUrl);
            }
            else if (data.responseData.success == 0) {
                setMessage("Error", data.message);
            }
        },
        failure: function (response) {
            setMessage("Error", response.responseText);
        },
        error: function (response) {
            setMessage("Error", response.responseText);
        }
    });
}