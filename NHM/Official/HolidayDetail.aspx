<%@ Page Title="Holiday Detail" Language="C#" MasterPageFile="~/Official/Site.Master" AutoEventWireup="true" CodeBehind="HolidayDetail.aspx.cs" Inherits="NHM.Official.HolidayDetail" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .distlevelNone{
            display:none;
        }
        .distlevel{
            display:block;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
    <div class="box box-primary">
        <div class="box-header">
            <h3 class="box-title"><b>
                <asp:Label ID="HeadingName" runat="server">Manage Holiday Detail</asp:Label></b></h3>
            <button type="button" id="btnWeekOff" class="btn btn-warning pull-right" onclick="SaveWeekOffData()" style="margin-left: 12px;">Add Week Offs</button>
            <button type="button" id="btnManage" class="btn btn-success pull-right" onclick="ClearData()" data-toggle="modal" data-target="#myModal">Add</button>
        </div>
    </div>
    <div class="box-body">
        <div class="row ">
            <table class="table table-bordered table-hover table-dark" id="tblTable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>HolidayType</th>
                        <th>Date</th>
                        <th>Day</th>
                        <th>District</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="tbBody">
                <tbody>
            </table>
        </div>
    </div>

    <!-- Modal -->
    <div class="myModal modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Add</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group">
                             <label id="lblchk" for="chkdistrict">Is At District Level</label>
                            <div class="custom-control"><input type = "checkbox" class="custom-control-input" id="chkdistrict" onclick="IsAtDistrictLevel()" ></div>
                        </div>
                        <div class="form-group distlevelNone">
                            <label id="lblCountryId" for="ddlCountry">Country</label>&nbsp;<span class="requiredField">*</span>
                            <select id="ddlCountry" class="form-control"><option value="0" >--Select--</option></select>  
                        </div>
                        <div class="form-group distlevelNone">
                            <label id="lblStateId" for="ddlState">State</label>&nbsp;<span class="requiredField">*</span>
                            <select id="ddlState" class="form-control"><option value="0" >--Select--</option></select>  
                        </div>
                        <div class="form-group distlevelNone">
                            <label id="lblDistrictId" for="ddlDistrict">District</label>&nbsp;<span class="requiredField">*</span>
                            <select id="ddlDistrict" class="form-control">
                                <option value="0">--Select--</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label id="lblHolidayTypeId" for="ddlHolidayType">Holiday Type</label>&nbsp;<span class="requiredField">*</span>
                            <select id="ddlHolidayType" class="form-control">
                                <option value="0">--Select--</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="hidden" id="hdnID" value="0" />
                            <label id="lblTodate" for="txtDate">Date</label>&nbsp;<span class="requiredField">*</span>
                            <input type="text" id="txtDate" value="" class="form-control datepicker" placeholder="Date" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" id="btnSave" class="btn btn-primary" onclick="SaveData()">Add</button>
                    <button type="button" id="btnReset" class="btn btn-warning" onclick="RestData()">Reset</button>
                </div>
            </div>
        </div>
    </div>

</section>

<script>    
    //$.noConflict();
    var domainUrl = "";
    var ddlHolidayType = $('#ddlHolidayType');
    var ddlCountry = $('#ddlCountry');
    var ddlState = $('#ddlState');
    var ddlDistrict = $('#ddlDistrict');
    var hdnID = $('#hdnID');
    var txtDate = $('#txtDate');
    var chkdistrict = $('#chkdistrict');
    var btnSave = $('#btnSave');
    var myModalLabel = $('#myModalLabel');
    var body = $('#tbBody');
    var table = $("#tblTable");
    var processedBy = sessionStorage.getItem("id");
    var loader = $('.ajax-loader');
    var year = new Date().getFullYear()
    $(document).ready(function () {
        getUrl('../');
        domainUrl = $('#hdnUrl').val();
        LoadHolidayTypes(domainUrl);
        LoadCountries(domainUrl);
        LoadData(domainUrl);
        txtDate.datepicker({
            dateFormat: "dd/mm/yy",
            beforeShow: function () {
                $(this).datepicker('option', 'minDate', new Date(year, 0, 1));
                $(this).datepicker('option', 'maxDate', new Date(year, 11, 31));
            }
        });
    });

    function ClearData() {
        RestData();
        $('#myModal').modal('hide');
    }

    function RestData() {
        ddlHolidayType.val(0);
        ddlCountry.val(0);
        LoadStates(domainUrl);
        hdnID.val(0);
        txtDate.val('');
        btnSave.html('Add');
        myModalLabel.html('Add');
    }

    ddlCountry.on('change', function () {
        LoadStates(domainUrl);
    });

    ddlState.on('change', function () {
        LoadDistricts(domainUrl);
    });

    function IsAtDistrictLevel() {
        if (chkdistrict.prop('checked')) {
            $('.distlevelNone').addClass('distlevel');
        }
        else {
            $('.distlevelNone').removeClass('distlevel');
        }
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
            beforeSend: function () {
                loader.show();
            },
            complete: function () {

                loader.hide();
            },
            success: function (data) {
                if (data.isSucess) {
                    $.each(data.responseData, function (index, value) {
                        ddlCountry.append($("<option></option>").val(value.countryId).html(value.countryName));
                    });
                }
            },
            failure: function (response) {
                loader.hide();
                setMessage("Error", response.responseText);
            },
            error: function (response) {
                loader.hide();
                setMessage("Error", response.responseText);
            }

        });
        LoadStates(domainUrl);
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
                beforeSend: function () {
                    loader.show();
                },
                complete: function () {
                    loader.hide();
                },
                success: function (data) {
                    if (data.isSucess) {
                        $.each(data.responseData, function (index, value) {
                            ddlState.append($("<option></option>").val(value.stateID).html(value.stateName));
                        });
                    }
                },
                failure: function (response) {
                    loader.hide();
                    setMessage("Error", response.responseText);
                },
                error: function (response) {
                    loader.hide();
                    setMessage("Error", response.responseText);
                }

            });
        }
        LoadDistricts(domainUrl);
    }

    function LoadDistricts(domainUrl) {
        var countryID = ddlCountry.val();
        var stateID = ddlState.val();
        ddlDistrict.empty();
        ddlDistrict.append($("<option></option>").val(0).html('--Select--'));
        if (stateID != '0' && stateID != '') {

            $.ajax({

                type: "GET",
                url: domainUrl + 'app/GetDistricts/0/' + stateID + '/' + countryID,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                beforeSend: function () {
                    loader.show();
                },
                complete: function () {
                    loader.hide();
                },
                success: function (data) {
                    if (data.isSucess) {
                        $.each(data.responseData, function (index, value) {
                            ddlDistrict.append($("<option></option>").val(value.districtID).html(value.districtName));
                        });
                    }
                },
                failure: function (response) {
                    loader.hide();
                    setMessage("Error", response.responseText);
                },
                error: function (response) {
                    loader.hide();
                    setMessage("Error", response.responseText);
                }

            });
        }
    }

    function LoadHolidayTypes(domainUrl) {
        var countryID = ddlCountry.val();
        var stateID = ddlState.val();
        var districtID = ddlDistrict.val();
        ddlHolidayType.empty();
        ddlHolidayType.append($("<option></option>").val(0).html('--Select--'));
        $.ajax({

            type: "GET",
            url: domainUrl + 'app/GetHolidayTypeDetail/0',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {
                loader.show();
            },
            complete: function () {
                loader.hide();
            },
            success: function (data) {
                if (data.isSucess) {
                    $.each(data.responseData, function (index, value) {
                        ddlHolidayType.append($("<option></option>").val(value.typeID).html(value.typeName));
                    });
                }
            },
            failure: function (response) {
                loader.hide();
                setMessage("Error", response.responseText);
            },
            error: function (response) {
                loader.hide();
                setMessage("Error", response.responseText);
            }

        });
    }

    function LoadData(domainUrl) {
        body.empty();
        table.DataTable().clear().destroy();
        $.ajax({

            type: "GET",
            url: domainUrl + 'app/GetHolidayDetail/0/0',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {
                loader.show();
            },
            complete: function () {
                loader.hide();
            },
            success: function (data) {
                if (data.isSucess) {
                    var count = 1;
                    $.each(data.responseData, function (index, value) {
                        var tr = '<tr class="d">';
                        tr += '<td scope="row">' + count + '</td>';
                        tr += '<td>' + value.typeName + '</td>';
                        tr += '<td>' + value.date + '</td>';
                        tr += '<td>' + value.day + '</td>';
                        tr += '<td>' + value.districtName + '</td>';
                        tr += '<td><button class="btn btn-danger btn-xs" id="txtDelete' + count + '" type="button"  onclick="deleteItem(' + value.id + ',' + value.districtID +')"><i class="fa fa-trash"></i></button></td>';
                        tr += '</tr>';
                        body.append(tr);
                        count++;
                    });
                }
            },
            failure: function (response) {
                loader.hide();
                setMessage("Error", response.responseText);
            },
            error: function (response) {
                loader.hide();
                setMessage("Error", response.responseText);
            }

        });
        table.DataTable();
    }

    function SaveData() {

        var ID = hdnID.val();
        var DistrictId = chkdistrict.prop('checked')? ddlDistrict.val():0;
        var holidayTypeID = ddlHolidayType.val();
        var DateVal = txtDate.val().trim();
        var flag = 1;
        if (chkdistrict.prop('checked')) { DistrictId != '0' ? flag = 1 : flag = 0; }
        else {
            flag=1;
        };

        if (DateVal != '' && flag != 0 && holidayTypeID != '0') {

            $.ajax({

                type: "POST",
                url: domainUrl + 'app/CreateHolidayDetail?date=' + DateVal + '&holidayTypeID=' + holidayTypeID + '&districtID=' + DistrictId + '&processedBy=' + processedBy,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                beforeSend: function () {
                    loader.show();
                },
                complete: function () {
                    loader.hide();
                },
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
                    loader.hide();
                    setMessage("Error", response.responseText);
                },
                error: function (response) {
                    loader.hide();
                    setMessage("Error", response.responseText);
                }
            });
        }
        else {
            setMessage("Warning", '(*) Marked fields are required');
        }
    }
    function deleteItem(id, districtID) {
        if (window.confirm('Are you sure you want to delete holiday detail?')) {
            DeleteEntry(id, districtID);
        }
    }

    function DeleteEntry(id,districtID) {
        $.ajax({

            type: "POST",
            url: domainUrl + 'app/DeleteHolidayDetail/' + id + '/' + districtID,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {
                loader.show();
            },
            complete: function () {
                loader.hide();
            },
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
                loader.hide();
                setMessage("Error", response.responseText);
            },
            error: function (response) {
                loader.hide();
                setMessage("Error", response.responseText);
            }
        });
    }

    function SaveWeekOffData() {
        $.ajax({

            type: "POST",
            url: domainUrl + 'app/CreateHolidayWeekOffDetail?processedBy=' + processedBy,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            beforeSend: function () {
                loader.show();
            },
            complete: function () {
                loader.hide();
            },
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
                loader.hide();
                setMessage("Error", response.responseText);
            },
            error: function (response) {
                loader.hide();
                setMessage("Error", response.responseText);
            }
        });
    }
</script>
</asp:Content>
