<%@ Page Title="Unlock Leave Dates" Language="C#" MasterPageFile="~/Official/Site.Master" AutoEventWireup="true" CodeBehind="UnlockLeaveDates.aspx.cs" Inherits="NHM.Official.UnlockLeaveDates" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
    <div class="box box-primary">
        <div class="box-header">
            <h3 class="box-title"><b>
                <asp:Label ID="HeadingName" runat="server">Unlock Leave Date</asp:Label></b></h3>
        </div>
    </div>
    <div class="box-body">
        <div class="row">
            <div class="col-md-4">
                 <div class="form-group ui-widget ui-front">
                     <input type="hidden" id="hdnEmployeeID" value="0" />
                     <label id="lblEmployee" for="txtEmployee">Employee</label>&nbsp;<span class="requiredField">*</span>
                     <input type="text" id="txtEmployee" value="" class="form-control" onchange="SetValue('Employee')" placeholder="Select Employee" />
                 </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label id="lblFromDate" for="txtFromDate">From Date</label>&nbsp;<span class="requiredField">*</span>
                    <input type="text" id="txtFromDate" value="" class="form-control datepicker" placeholder="From Date" />
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label id="lblTodate" for="txtTodate">To Date</label>&nbsp;<span class="requiredField">*</span>
                    <input type="text" id="txtTodate" value="" class="form-control datepicker" placeholder="To Date" />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12" style="text-align:center"><br />
                <div class="form-group">
                    <button type="button" id="btnSave" class="btn btn-primary" onclick="SaveData()">Add</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" id="btnReset" class="btn btn-warning" onclick="ClearData()">Reset</button>
                </div>
            </div>
        </div>
    </div>
    
</section>

<script>    
    var domainUrl = "";
    var employee = $("#txtEmployee");
    var employeeID = $("#hdnEmployeeID");
    var txtFromDate = $('#txtFromDate');
    var txtTodate = $('#txtTodate');
    var btnSave = $('#btnSave');
    var processedBy = sessionStorage.getItem("id");
    var loader = $('.ajax-loader');


    $(document).ready(function () {
        getUrl('../');
        domainUrl = $('#hdnUrl').val();
        BindAutocomplete(employee, employeeID);
        txtFromDate.datepicker({
            dateFormat: "dd/mm/yy",
            minDate: "-7",
            maxDate: "+0m",
            onSelect: function (date) {
                var dd = date.split("/");
                date=dd[1]+'/'+dd[0]+'/'+dd[2];
                var selectedDate = new Date(date);
                //var msecsInADay = 86400000;
                var endDate = new Date(selectedDate.getTime());
                
                //Set Minimum Date of EndDatePicker After Selected Date of StartDatePicker
                txtTodate.datepicker("option", "minDate", endDate);
                txtTodate.datepicker("option", "maxDate", '+0m');
                txtTodate.datepicker("option", "dateFormat", 'dd/mm/yy');
                //txtTodate.val('');
            }
        });
        txtTodate.datepicker({
            dateFormat: "dd/mm/yy",
            maxDate: "+0m"
        });
    });

    function ClearData() {
        employee.val('');
        employeeID.val('0');
        txtFromDate.val('');
        txtTodate.val('');
    }

    function SetValue(txt) {

        if ($('#txt' + txt).val() == '')
            $('#hdn' + txt + 'ID').val('0')
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
                    url: domainUrl + 'app/GetEmployeeDetailSearch/' + val,
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
                    failure: function (response) {
                        loader.hide();
                        setMessage("Error", response.responseText);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        loader.hide();
                        setMessage("Error", textStatus);
                    }
                });
            },
            minLength: 1   // MINIMUM 1 CHARACTER TO START WITH.
        });
    }

    function SaveData() {

        var ID = employeeID.val();
        var startdate = txtFromDate.val();
        var enddate = txtTodate.val();


        if (startdate != '' && enddate != '' && ID != '0') {

            $.ajax({

                type: "POST",
                url: domainUrl + 'app/UnlockEmployeeLeaveDates?employeeID=' + ID + '&startdate=' + startdate + '&enddate=' + enddate + '&processedBy=' + processedBy,
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
