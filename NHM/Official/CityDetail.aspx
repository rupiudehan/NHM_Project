<%@ Page Title="City Detail" Language="C#" MasterPageFile="~/Official/Site.Master" AutoEventWireup="true" CodeBehind="CityDetail.aspx.cs" Inherits="NHM.Official.CityDetail" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
       <section class="content">
        <div class="box box-primary">
            <div class="box-header">
                <h3 class="box-title"><b>
                    <asp:Label ID="HeadingName" runat="server">Manage City Detail</asp:Label></b></h3>
                <button type="button" id="btnManage" class="btn btn-success pull-right" onclick="ClearData()" data-toggle="modal" data-target="#myModal">Add</button>
            </div>
        </div>
        <div class="box-body">
            <div class="row ">
                <table class="table table-bordered table-hover table-dark" id="tbl">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Country</th>
                            <th>State Name</th>
                            <th>District Name</th>
                            <th>City Code</th>
                            <th>City Name</th>
                            <th>Postal Code</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                    <tbody>
                </table>
            </div>
        </div>
    
   <%-- <div class="ajax-loader" id="loader">
        <img src="../images/loading.gif" id="image" class="img-responsive" />
    </div>  --%>
    <!-- Modal -->
    <div class="myModal modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Add</h4>
          </div>
          <div class="modal-body" style="max-height:350px;overflow-y:auto">            
            <div class="row">
                <div class="form-group">
                    <label id="lblCountryId" for="ddlCountry">Country</label>&nbsp;<span class="requiredField">*</span>
                    <select id="ddlCountry" class="form-control"><option value="0" >--Select--</option></select>  
                </div>
                <div class="form-group">
                    <label id="lblStateId" for="ddlState">State</label>&nbsp;<span class="requiredField">*</span>
                    <select id="ddlState" class="form-control"><option value="0" >--Select--</option></select>  
                </div>
                <div class="form-group">
                    <label id="lblDistrictId" for="ddlDistrict">District</label>&nbsp;<span class="requiredField">*</span>
                    <select id="ddlDistrict" class="form-control"><option value="0" >--Select--</option></select>  
                </div>
                <div class="form-group">
                    <input type="hidden" id="hdnID" value="0" />
                    <label id="lblCode" for="txtCode">City Code</label>&nbsp;<span class="requiredField">*</span>
                    <input type="text"  onkeypress='return validateAlphabets(event)' id="txtCode" value="" class="form-control" placeholder="City Code" />
                </div>
                <div class="form-group">
                    <label id="lblName" for="txtName">City Name</label>&nbsp;<span class="requiredField">*</span>
                    <input type="text" onkeypress='return validateAlphabets(event)' id="txtName" value="" class="form-control" placeholder="City Name" />
                </div>
                <div class="form-group">
                    <label id="lblPostalCode" for="txtPostalCode">Postal Code</label>&nbsp;<%--<span class="requiredField">*</span>--%>    
                    <input type="number" id="txtPostalCode" value="" onKeyPress="if(this.value.length==6) return false;" class="form-control" placeholder="Postal Code" />
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
        var ddlCountry = $('#ddlCountry');
        var ddlState = $('#ddlState');
        var ddlDistrict = $('#ddlDistrict');
        var hdnID = $('#hdnID');
        var txtCode = $('#txtCode');
        var txtName = $('#txtName');
        var txtPostalCode = $('#txtPostalCode');
        var btnSave = $('#btnSave');
        var myModalLabel = $('#myModalLabel');
        var body = $('#tbody');
        var table = $("#tbl");
        var processedBy = sessionStorage.getItem("hrms");
        var loader = $('.ajax-loader');



        $(document).ready(function () {
            getUrl('../');
            $('#myModal').modal('hide');
            domainUrl = $('#hdnUrl').val();
            LoadCountries(domainUrl);
            LoadData(domainUrl);
            loader.hide();
        });

        ddlCountry.on('change', function () {
            LoadStates(domainUrl);
        });

        ddlState.on('change', function () {
            LoadDistricts(domainUrl);
        });

        function ClearData() {
            RestData();
            $('#myModal').modal('hide');
        }

        function RestData() {
            ddlCountry.val(0);
            LoadStates(domainUrl);
            hdnID.val(0);
            txtCode.val('');
            txtName.val('');
            txtPostalCode.val('');
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

        function LoadData(domainUrl) {
            body.empty();
            table.DataTable().clear().destroy();

            $.ajax({

                type: "GET",
                url: domainUrl + 'app/GetCities/0/0/0/0',
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
                            var postalcode=value.cityPostalCode == null ? "-" : value.cityPostalCode;
                            var tr = '<tr class="d">';
                            tr += '<td scope="row">' + count + '</td>';
                            tr += '<td class="countryId">' + value.countryName + '</td>';
                            tr += '<td class="stateName">' + value.stateName + '</td>';
                            tr += '<td class="districtName">' + value.districtName + '</td>';
                            tr += '<td class="cityCode">' + value.cityCode + '</td>';
                            tr += '<td class="cityName">' + value.cityName + '</td>';
                            tr += '<td class="cityPostalCode">' + postalcode + '</td>';
                            tr += '<td><button class="btn btn-warning btn-xs" id="txtEdit' + count + '" type="button" onclick="EditEntry(' + value.cityID + ',' + value.districtID + ',' + value.stateID + ',' + value.countryId + ',\'txtEdit' + count + '\')"><i class="fa fa-pencil"></i></button>  <button class="btn btn-danger btn-xs" id="txtDelete' + count++ + '" type="button"  onclick="deleteItem(' + value.cityID + ')"><i class="fa fa-trash"></i></button></td>';
                            tr += '</tr>';
                            body.append(tr);
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
            var districtID = ddlDistrict.val();
            var Code = txtCode.val().trim();
            var Name = txtName.val().trim();
            var postalCode = txtPostalCode.val().trim();
            var zipRegex = /^\d{6}$/;
            var flag = 1;

            if (Code != '' && Name != '' && districtID != '0' && districtID != '') {
                if (postalCode != '') {
                    if (zipRegex.test(postalCode)) {
                        flag = 1
                    } else {
                        flag=0
                    }
                }
                if (flag=1) {
                    $.ajax({

                        type: "POST",
                        url: domainUrl + 'app/CreateUpdateCityDetailPost?ID=' + ID + '&districtID=' + districtID + '&cityCode=' + Code + '&cityName=' + Name + '&postalCode=' + postalCode + '&processedBy=' + processedBy,
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
                    loader.hide();
                    setMessage("Warning", 'Invalid postal code');
                }
            }
            else {
                loader.hide();
                setMessage("Warning", '(*) Marked fields are required');
            }
        }

        function EditEntry(id,district, stateID, countryid, td) {
            hdnID.val(id);
            ddlCountry.val(countryid);
            LoadStates(domainUrl);
            ddlState.val(stateID);
            LoadDistricts(domainUrl);
            ddlDistrict.val(district);
            $('#' + td).closest('tr').find('td').each(function () {

                if ($(this).attr('class') == "cityName") {
                    txtName.val($(this).html().trim());
                } else if ($(this).attr('class') == "cityCode") {
                    txtCode.val($(this).html().trim());
                }
                else if ($(this).attr('class') == "cityPostalCode") {
                    txtPostalCode.val($(this).html().trim());
                }
            });
            btnSave.html('Update');
            myModalLabel.html('Update');
            $('#myModal').modal('show');
        }

        function deleteItem(id) {
            if (window.confirm('Are you sure you want to delete detail?')) {
                DeleteEntry(domainUrl + 'app/DeleteCityDetail/' + id);
            }
        }

        function DeleteEntry(url) {
            $.ajax({

                type: "POST",
                url: url,
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
    </script>
</asp:Content>
