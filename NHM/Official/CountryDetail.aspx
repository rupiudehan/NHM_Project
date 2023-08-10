<%@ Page Title="" Language="C#" MasterPageFile="~/Official/Site.Master" AutoEventWireup="true" CodeBehind="CountryDetail.aspx.cs" Inherits="NHM.Official.CountryDetail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <title>Country Detail</title>
    <script>
        //function toasterCheck() {
        //    toastr.success("Success", "To", {tapToDismiss:true,"closeButton":true});
        //}
        //function check() {
        //    swal("Here's a title", "Here's some text", "success", {
        //        button: "I am new button",

        //    });
        //}

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
        <div class="box box-primary">
            <div class="box-header">
                <h3 class="box-title"><b>
                    <asp:Label ID="HeadingName" runat="server">Manage Country Detail</asp:Label></b></h3>
                <button type="button" id="btnManage" class="btn btn-success pull-right" onclick="ClearData()" data-toggle="modal" data-target="#myModal">Add</button>
            </div>
        </div>
        <div class="box-body">
            <%-- <div class="row ">
                <div class="col-md-4 form-group">
                    <asp:HiddenField ID="hdBrandID" runat="server" />
                    <asp:Label ID="lblBrands" runat="server" Text="Brand Name"></asp:Label>
                    <asp:RequiredFieldValidator RequiredFieldValidatorID="brandstxt" runat="server" ControlToValidate="txtBrands"
                        ErrorMessage="*" ValidationGroup="Validate" ForeColor="Red">
                    </asp:RequiredFieldValidator>

                    <asp:TextBox ID="txtBrands" placeholder="Brand Name" runat="server" CssClass="form-control"></asp:TextBox>
                </div>
            </div>
            <div class="row ">
                <div class="col-md-4">
                    <div class="form-group" style="text-align: left;">
                        <asp:Label ID="lblid" runat="server" Text="0" Visible="false"></asp:Label>
                        <button type="button" class="btn btn-primary" onclick="check()" style="text-align: center;">Save</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" id="btnreset" class="btn btn-warning" onclick="toasterCheck()" style="text-align: center;">Reset</button>
                    </div>
                </div>
            </div>--%>
            <div class="row ">
                <%--<div class="box box-primary">
                <div class="col-md-3  col-md-offset-9 form-group" style="margin-top: 13px;">
                        
                </div>
            </div>--%>
                <table class="table table-bordered table-hover table-dark" id="tblCountry">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Communication code</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="tbCountry">
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
                    <input type="hidden" id="hdnCountryID" value="0" />
                    <label id="lblCountryCode" for="txtCountryCode">Country Code</label>&nbsp;<span class="requiredField">*</span>
                    <input type="text" id="txtCountryCode" value="" class="form-control" placeholder="Country Code" />
                </div>
                <div class="form-group">
                    <label id="lblCountryName" for="txtCountryName">Country Name</label>&nbsp;<span class="requiredField">*</span>
                    <input type="text" id="txtCountryName" value="" class="form-control" placeholder="Country Name" />
                </div>
                <div class="form-group">
                    <label id="lblCountryCommun" for="txtCountryCommun">Communication Code</label>&nbsp;<span class="requiredField">*</span>    
                    <input type="number" id="txtCountryCommun" value="" class="form-control" placeholder="Communication Code" />
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
        var hdnCountryID = $('#hdnCountryID');
        var txtCountryCode = $('#txtCountryCode');
        var txtCountryName = $('#txtCountryName');
        var txtCountryCommun = $('#txtCountryCommun');
        var btnSave = $('#btnSave');
        var myModalLabel = $('#myModalLabel');

        $(document).ready(function () {
            getUrl('../');            
            domainUrl=$('#hdnUrl').val();
            LoadCountries(domainUrl);
        });

        function ClearData() {
            RestData();
            $('#myModal').modal('hide');
        }

        function RestData() {
            hdnCountryID.val(0);
            txtCountryCode.val('');
            txtCountryName.val('');
            txtCountryCommun.val('');
            btnSave.html('Add');
            myModalLabel.html('Add');
        }

        function LoadCountries(domainUrl) {
            var body = $('#tbCountry');
            body.empty();
            $.ajax({

                type: "GET",
                url: domainUrl + 'app/GetCountryDetail/0',
                //data: "[]",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (data) {
                    if (data.isSucess) {
                        var count = 1;
                        $.each(data.responseData, function (index, value) {

                            var tr = '<tr class="d">';
                            tr += '<td scope="row">' + count + '</td>';
                            tr += '<td class="countryCode">' + value.countryCode + '</td>';
                            tr += '<td class="countryName">' + value.countryName + '</td>';
                            tr += '<td class="commCode">' + value.commCode + '</td>';
                            tr += '<td><button class="btn btn-warning btn-xs" id="txtEdit' + count + '" type="button" onclick="EditEntry(' + value.countryId + ',\'txtEdit' + count + '\')"><i class="fa fa-pencil"></i></button>  <button class="btn btn-danger btn-xs" id="txtDelete' + count++ + '" type="button"  onclick="deleteItem(' + value.countryId +')"><i class="fa fa-trash"></i></button></td>';
                            tr += '</tr>';
                            body.append(tr);
                        });
                    }
                }

            });
            $("#tblCountry").DataTable();
        }

        function SaveData() {
            var countryDetail = {};
            countryDetail.CountryId = hdnCountryID.val();
            countryDetail.CountryCode = txtCountryCode.val();
            countryDetail.CountryName = txtCountryName.val();
            countryDetail.CommCode = txtCountryCommun.val();
            countryDetail.ProcessedBy = "01650";
            var CountryId = hdnCountryID.val();
            var CountryCode = txtCountryCode.val().trim();
            var CountryName = txtCountryName.val().trim();
            var CommCode = txtCountryCommun.val().trim();
            var processedBy = '01650';    
            if (CountryCode != '' && CountryName != '') {
                $.ajax({

                    type: "POST",
                    //url: domainUrl + 'app/CreateUpdateCountryDetailPost',
                    url: domainUrl + 'app/CreateUpdateCountryDetailPost?countryid=' + CountryId + '&countrycode=' + CountryCode + '&countryName=' + CountryName + '&commCode=' + CommCode + '&processedBy=' + processedBy,
                    //data: JSON.stringify({"countryid":  hdnCountryID.val() ,"countrycode": txtCountryCode.val() ,"countryName": txtCountryName.val() ,"commCode": txtCountryCommun.val(), "processedBy": processedBy }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        if (data.responseData.success == 1) {
                            setMessage("Success", data.message);
                            ClearData();
                            LoadCountries(domainUrl);
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

        function EditEntry(id, td)
        {
            hdnCountryID.val(id);
            $('#' + td).closest('tr').find('td').each(function () {
                
                if ($(this).attr('class') == "countryName") {
                    txtCountryName.val ($(this).html().trim());
                } else if ($(this).attr('class') == "countryCode") {
                    txtCountryCode.val($(this).html().trim());
                }
                else if ($(this).attr('class') == "commCode") {
                    txtCountryCommun.val($(this).html().trim());
                }
            });
            btnSave.html('Update');
            myModalLabel.html('Update');
            $('#myModal').modal('show');
        }

        function deleteItem(id) {
            if (window.confirm('Are you sure you want to delete country detail?')) {DeleteEntry(id);
            }
        }

        function DeleteEntry(id) {
            $.ajax({

                type: "POST",
                url: domainUrl + 'app/DeleteCountryDetail/'+id,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (data) {
                    if (data.responseData.success == 1) {
                        setMessage("Success", data.message);
                       //toastr.success("Success", data.message, { tapToDismiss: true, "closeButton": true });
                        LoadCountries(domainUrl);
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
