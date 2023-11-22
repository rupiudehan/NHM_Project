<%@ Page Title="Manage Employee Detail" Language="C#" MasterPageFile="~/Official/Site.Master" AutoEventWireup="true" CodeBehind="EmployeeManage.aspx.cs" Inherits="NHM.Official.EmployeeManage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <section class="content">
    <div class="box box-primary">
        <div class="box-header">
            <h3 class="box-title"><b>
                <asp:Label ID="HeadingName" runat="server">Manage Employee Detail</asp:Label></b></h3>
        </div>
    </div>
    <div class="box-body">
        <div class="row ">
            <table class="table table-bordered table-hover table-dark" id="tblTable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Employee Name</th>
                        <th>Mobile No.</th>
                        <th>HRMS</th>
                        <th>Designation</th>
                        <th>Office Name</th>                        
                        <th>Is Inactive for Attendance</th>
                        <th>Update Mobile No.</th>
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
                    <h4 class="modal-title" id="myModalLabel">Update Mobile Number</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="form-group">
                            <input type="hidden" id="hdnID" value="0" />
                            <label id="lbleMobile" for="txtMobile">Mobile Number</label>&nbsp;<span class="requiredField">*</span>
                            <input type="number" id="txtMobile" value="" onKeyPress="if(this.value.length==10) return false;" class="form-control" placeholder="Mobile Number" />
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" id="btnSave" class="btn btn-primary" onclick="SaveData()">Update</button>
                    <button type="button" id="btnReset" class="btn btn-warning" onclick="RestData()">Reset</button>
                </div>
            </div>
        </div>
    </div>
</section>

<script>    
    var domainUrl = "";
    var hdnID = $('#hdnID');
    var txtMobile = $('#txtMobile');
    var btnSave = $('#btnSave');
    var myModalLabel = $('#myModalLabel');
    var body = $('#tbBody');
    var table = $("#tblTable");
    var processedBy = sessionStorage.getItem("hrms");
    var loader = $('.ajax-loader');    


    $(document).ready(function () {
        getUrl('../');
        domainUrl = $('#hdnUrl').val();
        LoadData(domainUrl);


    });

    function ClearData(){
        hdnID.val(0);
        RestData();
    }

    function RestData() {
        txtMobile.val('');
        $('#myModal').modal('hide');
    }

    function LoadData(domainUrl) {
        body.empty();
        table.DataTable().clear().destroy();
        $.ajax({

            type: "GET",
            url: domainUrl + 'app/GetEmployeeDetailWithID/0',
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
                        var checked = '';
                        if (value.inactiveForAttendance == true) {
                            checked = 'checked';
                        }
                        var tr = '<tr class="d">';
                        tr += '<td scope="row">' + count + '</td>';
                        tr += '<td>' + value.employeeName + '</td>';
                        tr += '<td class="mobile">' + value.mobileNo + '</td>';
                        tr += '<td>' + value.hrmsNo + '</td>';
                        tr += '<td>' + value.designationName + '</td>';
                        tr += '<td>' + value.officeName + '</td>';
                        tr += '<td style="text-align:center;" class="check"><div class="custom-control switch"><input type = "checkbox" ' + checked + ' class="custom-control-input" id="chkActive' + count + '" onclick="EmployeeActivateDeActivate(' + value.employeeID +')" ></div></td>';
                        tr += '<td style="text-align:center;"><button class="btn btn-primary btn-xs" id="txtEdit' + count + '" type="button"  onclick="EditEntry(' + value.employeeID+ ',\'txtEdit' + count + '\')"><i class="fa fa-pencil"></i></button></td>';
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

    function EditEntry(id,td) {
        hdnID.val(id);
        $('#' + td).closest('tr').find('td').each(function () {

            if ($(this).attr('class') == "mobile") {
                txtMobile.val($(this).html().trim());
            }
        });
        btnSave.html('Update');
        myModalLabel.html('Update');
        $('#myModal').modal('show');
    }

    function SaveData() {
        var employeeid = hdnID.val();
        var mobno = txtMobile.val();
        if (mobno != '' && employeeid!='0') {
            $.ajax({

                type: "POST",
                url: domainUrl + 'app/EmployeeMobUpdation?employeeID=' + employeeid + '&mobno=' + mobno,
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
        } else {
            loader.hide();
            setMessage("Warning", '(*) Marked fields are required');
        }
    }

    function EmployeeActivateDeActivate(employeeid) {
        
            $.ajax({

                type: "POST",
                url: domainUrl + 'app/EmployeeActivateDeactivatePost?employeeID=' + employeeid,
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
                    else if (data.responseData.success == 2) {
                        setMessage("Success", data.message);
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
