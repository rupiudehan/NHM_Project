<%@ Page Title="" Language="C#" MasterPageFile="~/Official/Site.Master" AutoEventWireup="true" CodeBehind="YearDetail.aspx.cs" Inherits="NHM.Official.YearDetail" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
        <section class="content">
    <div class="box box-primary">
        <div class="box-header">
            <h3 class="box-title"><b>
                <asp:Label ID="HeadingName" runat="server">Manage Holiday Detail</asp:Label></b></h3>
            <button type="button" id="btnCurrentYear" class="btn btn-success pull-right" onclick="SaveCurrentYear()">Add Current Year</button>
        </div>
    </div>
    <div class="box-body">
        <div class="row ">
            <table class="table table-bordered table-hover table-dark" id="tblTable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Year</th>
                        <th>Is Current Year</th>
                    </tr>
                </thead>
                <tbody id="tbBody">
                <tbody>
            </table>
        </div>
    </div>

</section>

    <script>    
    //$.noConflict();
    var domainUrl = "";
    var body = $('#tbBody');
    var table = $("#tblTable");
    var processedBy = sessionStorage.getItem("id");
    var loader = $('.ajax-loader');
    var year = new Date().getFullYear()
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
            url: domainUrl + 'app/GetYears/0',
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
                        var currentYear = value.isCurrentYear == true ? 'Yes' : 'No';
                        var tr = '<tr class="d">';
                        tr += '<td scope="row">' + count + '</td>';
                        tr += '<td>' + value.year + '</td>';
                        tr += '<td>' + currentYear + '</td>';tr += '</tr>';
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

    function SaveCurrentYear() {
        $.ajax({

            type: "POST",
            url: domainUrl + 'app/CreateYearDetail?processedBy=' + processedBy,
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
