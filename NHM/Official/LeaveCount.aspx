<%@ Page Title="Leave Count" Language="C#" MasterPageFile="~/Official/Site.Master" AutoEventWireup="true" CodeBehind="LeaveCount.aspx.cs" Inherits="NHM.Official.LeaveCount" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <section class="content">
     <div class="box box-primary">
         <div class="box-header">
             <h3 class="box-title"><b>
                 <asp:Label ID="HeadingName" runat="server">Manage Total Leaves</asp:Label></b></h3>
             <%--<button type="button" id="btnManage" class="btn btn-success pull-right" onclick="ClearData()" data-toggle="modal" data-target="#myModal">Add</button>--%>
         </div>
     </div>
     <div class="box-body">
         <div class="row ">
             <table class="table table-bordered table-hover table-dark" id="tblCountry">
                 <thead>
                     <tr>
                         <th>#</th>
                         <th>Employee</th>
                         <th>Type</th>
                         <th>Count</th>
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
                <label id="lblTypeId" for="ddlType">Leave Type</label>&nbsp;<span class="requiredField">*</span>
                <select id="ddlType" class="form-control"><option value="0" >--Select--</option></select>  
            </div>
             <div class="form-group ui-widget ui-front">
                    <input type="hidden" id="hdnID" value="0" />
                 <input type="hidden" id="hdnEmployeeID" value="0" />
                 <label id="lblEmployee" for="txtEmployee">Employee</label>&nbsp;<span class="requiredField">*</span>
                 <input type="text" id="txtEmployee" value="" class="form-control" onchange="SetValue('Employee')" placeholder="Select Employee" />
             </div>
            <div class="form-group">
                <label id="lblTotalCount" for="txtTotalCount">Total Count</label>&nbsp;<span class="requiredField">*</span>    
                <input type="number" id="txtTotalCount" value="" class="form-control" placeholder="Total Count" />
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
     var ddlType = $('#ddlType');
     var employee = $("#txtEmployee");
     var employeeID = $("#hdnEmployeeID");
     var txtTotalCount = $('#txtTotalCount');
     var loader = $('.ajax-loader');
     var btnSave = $('#btnSave');
     var myModalLabel = $('#myModalLabel');
     var body = $('#tbCountry');
     var table = $("#tblCountry");
     var processedBy = sessionStorage.getItem("hrms");

     $(document).ready(function () {
         getUrl('../');
         domainUrl = $('#hdnUrl').val();
         BindAutocomplete(employee, employeeID);
         LoadLeaveTypes(domainUrl);         
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
         ddlType.val(0);
         txtTotalCount.val('');
         employee.val('');
         employeeID.val('0');
         hdnID.val('0');
         btnSave.html('Add');
         myModalLabel.html('Add');
         ddlType.prop('disabled', false);
         employee.prop('disabled', false);
     }

     function LoadLeaveTypes(domainUrl) {
         ddlType.empty();
         ddlType.append($("<option></option>").val(0).html('--Select--'));
         $.ajax({

             type: "GET",
             url: domainUrl + 'app/GetLeavetypes/0',
             contentType: "application/json; charset=utf-8",
             dataType: "json",
             async: false,
             success: function (data) {
                 if (data.isSucess) {
                     $.each(data.responseData, function (index, value) {
                         ddlType.append($("<option></option>").val(value.leaveTypeID).html(value.leaveTypeName));
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
             url: domainUrl + 'app/GetEmployeeLeaveTypeMasterDetail/0/0',
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
                         tr += '<td class="employeeName">' + value.employeeName + " (" + value.hrmsNo + ")" + '</td>';
                         tr += '<td class="leavetype">' + value.leaveName + '</td>';
                         tr += '<td class="leavecount">' + value.leaveCount + '</td>';
                         tr += '<td><button class="btn btn-warning btn-xs" id="txtEdit' + count + '" type="button" onclick="EditEntry(' + value.leaveID + ',\'txtEdit' + count + '\',' + value.employeeID + ',' + value.leaveTypeID + ')"><i class="fa fa-pencil"></i></button> </td>';// <button class="btn btn-danger btn-xs" id="txtDelete' + count++ + '" type="button"  onclick="deleteItem(' + value.id + ')"><i class="fa fa-trash"></i></button></td>';
                         tr += '</tr>';
                         body.append(tr);
                         count++;
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
         var typeid = ddlType.val();
         var assigningemployeeid = employeeID.val();
         var leaveCount = txtTotalCount.val();
         var id = hdnID.val();
         
         if (assigningemployeeid != '' && leaveCount != '' && typeid!='') {
             
                 $.ajax({

                     type: "POST",
                     url: domainUrl + 'app/EmployeeLeaveTypeMasterPost?leaveID=' + id + '&employeeID=' + assigningemployeeid + '&leaveTypeID=' + typeid + '&leaveCount=' + txtTotalCount.val() + '&processedBy=' + processedBy,
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

     function EditEntry(id, td, employeed, typeid) {
         hdnID.val(id);
         ddlType.val(typeid);
         ddlType.prop('disabled', true);
         employee.prop('disabled', true);
         $('#' + td).closest('tr').find('td').each(function () {

             if ($(this).attr('class') == "leavecount") {
                 txtTotalCount.val($(this).html().trim());
             } else if ($(this).attr('class') == "employeeName") {
                 employee.val($(this).html().trim());
                 employeeID.val(employeed);
             }
             
         });
         btnSave.html('Update');
         myModalLabel.html('Update');
         $('#myModal').modal('show');
     }

     //function deleteItem(id) {
     //    if (window.confirm('Are you sure you want to delete record?')) {
     //        DeleteEntry(id);
     //    }
     //}

     //function DeleteEntry(id) {
     //    $.ajax({

     //        type: "POST",
     //        url: domainUrl + 'app/DeleteEmployeeReportingAuthority/' + id,
     //        contentType: "application/json; charset=utf-8",
     //        dataType: "json",
     //        async: false,
     //        beforeSend: function () {
     //            loader.show();
     //        },
     //        complete: function () {

     //            loader.hide();
     //        },
     //        success: function (data) {
     //            if (data.responseData.success == 1) {
     //                setMessage("Success", data.message);
     //                //toastr.success("Success", data.message, { tapToDismiss: true, "closeButton": true });
     //                LoadData(domainUrl);
     //            }
     //            else if (data.responseData.success == 0) {
     //                setMessage("Error", data.message);
     //            }
     //        },
     //        failure: function (response) {
     //            setMessage("Error", response.responseText);
     //        },
     //        error: function (response) {
     //            setMessage("Error", response.responseText);
     //        }
     //    });
     //}
 </script>
</asp:Content>
