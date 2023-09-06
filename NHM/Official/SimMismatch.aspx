<%@ Page Title="Sim Mismatch" Language="C#" MasterPageFile="~/Official/Site.Master" AutoEventWireup="true" CodeBehind="SimMismatch.aspx.cs" Inherits="NHM.Official.SimMismatch" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
    <div class="box box-primary">
        <div class="box-header">
            <h3 class="box-title"><b>
                <asp:Label ID="HeadingName" runat="server">Delete Employee SimID To Re-Register</asp:Label></b></h3>
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
                        <th>Delete SimID</th>
                    </tr>
                </thead>
                <tbody id="tbBody">
                <tbody>
            </table>
        </div>
    </div>

</section>

<script>    
    var domainUrl = "";
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

    function LoadData(domainUrl) {
        body.empty();
        table.DataTable().clear().destroy();
        $.ajax({

            type: "GET",
            url: domainUrl + 'app/GetEmployeeDetailForSimMismatch/false',
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
                        tr += '<td>' + value.employeeName + '</td>';
                        tr += '<td>' + value.mobileNo + '</td>';
                        tr += '<td>' + value.hrmsNo + '</td>';
                        tr += '<td>' + value.designationName + '</td>';
                        tr += '<td class="office">' + value.officeName + '</td>';
                        tr += '<td style="text-align:center;"><button class="btn btn-danger btn-xs" id="txtDelete' + count + '" type="button"  onclick="deleteItem(' + value.employeeID + ')"><i class="fa fa-trash"></i></button></td>';
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

    function deleteItem(id) {
        if (window.confirm('Are you sure you want to delete employee simid?')) {
            DeleteEntry(id);
        }
    }

    function DeleteEntry(id) {
        $.ajax({

            type: "POST",
            url: domainUrl + 'app/EmployeeSimDetailDeletePost?employeeID=' + id + '&processedBy=' + processedBy,
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
