<%@ Page Title="Office Detail" Language="C#" MasterPageFile="~/Official/Site.Master" AutoEventWireup="true" CodeBehind="OfficeDetail.aspx.cs" Inherits="NHM.Official.OfficeDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
        <div class="box box-primary">
            <div class="box-header">
                <h3 class="box-title"><b>
                    <asp:Label ID="HeadingName" runat="server">Manage Office Detail</asp:Label></b></h3>
                <button type="button" id="btnManage" class="btn btn-success pull-right" onclick="ClearData()" data-toggle="modal" data-target="#myModal">Add</button>
            </div>
        </div>
        <div class="box-body">
            <div class="row ">
                <table class="table table-bordered table-hover table-dark" id="tblTable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>District</th>
                            <th>City</th>
                            <th>Office Name</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Office Timings</th>
                            <th>Set Time</th>
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
                                <label id="lblCountryId" for="ddlCountry">Country</label>&nbsp;<span class="requiredField">*</span>
                                <select id="ddlCountry" class="form-control">
                                    <option value="0">--Select--</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label id="lblStateId" for="ddlState">State</label>&nbsp;<span class="requiredField">*</span>
                                <select id="ddlState" class="form-control">
                                    <option value="0">--Select--</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label id="lblDistrictId" for="ddlDistrict">District</label>&nbsp;<span class="requiredField">*</span>
                                <select id="ddlDistrict" class="form-control">
                                    <option value="0">--Select--</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label id="lblCityId" for="ddlCity">City</label>&nbsp;<span class="requiredField">*</span>
                                <select id="ddlCity" class="form-control">
                                    <option value="0">--Select--</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <input type="hidden" id="hdnID" value="0" />
                                <label id="lbleName" for="txtName">Office Name</label>&nbsp;<span class="requiredField">*</span>
                                <input type="text" id="txtName" value="" class="form-control" placeholder="Office Name" />
                            </div>
                            <div class="form-group">
                                <label id="lblLatitude" for="txtLatitude">Latitude</label>&nbsp;<span class="requiredField">*</span>
                                <input type="number" id="txtLatitude" class="form-control" placeholder="Latitude" />
                            </div>
                            <div class="form-group">
                                <label id="lblLongitude" for="txtCode">Longitude</label>&nbsp;<span class="requiredField">*</span>
                                <input type="number" id="txtLongitude" value="" class="form-control" placeholder="Longitude" />
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

        <!-- Office Timing Modal -->
       
        <div class="modal fade" id="timeModal" tabindex="-1" role="dialog" aria-labelledby="timeModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="timeModalLabel">Set Office Timings</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <input type="hidden" id="hdnOfficeID" value="0" />
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="form-group">
                                <label id="lblIntime" for="txtIn">In Time</label>&nbsp;<span class="requiredField">*</span>
                                <div class="input-group clockpicker" data-placement="left" data-align="top" data-autoclose="true">
                                    <input type="text" class="form-control" id="txtIn" value="" placeholder="In Time">
                                    <span class="input-group-addon">
                                        <span class="glyphicon glyphicon-time"></span>
                                    </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label id="lblOuttime" for="txtOut">Out Time</label>&nbsp;<span class="requiredField">*</span>
                                <div class="input-group clockpicker" data-placement="left" data-align="top" data-autoclose="true">
                                    <input type="text" class="form-control" id="txtOut" value="" placeholder="Out Time">
                                    <span class="input-group-addon">
                                        <span class="glyphicon glyphicon-time"></span>
                                    </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label id="lblHalfDaytime" for="txtHalfDay">Half Day Time</label>&nbsp;<span class="requiredField">*</span>
                                <div class="input-group clockpicker" data-placement="left" data-align="top" data-autoclose="true">
                                    <input type="text" class="form-control" id="txtHalfDay" value="" placeholder="Half day Time">
                                    <span class="input-group-addon">
                                        <span class="glyphicon glyphicon-time"></span>
                                    </span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label id="lblShorttime" for="txtShort">Short Leave Time</label>&nbsp;<span class="requiredField">*</span>
                                <div class="input-group clockpicker" data-placement="left" data-align="top" data-autoclose="true">
                                    <input type="text" class="form-control" id="txtShort" value="" placeholder="Short Leave Time">
                                    <span class="input-group-addon">
                                        <span class="glyphicon glyphicon-time"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" id="btnTimeSave" class="btn btn-primary" onclick="SaveTimeData()">Save</button>
                        <button type="button" id="btnTimeReset" class="btn btn-warning" onclick="RestTime()">Reset</button>
                    </div>
                </div>
            </div>
        </div>

    </section>

    <script>    
        //$.noConflict();
        var domainUrl = "";
        var ddlCountry = $('#ddlCountry');
        var ddlState = $('#ddlState');
        var ddlDistrict = $('#ddlDistrict');
        var ddlCity = $('#ddlCity');
        var hdnID = $('#hdnID');
        var txtLatitude = $('#txtLatitude');
        var txtName = $('#txtName');
        var txtLongitude = $('#txtLongitude');
        var btnSave = $('#btnSave');
        var myModalLabel = $('#myModalLabel');
        var body = $('#tbBody');
        var table = $("#tblTable");
        var processedBy = sessionStorage.getItem("hrms");
        var loader = $('.ajax-loader');

        var txtIn = $('#txtIn');
        var txtOut = $('#txtOut');
        var txtHalfDay = $('#txtHalfDay');
        var txtShort = $('#txtShort');
        var btnTimeSave = $('#btnTimeSave');
        var modelTime = $('#timeModal');
        var hdnOfficeID = $('#hdnOfficeID');


        $(document).ready(function () {
            getUrl('../');
            domainUrl = $('#hdnUrl').val();
            LoadCountries(domainUrl);
            LoadData(domainUrl);


        });

        $('.clockpicker').clockpicker({
            placement: 'right',
            align: 'right',
            //donetext: 'Done',
            autoclose: true,
            'default': 'now'
        });

        function setTime(officeID) {
            hdnOfficeID.val(officeID);
            modelTime.modal('show');
        }

        function ResetTime() {
            txtIn.val('');
            txtOut.val('');
            txtHalfDay.val('');
            txtShort.val('');
        }

        function ClearTimeData() {
            hdnOfficeID.val(0);
            ResetTime();
            modelTime.modal('hide');
        }

        function ClearData() {
            RestData();
            $('#myModal').modal('hide');
        }

        function RestData() {
            ddlCountry.val(0);
            LoadStates(domainUrl);
            hdnID.val(0);
            txtName.val('');
            txtLatitude.val('');
            txtLongitude.val('');
            btnSave.html('Add');
            myModalLabel.html('Add');
        }

        ddlCountry.on('change', function () {
            LoadStates(domainUrl);
        });

        ddlState.on('change', function () {
            LoadDistricts(domainUrl);
        });

        ddlDistrict.on('change', function () {
            LoadCities(domainUrl);
        });

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
            LoadCities(domainUrl);
        }

        function LoadCities(domainUrl) {
            var countryID = ddlCountry.val();
            var stateID = ddlState.val();
            var districtID = ddlDistrict.val();
            ddlCity.empty();
            ddlCity.append($("<option></option>").val(0).html('--Select--'));
            $.ajax({

                type: "GET",
                url: domainUrl + 'app/GetCities/0/' + districtID + '/' + stateID + '/' + countryID,
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
                            ddlCity.append($("<option></option>").val(value.cityID).html(value.cityName));
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
                url: domainUrl + 'app/GetOffices/0/0/0/0/0',
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
                            var shorttime = value.shortLeaveTime != '' ? '<br/><strong>Short Leave Time</strong>: ' + value.shortLeaveTime : '';
                            var halftime = value.halfDayTime != '' ? '<br/><strong>Half Time</strong>: ' + value.halfDayTime : '';
                            var time = halftime + shorttime;
                            var officetime = value.officeInTime != '' ? value.officeInTime + ' - ' + value.officeOutTime : ''

                            var tr = '<tr class="d">';
                            tr += '<td scope="row">' + count + '</td>';
                            tr += '<td>' + value.countryName + '</td>';
                            tr += '<td>' + value.stateName + '</td>';
                            tr += '<td>' + value.districtName + '</td>';
                            tr += '<td>' + value.cityName + '</td>';
                            tr += '<td class="office">' + value.officeName + '</td>';
                            tr += '<td class="lati">' + value.officeLattitute + '</td>';
                            tr += '<td class="longi">' + value.officeLongitute + '</td>';
                            tr += '<td>' + officetime + time + '</td>';
                            tr += '<td style="text-align:center;"><button class="btn btn-primary btn-xs" id="txtTime' + count + '" type="button"  onclick="setTime(' + value.officeID + ')"><i class="fa fa-clock"></i></button></td>';
                            tr += '<td style="width:65px;text-align:center;"><button class="btn btn-warning btn-xs" id="txtEdit' + count + '" type="button" onclick="EditEntry(' + value.officeID + ',' + value.cityID + ',' + value.districtID + ',' + value.stateID + ',' + value.countryId + ',\'txtEdit' + count + '\')"><i class="fa fa-pencil"></i></button>  <button class="btn btn-danger btn-xs" id="txtDelete' + count + '" type="button"  onclick="deleteItem(' + value.officeID + ')"><i class="fa fa-trash"></i></button></td>';
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
            var stateID = ddlState.val();
            var CountryId = ddlCountry.val();
            var CityId = ddlCity.val();
            var DistrictId = ddlDistrict.val();
            var officeName = txtName.val().trim();
            var Latitude = txtLatitude.val().trim();
            var Longitude = txtLongitude.val().trim();


            if (Longitude != '' && Latitude != '' && DistrictId != '0' && officeName != '' && stateID != '0' && CountryId != '0' && CityId != '0') {

                $.ajax({

                    type: "POST",
                    url: domainUrl + 'app/CreateUpdateOfficeDetailPost?id=' + ID + '&cityID=' + CityId + '&officeName=' + officeName + '&latitute=' + Latitude + '&longitute=' + Longitude + '&processedBy=' + processedBy,
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

        function EditEntry(id, cityid, district, stateid, countryid, td) {
            hdnID.val(id);
            ddlCountry.val(countryid);
            LoadStates(domainUrl);
            ddlState.val(stateid);
            LoadDistricts(domainUrl);
            ddlDistrict.val(district);
            LoadCities(domainUrl);
            ddlCity.val(cityid);
            $('#' + td).closest('tr').find('td').each(function () {

                if ($(this).attr('class') == "office") {
                    txtName.val($(this).html().trim());
                } else if ($(this).attr('class') == "lati") {
                    txtLatitude.val($(this).html().trim());
                }
                else if ($(this).attr('class') == "longi") {
                    txtLongitude.val($(this).html().trim());
                }
            });
            btnSave.html('Update');
            myModalLabel.html('Update');
            $('#myModal').modal('show');
        }

        function deleteItem(id) {
            if (window.confirm('Are you sure you want to delete office detail?')) {
                DeleteEntry(id);
            }
        }

        function DeleteEntry(id) {
            $.ajax({

                type: "POST",
                url: domainUrl + 'app/DeleteOfficeDetail/' + id,
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

        function SaveTimeData() {
            var officeID = hdnOfficeID.val();
            var inTime = txtIn.val();
            var outTime = txtOut.val();
            var halfTime = txtHalfDay.val();
            var shortTime = txtShort.val();


            if (inTime != '' && outTime != '' && halfTime != '' && shortTime != '' ) {

                $.ajax({

                    type: "POST",
                    url: domainUrl + 'app/SetOfficeTimeDetailPost?officeID=' + officeID + '&inTime=' + inTime + '&outTime=' + outTime + '&halfTime=' + halfTime + '&shortTime=' + shortTime + '&processedBy=' + processedBy,
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
                            ClearTimeData();
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
                loader.hide();
                setMessage("Warning", '(*) Marked fields are required');
            }
        }
    </script>
</asp:Content>
