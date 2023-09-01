<%@ Page Title="State Detail" Language="C#" MasterPageFile="~/Official/Site.Master" AutoEventWireup="true" CodeBehind="StateDetail.aspx.cs" Inherits="NHM.Official.StateDetail" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
        <div class="box box-primary">
            <div class="box-header">
                <h3 class="box-title"><b>
                    <asp:Label ID="HeadingName" runat="server">Manage State Detail</asp:Label></b></h3>
                <button type="button" id="btnManage" class="btn btn-success pull-right" onclick="ClearData()" data-toggle="modal" data-target="#myModal">Add</button>
            </div>
        </div>
        <div class="box-body">
            <div class="row ">
                <table class="table table-bordered table-hover table-dark" id="tblState">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Country</th>
                            <th>State Code</th>
                            <th>State Name</th>
                            <th>Postal Code</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="tbState">
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
                    <input type="hidden" id="hdnStateID" value="0" />
                    <label id="lblCode" for="txtCode">State Code</label>&nbsp;<span class="requiredField">*</span>
                    <input type="text" id="txtCode" value="" class="form-control" placeholder="State Code" />
                </div>
                <div class="form-group">
                    <label id="lblStateName" for="txtCountryName">State Name</label>&nbsp;<span class="requiredField">*</span>
                    <input type="text" id="txtStateName" value="" class="form-control" placeholder="State Name" />
                </div>
                <div class="form-group">
                    <label id="lblPostalCode" for="txtPostalCode">Postal Code</label>&nbsp;<span class="requiredField">*</span>    
                    <input type="number" id="txtPostalCode" onKeyPress="if(this.value.length==6) return false;"  value="" class="form-control" placeholder="Postal Code" />
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
        var hdnStateID = $('#hdnStateID');
        var txtStateCode = $('#txtCode');
        var txtStateName = $('#txtStateName');
        var txtPostalCode = $('#txtPostalCode');
        var btnSave = $('#btnSave');
        var myModalLabel = $('#myModalLabel');
        var body = $('#tbState');
        var table = $("#tblState");
        var processedBy = sessionStorage.getItem("hrms");


        $(document).ready(function () {
            getUrl('../');            
            domainUrl=$('#hdnUrl').val();
            LoadStates(domainUrl);
            LoadCountries(domainUrl);
            table.DataTable();
        });

        function ClearData() {
            RestData();
            $('#myModal').modal('hide');
        }

        function RestData() {
            ddlCountry.val(0);
            hdnStateID.val(0);
            txtStateCode.val('');
            txtStateName.val('');
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
            body.empty();
            $.ajax({

                type: "GET",
                url: domainUrl + 'app/GetStates/0/0',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (data) {
                    if (data.isSucess) {
                        var count = 1;
                        $.each(data.responseData, function (index, value) {

                            var tr = '<tr class="d">';
                            tr += '<td scope="row">' + count + '</td>';
                            tr += '<td class="countryId">' + value.countryName + '</td>';
                            tr += '<td class="stateCode">' + value.stateCode + '</td>';
                            tr += '<td class="stateName">' + value.stateName + '</td>';
                            tr += '<td class="postalCode">' + value.postalCode + '</td>';
                            tr += '<td><button class="btn btn-warning btn-xs" id="txtEdit' + count + '" type="button" onclick="EditEntry(' + value.stateID + ',' + value.countryId + ',\'txtEdit' + count + '\')"><i class="fa fa-pencil"></i></button>  <button class="btn btn-danger btn-xs" id="txtDelete' + count++ + '" type="button"  onclick="deleteItem(' + value.stateID + ')"><i class="fa fa-trash"></i></button></td>';
                            tr += '</tr>';
                            body.append(tr);
                        });
                    }
                }

            });
        }

        function SaveData() {

            var stateID = hdnStateID.val();
            var CountryId = ddlCountry.val();
            var stateCode = txtStateCode.val().trim();
            var stateName = txtStateName.val().trim();
            var postalCode = txtPostalCode.val().trim();
            var zipRegex = /^\d{6}$/;


            if (stateCode != '' && stateName != '' && CountryId != '0' && CountryId != '' & postalCode != '') {
                if (zipRegex.test(postalCode)) {
                    $.ajax({

                        type: "POST",
                        url: domainUrl + 'app/CreateUpdateStateDetailPost?stateID=' + stateID + '&countryid=' + CountryId + '&stateCode=' + stateCode + '&stateName=' + stateName + '&postalCode=' + postalCode + '&processedBy=' + processedBy,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (data) {
                            if (data.responseData.success == 1) {
                                setMessage("Success", data.message);
                                ClearData();
                                LoadStates(domainUrl);
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
                    setMessage("Warning", 'Invalid postal code');
                }
            }
            else {
                setMessage("Warning", '(*) Marked fields are required');
            }
        }

        function EditEntry(id,countryid, td)
        {
            hdnStateID.val(id);
            ddlCountry.val(countryid);
            $('#' + td).closest('tr').find('td').each(function () {
                
                if ($(this).attr('class') == "stateName") {
                    txtStateName.val ($(this).html().trim());
                } else if ($(this).attr('class') == "stateCode") {
                    txtStateCode.val($(this).html().trim());
                }
                else if ($(this).attr('class') == "postalCode") {
                    txtPostalCode.val($(this).html().trim());
                }
            });
            btnSave.html('Update');
            myModalLabel.html('Update');
            $('#myModal').modal('show');
        }

        function deleteItem(id) {
            if (window.confirm('Are you sure you want to delete state detail?')) {DeleteEntry(id);
            }
        }

        function DeleteEntry(id) {
            $.ajax({

                type: "POST",
                url: domainUrl + 'app/DeleteStateDetail/'+id,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (data) {
                    if (data.responseData.success == 1) {
                        setMessage("Success", data.message);
                        LoadStates(domainUrl);
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
    </script>
</asp:Content>
