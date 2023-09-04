<%@ Page Title="Assign Authority" Language="C#" MasterPageFile="~/Official/Site.Master" AutoEventWireup="true" CodeBehind="AssignAuthority.aspx.cs" Inherits="NHM.Official.AssignAuthority" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
        <div class="box box-primary">
            <div class="box-header">
                <h3 class="box-title"><b>
                    <asp:Label ID="HeadingName" runat="server">Manage Reporting Authority Assignment Detail</asp:Label></b></h3>
                <button type="button" id="btnManage" class="btn btn-success pull-right" onclick="ClearData()" data-toggle="modal" data-target="#myModal">Add</button>
            </div>
        </div>
        <div class="box-body">
            <div class="row ">
                <table class="table table-bordered table-hover table-dark" id="tblCountry">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Authority</th>
                            <th>Employee</th>
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
                <div class="form-group ui-widget ui-front">
                    <input type="hidden" id="hdnID" value="0" />
                    <input type="hidden" id="hdnAuthorityID" value="0" />
                    <label id="lblAuthority" for="txtAuthority">Authority</label>&nbsp;<span class="requiredField">*</span>
                    <input type="text" id="txtAuthority" value="" class="form-control" onchange="SetValue('Authority')" placeholder="Select Authority" />
                </div>
                <div class="form-group ui-widget ui-front">
                    <input type="hidden" id="hdnEmployeeID" value="0" />
                    <label id="lblEmployee" for="txtEmployee">Employee</label>&nbsp;<span class="requiredField">*</span>
                    <input type="text" id="txtEmployee" value="" class="form-control" onchange="SetValue('Employee')" placeholder="Select Employee" />
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
        var domainUrl = "";
        var hdnID = $('#hdnID');
        var authority = $("#txtAuthority");
        var employee = $("#txtEmployee");
        var authorityID = $("#hdnAuthorityID");
        var employeeID = $("#hdnEmployeeID");
        var loader = $('.ajax-loader');
        var btnSave = $('#btnSave');
        var myModalLabel = $('#myModalLabel');
        var body = $('#tbCountry');
        var table = $("#tblCountry");
        var processedBy = sessionStorage.getItem("hrms");

        $(document).ready(function () {
            getUrl('../');
            domainUrl = $('#hdnUrl').val();
            BindAutocomplete(authority, authorityID);
            BindAutocomplete(employee, employeeID);
            LoadData(domainUrl);
        });
        function SetValue(txt) {
           
            if ($('#txt' + txt).val() == '')
                $('#hdn' + txt+'ID').val('0')
        }
        function ClearData() {
            
            RestData();
            $('#myModal').modal('hide');
        }
        function RestData() {
            authority.val('');
            employee.val('');
            authorityID.val('0');
            employeeID.val('0');
            hdnID.val('0');
            btnSave.html('Add');
            myModalLabel.html('Add');
        }

        function BindAutocomplete(control, controlID) {
            control.autocomplete({                
                select: function (event, ui) {
                    control.val(ui.item.label);
                    controlID.val(ui.item.val);
                    //alert(ui.item.value);
                    return false;
                },
                source: function (request, response) {

                    var val = request.term;
                    controlID.val(0);
                    $.ajax({
                        url: domainUrl + 'app/GetEmployeeDetailSearch/'+val,
                        type: "GET",
                        async: false,
                        beforeSend: function () {
                            loader.show();
                        },
                        complete: function () {

                            loader.hide();
                        },
                        success: function (data) {                            
                            response($.map(data.responseData, function (item) {
                                var values = item.employeeName.split('/');
                                return { label: values[0] + " (" + item.hrmsNo + ")", val: values[1] }
                            }))
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            setMessage("Error", textStatus);
                        }
                    });
                },
                minLength: 1   // MINIMUM 1 CHARACTER TO START WITH.
            });
        }

        function LoadData(domainUrl) {
            body.empty();
            table.DataTable().clear().destroy();
            $.ajax({

                type: "GET",
                url: domainUrl + 'app/GetReportingAuthorityDetai/0/0',
                //data: "[]",
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
                            tr += '<td class="authorityName">' + value.authorityName + " (" + value.authorityHrms +")" + '</td>';
                            tr += '<td class="employeeName">' + value.employeeName + " (" + value.employeeHrms + ")" + '</td>';
                            tr += '<td><button class="btn btn-warning btn-xs" id="txtEdit' + count + '" type="button" onclick="EditEntry(' + value.id + ',\'txtEdit' + count + '\',' + value.authorityID + ',' + value.employeeID + ')"><i class="fa fa-pencil"></i></button>  <button class="btn btn-danger btn-xs" id="txtDelete' + count++ + '" type="button"  onclick="deleteItem(' + value.id + ')"><i class="fa fa-trash"></i></button></td>';
                            tr += '</tr>';
                            body.append(tr);
                        });
                    }
                },
                failure: function (response) {
                    setMessage("Error", response.responseText);
                },
                error: function (response) {
                    setMessage("Error", response.responseText);
                }

            });
            table.DataTable();
        }

        function SaveData() {
            var reportingauthorityid = authorityID.val();
            var assigningemployeeid = employeeID.val();
            var id = hdnID.val();

            if (reportingauthorityid != '' && assigningemployeeid != '') {
                
                    $.ajax({

                        type: "POST",
                        url: domainUrl + 'app/EmployeeReportingAuthorityPost?id=' + id +'&employeeID=' + assigningemployeeid + '&authorityID=' + reportingauthorityid + '&processedBy=' + processedBy,
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        beforeSend: function () {
                            loader.show();
                            btnSave.prop('disabled', false).css('cursor', 'not-allowed');
                        },
                        complete: function () {

                            loader.hide();
                            btnSave.prop('disabled', false).removeAttr('style');
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

        function EditEntry(id, td,authorityd,employeed) {
            hdnID.val(id);
            $('#' + td).closest('tr').find('td').each(function () {

                if ($(this).attr('class') == "authorityName") {
                    authority.val($(this).html().trim());
                    authorityID.val(authorityd);
                } else if ($(this).attr('class') == "employeeName") {
                    employee.val($(this).html().trim());
                    employeeID.val(employeed);
                }
                
            });
            btnSave.html('Update');
            myModalLabel.html('Update');
            $('#myModal').modal('show');
        }

        function deleteItem(id) {
            if (window.confirm('Are you sure you want to delete record?')) {
                DeleteEntry(id);
            }
        }

        function DeleteEntry(id) {
            $.ajax({

                type: "POST",
                url: domainUrl + 'app/DeleteEmployeeReportingAuthority/' + id,
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
                        //toastr.success("Success", data.message, { tapToDismiss: true, "closeButton": true });
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
    </script>
</asp:Content>
