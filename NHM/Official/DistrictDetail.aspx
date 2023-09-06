<%@ Page Title="District Detail" Language="C#" MasterPageFile="~/Official/Site.Master" AutoEventWireup="true" CodeBehind="DistrictDetail.aspx.cs" Inherits="NHM.Official.DistrictDetail" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
        <div class="box box-primary">
            <div class="box-header">
                <h3 class="box-title"><b>
                    <asp:Label ID="HeadingName" runat="server">Manage District Detail</asp:Label></b></h3>
                <button type="button" id="btnManage" class="btn btn-success pull-right" onclick="ClearData()" data-toggle="modal" data-target="#myModal">Add</button>
            </div>
        </div>
        <div class="box-body">
            <div class="row ">
                <table class="table table-bordered table-hover table-dark" id="tblDistrict">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Country</th>
                            <th>State Name</th>
                            <th>District Code</th>
                            <th>District Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="tbDistrict">
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
                    <select id="ddlCountry" class="form-control"><option value="0" >--Select--</option></select>  
                </div>
                <div class="form-group">
                    <label id="lblStateId" for="ddlState">State</label>&nbsp;<span class="requiredField">*</span>
                    <select id="ddlState" class="form-control"><option value="0" >--Select--</option></select>  
                </div>
                <div class="form-group">
                    <input type="hidden" id="hdnDistrictID" value="0" />
                    <label id="lblCode" for="txtCode">District Code</label>&nbsp;<span class="requiredField">*</span>
                    <input type="text" id="txtCode" value="" class="form-control" placeholder="District Code" />
                </div>
                <div class="form-group">
                    <label id="lblDistrictName" for="txtDistrictName">District Name</label>&nbsp;<span class="requiredField">*</span>
                    <input type="text" id="txtDistrictName" value="" class="form-control" placeholder="District Name" />
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
        var hdnID = $('#hdnDistrictID');
        var txtCode = $('#txtCode');
        var txtName = $('#txtDistrictName');
        var btnSave = $('#btnSave');
        var myModalLabel = $('#myModalLabel');
        var body = $('#tbDistrict');
        var table = $("#tblDistrict");
        var processedBy = sessionStorage.getItem("hrms");
        var loader = $('.ajax-loader');


        $(document).ready(function () {
            getUrl('../');            
            domainUrl=$('#hdnUrl').val();
            LoadCountries(domainUrl);
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
            LoadStates(domainUrl);
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
            
        }

        function LoadData(domainUrl) {
            body.empty();
            table.DataTable().clear().destroy();

            $.ajax({

                type: "GET",
                url: domainUrl + 'app/GetDistricts/0/0/0',
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
                            tr += '<td class="countryId">' + value.countryName + '</td>';
                            tr += '<td class="stateName">' + value.stateName + '</td>';
                            tr += '<td class="districtCode">' + value.districtCode + '</td>';
                            tr += '<td class="districtName">' + value.districtName + '</td>';
                            tr += '<td><button class="btn btn-warning btn-xs" id="txtEdit' + count + '" type="button" onclick="EditEntry(' + value.districtID + ',' + value.stateID + ',' + value.countryId + ',\'txtEdit' + count + '\')"><i class="fa fa-pencil"></i></button>  <button class="btn btn-danger btn-xs" id="txtDelete' + count++ + '" type="button"  onclick="deleteItem(' + value.districtID + ')"><i class="fa fa-trash"></i></button></td>';
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

            var districtID = hdnID.val();
            var stateID = ddlState.val();
            var Code = txtCode.val().trim();
            var Name = txtName.val().trim();


            if (Code != '' && Name != '' && stateID != '0' && stateID != '') {

                $.ajax({

                    type: "POST",
                    url: domainUrl + 'app/CreateUpdateDistrictDetailPost?districtID=' + districtID + '&stateID=' + stateID + '&districtCode=' + Code + '&districtName=' + Name + '&processedBy=' + processedBy,
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
                setMessage("Warning", '(*) Marked fields are required');
            }
        }

        function EditEntry(id,stateID,countryid, td)
        {
            hdnID.val(id);
            ddlCountry.val(countryid);
            LoadStates(domainUrl);
            ddlState.val(stateID);
            $('#' + td).closest('tr').find('td').each(function () {
                
                if ($(this).attr('class') == "districtName") {
                    txtName.val ($(this).html().trim());
                } else if ($(this).attr('class') == "districtCode") {
                    txtCode.val($(this).html().trim());
                }
            });
            btnSave.html('Update');
            myModalLabel.html('Update');
            $('#myModal').modal('show');
        }

        function deleteItem(id) {
            if (window.confirm('Are you sure you want to delete detail?')) {
                DeleteEntry(domainUrl + 'app/DeleteDistrictDetail/' + id);
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
