$(document).ready(function () {

$('#loading').ajaxStart(function () {
        $.showprogress();
    });
    $('#loading').ajaxStop(function () {
        $.hideprogress();
    });
    var EmpId = GetQueryStringParams('EmpId');
     BindQualification();
    BindUniversity();
    BindPostCollege();
    BindPreferDist();
    BindServDescription();
    $("#ddlServicePosting").chosen();
    $("#ddlGender").chosen();
    $("#ddlMartial").chosen();
    $("#ddlAdministrativeExp").chosen();

    $("#chkServicemen").chosen();
    $("#ddlServiceType").chosen();
    $("#ddlTransferCategory").chosen();
   if(EmpId > 0)
   {
   Edit(EmpId);
   }else
   {
    district();
    BindState(1,0);
    BindDesignation(0);
    BindCategory(0);
    BindSubject(0);
    BindDepartment(0);
    BindServDesignation(0);
    BindModeofRecuitment(0);
    BindPayScale(0);
   
    
   }

    var user = $('#hdnfield').val();
    $('.datepicker').datepicker({ dateFormat: 'dd/mm/yy',showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true });

  
  $('#SaveEmpDetail').click(function () {
  var count = 0;
        $(".required").each(function () {
            if ($(this).val() == "" || $(this).val() == "0") {
                var CHeckValues = $(this).attr('alt');
                if (typeof CHeckValues != 'undefined') {
                 //$("#" + $(this).attr('alt')).css({ "background-image": "url('validNo.png')" });                 
                    $(this).addClass('error');
                    count = 1;
                }
            }
        });
        if (count == 1) {

            return false;
        }
  Insert();
  });

 $("#ddlState").change(function () {
  BindDistrict( $("[id$=ddlState]").val(),0);
  });
 $("#ddlPreferDist").change(function () {
  fillCity2($(this).attr('id'),0);
 });
  
  GetAchivement("ddlAchivements");
    $('#btnQReset').click(function () {
        $('#MainEmpQlTable tr:gt(0)').each(function () {
            $(this).find('td input').each(function () {
                $(this).val('');
            });
        });
    });
     $('#Reset').click(function () {
        $('#tblEmployee tr:gt(0)').each(function () {
            $(this).find('td input').each(function () {
                $(this).val('');
            });
        });
    });
    $('#btnSTReset').click(function () {
        $('#tbllistServiceRecord tr:gt(0)').each(function () {
            $(this).find('td input').each(function () {
                $(this).val('');
            });
        });
    });
     $('#btnSrReset').click(function () {
        $('#tblServiceTable tr:gt(0)').each(function () {
            $(this).find('td input').each(function () {
                $(this).val('');
            });
        });
    });
   

    //////////////Achivement Detail/////
    $("#aNewAchivement").click(function(){
    var options='';
   var r = ($('#mainAchivement tr').length);
    $.getJSON('Handler/LoadCities.ashx?functionKey=70',{})
    .done(function(achivement){
    $.each(achivement,function(){
     options += "<option value='" + this["AchivementId"] + "'>" + this["Name"].toString() + "</options>";
       });
       $("#mainAchivement tbody").append("<tr><td><label id='PreferredOrder1' >" + r + ".</label></td><td><select class='input-medium' id='ddlAchivements"+r+"' msg='Achievements'>" + options + "</select></td><td><input  type='text' class='input-small focused' id='txtDescription" + r + "' msg='AchievementDescription'/></td><td><a href=javascript:void(0)  id='btnDelete' onclick='DeleteAchievement(this);'  class='btn btn-danger'>Delete</a></td></tr>");
        $('#mainAchivement tr:last td select').each(function () {
       $(this).trigger("liszt:updated");
                    $(this).chosen();

                });
               //  $("#ddlAchivements2").chosen();
    })
    .fail(function(){
    });
    });


    //////////////////////////////////////////////////////////////

 


 function AllClearTextBox() {

        $('#txtSeniority').val('');
        $('#txtFristName').val('');
        $('#txtMediumName').val('');
        $('#txtLastname').val('');
        $('#txtFatherName').val('');
        $('#txtBasicSalary').val('');
        $('#txtMotherName').val('');
        $('#txtDOB').val('');
        $('#txtSuperAn').val('');
        $('#txtAddress').val('');
        $('#txtPhone').val('');
        $('#txtMobileNo').val('');
        $('#txtEmailID').val('');
        $('#txtGPFNo').val('');
        $('#txtDOJ').val('');
         $('#txtECRNo').val('');
          $('#txtAccNo').val('');
          $('#txtExpireDate').val('');
         $('#txtDescriptionEXP').val('');
          $('#txtExpName').val('');
$('#hdnEmpCode').val(0);

    }

function Insert() {
  var countexp=0;
  var EmpId= $('#hdnEmpCode').val();

 var EmpCode= $('#txtEMpID').val();
 var FristName= $('#txtFristName').val();
var Seniority=$('#txtSeniority').val();
 var MediumName= $('#txtMediumName').val(); 
 var Lastname=  $('#txtLastname').val();
 var Designation= $('#ddlDesignation').val();
 var FatherName= $('#txtFatherName').val();
 var MotherName= $('#txtMotherName').val();
 var BasicSalary= $('#txtBasicSalary').val();   
 var DateofSuperAn= $('#txtSuperAn').val();
  DateofSuperAn = DateofSuperAn.split('/');
 DateofSuperAn = DateofSuperAn[1] + '/' + DateofSuperAn[0] + '/' + DateofSuperAn[2];
 var DOB= $('#txtDOB').val();
 DOB = DOB.split('/');
 DOB = DOB[1] + '/' + DOB[0] + '/' + DOB[2];
 var Address= $('#txtAddress').val();
 var State= $('#ddlState').val();
 var District= $('#ddlDistrict').val();
 var PostCode= $('#txtPostCode').val(); 
 var Phone= $('#txtPhone').val();
 var MobileNo= $('#txtMobileNo').val(); 
 var EmailID= $('#txtEmailID').val();
 var NameofCollage= $('#ddlNameofCollage').val(); 
 var Gender= $('#ddlGender').val();
 var PayScale= $('#ddlFunctionalGrade').val();
 var Category= $('#ddlCategory').val(); 
 var ECRNO= $('#txtECRNo').val() ;
 var AccNo= $('#txtAccNo').val(); 
 var Servicemen= $('#chkServicemen').val();
 var Martial= $('#ddlMartial').val();
 var GPFNo= $('#txtGPFNo').val();
var AadharCard = $('#txtaadharcard').val();
 
 var Nominee = $('#txtnominee').val();

 var BankName = $('#txtbankname').val();

 var IFSCCode = $('#txtifsccode').val();
 
 var IsActive= $('#IsActive').val();
 var handicap=0;
 var ExQratiachk=0;
 var expirydate='01/01/1900';
 var description='';
 var name='';
 if($('#chkIshandicap').prop('checked'))
 {
 handicap=1;
 }
 if($('#ExQratia').prop('checked'))
 {
 ExQratiachk=1;
 expirydate=$('#txtExpireDate').val();
 description=$('#txtDescriptionEXP').val();
 name=$('#txtExpName').val();
 if(expirydate=='')
 {
 $('#txtExpireDate').addClass('error');
 countexp=1;
 }
 if (AadharCard == '') {
     $('#txtaadharcard').addClass('error');
     countexp = 1;
 }
 if(description=='')
 {
  $('#txtDescriptionEXP').addClass('error');
 countexp=1;
 }
 if(name=='')
 {
 $('#txtExpName').addClass('error');
 countexp=1;
 }
 if(countexp==1)
 {
 return;
 }
 expirydate=expirydate.split('/');
 expirydate=expirydate[1]+'/'+expirydate[0]+'/'+expirydate[2];
 
 }
 var DOJ=$('#txtDOJ').val(); 
 DOJ = DOJ.split('/');
 DOJ = DOJ[1] + '/' + DOJ[0] + '/' + DOJ[2];
 var TransferCategory= $('#ddlTransferCategory').val(); 
 var Achievement= $('#txtAchievement').val();
 var AdministrativeExp= $('#ddlAdministrativeExp').val();
 var OrgDetail= $('#txtOrgDetail').val();
 var Photo= $('#fileInput').val();

 var PostalCode =  0;   //$('#txtPostCode').val(); 

    var UserId = $('#userid').val();
    var ADT_PageSerialCode = EmpId;
    var Active = 0;

    if ($("#IsActive").is(':checked'))
        Active = 1;
if(Seniority=='')
Seniority='0';

    $.ajax({
        type: 'Post',
        url: 'Service/CommonService.asmx/Insert',
        data: JSON.stringify({EmpId:EmpId, Seniority:Seniority, FristName:FristName, MediumName:MediumName, Lastname:Lastname, Designation:Designation, 
        FatherName:FatherName, MotherName:MotherName, ECRNO:ECRNO, AccNo:AccNo, BasicSalary:BasicSalary, DateofSuperAn:DateofSuperAn,DOB:DOB,Address:Address, 
         District:District, Phone:Phone, MobileNo:MobileNo,EmailID: EmailID, Gender:Gender, NameofCollage:NameofCollage,
        PayScale: PayScale, Category:Category, Servicemen:Servicemen, Martial:Martial,GPFNo:GPFNo, DOJ:DOJ,  Active:Active, TransferCategory:TransferCategory, 
        Achievement:Achievement,AdministrativeExp:AdministrativeExp, OrgDetail:OrgDetail, Photo:Photo, PostalCode:PostalCode,handicap:handicap,ExQratiachk:ExQratiachk,expirydate:expirydate,description:description,name:name, AadharCard: AadharCard, Nominee: Nominee, BankName: BankName, IFSCCode: IFSCCode}),
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        success: function (result) {
            var strData = result.d;
         
            if (strData >= '1') {
           
                  $('#hdnEmpCode').val(strData);
                        if ($('#fileInput').val() != "") {
                            ajaxFileUpload('fileInput', 'emp_' + strData);
                        }
                         alert("Record Saved Sucessfully");
                //BindTable();
               AllClearTextBox();
            }

        }
    });
}
function ajaxFileUpload(obj, formno) {
    var val = formno;

    $.ajaxFileUpload({
        url: 'Service/JQry.asmx/Upload',
        secureuri: false,
        fileElementId: obj,
        dataType: 'json',
        data: val,
        async: false,
        success: function (data, status) {

            if (typeof (data.error) != 'undefined') {
                if (data.error != '') {
                    alert(data.error);
                } else {
                    alert(data.msg);
                }
            }
        },
        error: function (data, status, e) {
            alert(e);
        }
    })
    return false;
}
  
//    /////////////////////////////////////////Add New Row Function

    $('#btnAddEmpQl').click(function () {

        var r = ($('#MainEmpQlTable1 tr').length);
        // $("#ddlCity1").unchosen();
        var ddlData = '';
        var ddlUniversity = '';
        //ddlUniversity = "<option value='0'>Select...</option>";
        //ddlData = "<option value='0'>Select...</option>";
        $.getJSON('Handler/LoadCities.ashx?functionKey=15', function (country) {
            $.each(country, function () {
                ddlData = ddlData + "<option value='" + this['CourseID'] + "'>" + this['Name'] + "</option>";
            });
            $.getJSON('Handler/LoadCities.ashx?functionKey=16', function (country) {
                $.each(country, function () {
                    ddlUniversity = ddlUniversity + "<option value='" + this['UniversityId'] + "'>" + this['UniveristyName'] + "</option>";
                });
                $('#MainEmpQlTable1').append("<tr id='FirstRow'><td><label id='PreferredOrder1' >" + r + ".</label> </td> <td class=controls><select id='ddlDegreeQualification" + r + "' msg='Qualification' class='input-medium'>" + ddlData + "</select></td><td class='controls'><select id='ddlQlfUniversity" + r + "' msg='University' class='input-medium'>" + ddlUniversity + "</select></td><td class='controls'><input id='txtRerMarks" + r + "' type='text' class='input-small focused'/></td><td class='controls'><input id='txtEmpQlSubjects" + r + "' type='text' class='input-small focused'/></td><td class='controls'><input id='txtYearofpassing" + r + "' type='text' class='input-small focused'/></td><td><a href=javascript:void(0)  id='btnDelete' onclick='DeleteQlification(this);'  class='btn btn-danger'>Delete</a></td></tr>");
                $('#MainEmpQlTable1 tr:last td select').each(function () {
                $('#MainEmpQlTable1 tr:last').find("#ddlDegreeQualification" + r).chosen();
               $('#MainEmpQlTable1 tr:last').find("#ddlQlfUniversity" + r).chosen();
                   // $(this).chosen();
                    // $(this).chosen();
                });
            });

        });

    });


     $('#CloseServicetrainig').click(function(){
     $('#tbllistServiceRecord').html('');
            $.unblockUI();
    });
//    /////////////////////////////////////////Add New Row Function
//   
    $('#BtnServiceAdd').click(function () {

        var r = ($('#tblServiceTable tr').length);
        // $("#ddlCity1").unchosen();
        var ddlData = '';
   
        $.getJSON('Handler/LoadCities.ashx?functionKey=17', function (country) {
            $.each(country, function () {
                ddlData = ddlData + "<option value='" + this['TrainingID'] + "'>" + this['TrainingDescription'] + "</option>";
            });
            $('#tblServiceTable').append("<tr id='FirstRow'><td class=controls><select id='ddlServiceDescription" + r + "' msg='Service Description' class='input-medium'>" + ddlData + "</select></td><td class='controls'><input id='txtDateFromService" + (r + 1) + "' type='text' class='input-small datepicker' onblur='check_date(this)'/></td><td class='controls'><input id='txtDateToService" + r + "' type='text' class='input-small datepicker' onblur='check_date(this)'/></td><td class='controls'><input id='txtEmpQlSubjects" + (r + 1) + "' type='text' class='input-small focused'/></td><td class='controls'><input id='txtRemarksService" + (r + 1) + "' type='text' class='input-small focused'/></td><td><a href=javascript:void(0)  id='btnDelete' onclick='DeleteServiceDetail(this);'  class='btn btn-danger'>Delete</a></td></tr>");
            $('#tblServiceTable tr:last td select').each(function () {
                //$("#tblServiceTable").chosen();
                 $(this).chosen();
            });
           $('.datepicker').datepicker({ dateFormat: 'dd/mm/yy',showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true });
        });


    });


//    /////////////////////////////////////////Add New Row Function

    $('#btnlistServiceRecordAdd').click(function () {

        var r = ($('#tbllistServiceRecord tr').length);
        var html = "";
        // $("#ddlCity1").unchosen();
        var ddlData = '';
        var ddlUniversty = '';
        //ddlData = "<option value='0'>Select...</option>";
        $.getJSON('Handler/LoadCities.ashx?functionKey=18', function (country) {
            $.each(country, function () {
                ddlData = ddlData + "<option value='" + this['DesignationId'] + "'>" + this['Designation'] + "</option>";
            });
            $.getJSON('Handler/LoadCities.ashx?functionKey=19', function (country) {
            ddlUniversty = ddlUniversty +"<option value='10001'>Other</option>";
                $.each(country, function () {
                    ddlUniversty = ddlUniversty + "<option value='" + this['collegeid'] + "'>" + this['CollegeName'] + "</option>";
                });
                $('#tbllistServiceRecord').append("<tr id='FirstRow'><td class='controls'><select id='ddlServiceDesignation" + r + "' msg='Description' class='input-medium'>" + ddlData + "</select></td><td class='controls'><select  id='ddlServicePosting" + r + "' msg='Service Posting'><option value='0'>Select</option><option value='1'>Adoc</option><option value='2'>Regular</option><option value='3'>Deputational</option></select></td><td class='controls'><input type='text' class='input-small datepicker' id='txtPeriodFrom" + r + "' value='' /></td><td class='controls'><input type='text' class='input-small datepicker'  id='txtPeriodTo" + r + "' value='' /></td><td class='controls' id='r1"+r+"'><select id='PostingCollage" + r + "' msg='Posting College' class='input-medium' onchange='ShowCollege(this);'>" + ddlUniversty + "</select><input id='txtCollegeName"+r+"' class='input-medium' style='display:none;  margin-top:7px;'/></td><td class='controls'><select id='ddlServiceType" + r + "'  class='input-small'><option value='Rural'>Rural</option> <option value='Urban'>Urban</option></select></td><td><a href='javascript:void(0)' title='' id='A1' class='btn btn-danger' onclick='DeleteService(this)'>Delete</a></td></tr>");

               // $('#tbllistServiceRecord').append("<tr id='FirstRow'><td class='controls'><select id='ddlServiceDesignation" + r + "' msg='Description' class='input-medium'>" + ddlData + "</select></td><td class='controls'><select  id='ddlServicePosting" + r + "' msg='Service Posting'><option value='0'>Select</option><option value='1'>Adoc</option><option value='2'>Regular</option><option value='3'>Deputational</option></select></td><td class='controls'><input type='text' class='input-small datepicker' onblur='check_date(this)' id='txtPeriodFrom" + r + "' value='' /></td><td class='controls'><input type='text' class='input-small datepicker' onblur='check_date(this)' id='txtPeriodTo" + r + "' value='' /></td><td class='controls'><select id='PostingCollage" + r + "' msg='Posting College' class='input-medium'>" + ddlUniversty + "</select></td><td class='controls'><select id='ddlServiceType" + r + "'  class='input-small'><option value='Rural'>Rural</option> <option value='Urban'>Urban</option></select></td><td><a href='javascript:void(0)' title='' id='A1' class='btn btn-danger' onclick='DeleteService(this)'>Delete</a></td></tr>");

                $('#tbllistServiceRecord tr').each(function () {
                  $('#tbllistServiceRecord tr:last td select').each(function () {
                  //  $(this).find('td select').each(function () {

                        $(this).chosen();
                      // $('#ddlServiceDesignation').chosen();
                       //$('#ddlServicePosting').chosen();
                    });
                });
               $('.datepicker').datepicker({ dateFormat: 'dd/mm/yy',showButtonPanel: true,
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true });
            });

        });

    });

    $('#inputSearch').keyup(function () {
        if ($(this).val() != "") {
            //alert($(this).val());
            $("#EmployeeDatel tbody>tr:gt(0)").hide();
            $('#EmployeeDatel tr:gt(0) td:eq(1)').each(function () { });
            $(this + ":contains-ci('" + $(this).val() + "')").parent("tr").show();
        }
        else {
            $("#EmployeeDatel tbody>tr").show();
        }
    });
    $.extend($.expr[":"],
     {
         "contains-ci": function (elem, i, match, array) {
             return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
         }
     });


    ////////////////////////////////////////////////////////////
});

function BindDistrict(obj,obj1) {
    var State = obj;
    $.ajax({
        type: 'Post',
        url: "Service/CommonService.asmx/GetDistrict",
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        data: JSON.stringify({ State: State }),
        success: function (result) {
            $('#ddlDistrict').find('option').remove();
              
            var strData = eval('(' + result.d + ')');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("#ddlDistrict").append($("<option></option>").val(strData[i].ID).html(strData[i].DistrictName));                
            }
            $("[id$=ddlDistrict]").val(obj1);
            $('#ddlDistrict').chosen();
            $('#ddlDistrict').trigger("liszt:updated");
        }
    });
}

 function BindState(obj,obj1) {
    $.ajax({
        type: 'Post',
        url: "Service/CommonService.asmx/GetState",
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        success: function (result) {
            $('#ddlState').find('option').remove();
            var strData = eval('(' + result.d + ')');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("#ddlState").append($("<option></option>").val(strData[i].StateId).html(strData[i].Name));
            }
           
          $("[id$=ddlState]").val(obj);
          $('[id$=ddlState]').chosen();
          $('[id$=ddlState]').trigger("liszt:updated");
          BindDistrict(obj,obj1);
          
        }
    });
}

function GetQueryStringParams(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function SendVerifyNotification(obj) {
    $.blockUI({ message: $('#myModal') });
   $('#hdnEmpCode').val(obj);
 

}


function EditCaste(obj) {
    $.blockUI({ message: $('#DivCaste') });
   $('#hdnCasteID').val(obj);
 

}


function EditService(obj) {
    $.blockUI({ message: $('#divServiceRecord') });
    GetEmployeeViceRecord(obj);
   $('#hdnEmpcodeService').val(obj); 

}

function GetAchivement(ddlId)
{
  var options='';
  $.getJSON('Handler/LoadCities.ashx?functionKey=70',{})
  .done(function (achivements) {
   $.each(achivements,function(){
      options += "<option value='" + this["AchivementId"] + "'>" + this["Name"].toString() + "</options>";
   });
    $("#" + ddlId).append(options);
    $("#" + ddlId).chosen();
   })
   .fail(function(){
   });
}

function GetAchivementxyz(ddlId, xyz) {
    var options = '';
    $.getJSON('Handler/LoadCities.ashx?functionKey=70', {})
    .done(function (achivements) {
        $.each(achivements, function () {
            var aid = this["AchivementId"];
            if (xyz == aid) {
                options += "<option value='" + this["AchivementId"] + "' selected='selected'>" + this["Name"].toString() + "</options>";
            }
            else {
                options += "<option value='" + this["AchivementId"] + "'>" + this["Name"].toString() + "</options>";
            }
        });
        $("#" + ddlId).append(options);
        $("#" + ddlId).val(xyz);
        $("#" + ddlId).find('select').chosen();
    })
    .fail(function () {
    });
}

 function BindDesignation(obj) {
    $.ajax({
        type: 'Post',
        url: "Service/CommonService.asmx/GetDesignation",
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        success: function (result) {
            $('#ddlDesignation').find('option').remove();
            $('#ddlServiceDesignation').find('option').remove();
            var strData = eval('(' + result.d + ')');
              $('#ddlServiceDesignation').append('<option value="0">Select Designation</option>');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("#ddlDesignation").append($("<option></option>").val(strData[i].DesignationId).html(strData[i].Designation));
                $("#ddlServiceDesignation").append($("<option></option>").val(strData[i].DesignationId).html(strData[i].Designation));
            }
            $('#ddlDesignation').val(obj);
            $('#ddlDesignation').chosen();
            $('#ddlServiceDesignation').val(obj);
              $('#ddlServiceDesignation').chosen();

        }
    });
}

function BindPreferDist() {
      $.ajax({
        type: 'Post',
        url: "Service/CommonService.asmx/GetPreferDistrict",
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
          success: function (result) {
            $('#ddlPreferDist').find('option').remove();
              
            var strData = eval('(' + result.d + ')');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("#ddlPreferDist").append($("<option></option>").val(strData[i].ID).html(strData[i].DistrictName));
               
            }
            $('#ddlPreferDist').chosen();
            fillCity2('ddlPreferDist',0);
        }
    });
}


   
   function BindModeofRecuitment() {

    $.ajax({
        type: 'Post',
        url: "Service/CommonService.asmx/GetModeofRecuitment",
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        success: function (result) {
            $('#ddlModeofRecuitment').find('option').remove();
            var strData = eval('(' + result.d + ')');
            $('#ddlModeofRecuitment').append('<option value="0">Select Mode Of Recruitement</option>');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("#ddlModeofRecuitment").append($("<option></option>").val(strData[i].ID).html(strData[i].Name));
            }
            $('#ddlModeofRecuitment').chosen();

        }
    });
}


    function BindCategory(obj) {

    $.ajax({
        type: 'Post',
        url: "Service/CommonService.asmx/GetCategory",
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        success: function (result) {
            $('#ddlCategory').find('option').remove();
            var strData = eval('(' + result.d + ')');
            for (var i = 0; i <= strData.length - 1; i++) {

                $("#ddlCategory").append($("<option></option>").val(strData[i].ID).html(strData[i].Name));
            }
            $('#ddlCategory').val(obj);
            $('#ddlCategory').chosen();

        }
    });
}
 function BindPostCollege() {

    $.ajax({
        type: 'Post',
        url: "Service/CommonService.asmx/GetPostCollege",
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        success: function (result) {
          
            $('#PostingCollage').find('option').remove();
            var strData = eval('(' + result.d + ')');
           
              $('#PostingCollage').append('<option value="0">Select </option>');
            for (var i = 0; i <= strData.length - 1; i++) {
          
                $("#PostingCollage").append($("<option></option>").val(strData[i].collegeid).html(strData[i].CollegeName));
            }
          
             $('#PostingCollage').chosen();

        }
    });
}

function BindQualification() {

    $.ajax({
        type: 'Post',
        url: "Service/CommonService.asmx/GetQualification",
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        success: function (result) {
            $('#ddlDegreeQualification').find('option').remove();
            var strData = eval('(' + result.d + ')');
            $('#ddlDegreeQualification').append('<option value="0">Select</option>');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("#ddlDegreeQualification").append($("<option></option>").val(strData[i].CourseID).html(strData[i].Name));
            }
            $('#ddlDegreeQualification').chosen();

        }
    });
}
function BindUniversity() {

    $.ajax({
        type: 'Post',
        url: "Service/CommonService.asmx/GetUniversity",
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        success: function (result) {
            $('#ddlQlfUniversity').find('option').remove();
            var strData = eval('(' + result.d + ')');
            $('#ddlQlfUniversity').append('<option value="0">Select</option>');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("#ddlQlfUniversity").append($("<option></option>").val(strData[i].UniversityId).html(strData[i].UniveristyName));
            }
            $('#ddlQlfUniversity').chosen();

        }
    });
}


function BindServDescription() {

    $.ajax({
        type: 'Post',
        url: "Service/CommonService.asmx/GetServDescription",
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        success: function (result) {
            $('#ddlServiceDescription').find('option').remove();
            var strData = eval('(' + result.d + ')');
            $('#ddlServiceDescription').append('<option value="0">Select</option>');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("#ddlServiceDescription").append($("<option></option>").val(strData[i].TrainingID).html(strData[i].TrainingDescription));
            }
            $('#ddlServiceDescription').chosen();

        }
    });
}
function BindPayScale(obj) {

    $.ajax({
        type: 'Post',
        url: "Service/CommonService.asmx/GetPayScale",
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        success: function (result) {
            $('#ddlFunctionalGrade').find('option').remove();
            var strData = eval('(' + result.d + ')');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("#ddlFunctionalGrade").append($("<option></option>").val(strData[i].PayScaleID).html(strData[i].PayScaleName));
            }
                 $('#ddlFunctionalGrade').val(obj);
            $('#ddlFunctionalGrade').chosen();

        }
    });
}
function BindSubject() {

    $.ajax({
        type: 'Post',
        url: "Service/CommonService.asmx/GetSubject",
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        success: function (result) {
            $('#ddlSubject').find('option').remove();
            var strData = eval('(' + result.d + ')');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("#ddlSubject").append($("<option></option>").val(strData[i].ID).html(strData[i].Name));
            }
            $('#ddlSubject').chosen();

        }
    });
}
function BindServDesignation() {

    $.ajax({
        type: 'Post',
        url: "Service/CommonService.asmx/GetServDesignation",
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        success: function (result) {
            $('#ddlServDesignation').find('option').remove();
            var strData = eval('(' + result.d + ')');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("#ddlServDesignation").append($("<option></option>").val(strData[i].ID).html(strData[i].Name));
            }
            $('#ddlServDesignation').chosen();

        }
    });
}
function BindDepartment() {

    $.ajax({
        type: 'Post',
        url: "Service/CommonService.asmx/GetDepartment",
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        success: function (result) {
            $('#ddlDepartment').find('option').remove();
            var strData = eval('(' + result.d + ')');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("#ddlDepartment").append($("<option></option>").val(strData[i].DepartmentID).html(strData[i].DepartmentName));
            }
            $('#ddlDepartment').chosen();

        }
    });
}


function ShowverifyDetail(obj) {
//alert(obj);
 $.blockUI({ message: $('#DivShowDetail') });
  var data = "";    
    $.ajax({
        type: 'GET',
        url: "Handler/LoadCities.ashx?functionKey=48&EmpCode=" + obj,
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (country) {
            $.each(country, function () {
                data += "<table><tr><td>" + this['VerifiedRemarks'] + "</td></tr></table>";                
            });
        },
    });
   
  //  alert(data);
    $('#divMessage').append(data);
    
}

function DeleteQlification(obj) {
    var tbl = $(obj).parent().parent().parent();
    var rowCount = $(tbl).rowCount();
    if (rowCount == 1) {
        alert('You can not delete this row');
        return false;
    }
    var listItemId = $(obj).parent().parent();
    listItemId.remove(); // remove row
    var r = ($('#MainEmpQlTable tr').length);
    var i = 1;
    $("#MainEmpQlTable tr:gt(0)").each(function () {
        //var lblid = $(this).find('td:first').children('label').attr('id');
        $(this).find('td:eq(0)').find('label').html(i + '.');
        //var ddddstid = $(this).find('td:first').next().children('select').attr('id');
        //$(this).find('td:eq(1)').find('select').unchosen();
        $(this).find('td:eq(1)').find('select').attr('id', 'ddlDegreeQualification' + i);
        //$(this).find('td:eq(1)').find('select').chosen();

        //$(this).find('td:eq(2)').find('select').unchosen();
        $(this).find('td:eq(2)').find('select').attr('id', 'ddlQlfUniversity' + i);
        // $(this).find('td:eq(2)').find('select').chosen();
        //$(this).chosen();
        // alert($(this).find('td').children('select').attr('id'));
        // alert($(this).find('td:second').children('select'));
        //$(this).find('td').children('select').attr('id', 'ddlDistrict' + i);
        i = i + 1;

    });
   $('.datepicker').datepicker({ dateFormat: 'dd/mm/yy' });

}
function DeleteServiceDetail(obj) {
    var tbl = $(obj).parent().parent().parent();
    var rowCount = $(tbl).rowCount();
    if (rowCount == 1) {
        alert('You can not delete this row');
        return false;
    }
    var listItemId = $(obj).parent().parent();
    listItemId.remove(); // remove row
    var r = ($('#tblServiceTable tr').length);
    var i = 1;
    $("#tblServiceTable tr:gt(0)").each(function () {
        $(this).find('td select').each(function () {
            //$(this).unchosen();
            $(this).attr('id', 'ddlServiceDescription' + i);
            // $(this).chosen();
          //  $(this).chosen();
            i = i + 1;
        });
    });
    $('.datepicker').datepicker({ dateFormat: 'dd/mm/yy' });
}

function DeleteAchievement(obj) {
    var tbl = $(obj).parent().parent().parent();
    var rowCount = $(tbl).rowCount();
    if (rowCount == 1) {
        alert('You can not delete this row');
        return false;
    }
    var listItemId = $(obj).parent().parent();
    listItemId.remove(); // remove row
    var r = ($('#mainAchivement tr').length);
    var i = 1;
    $("#mainAchivement tr:gt(0)").each(function () {
        $(this).find('td:eq(1)').find('select').attr('id', 'ddlAchivements' + i);
       $(this).find('td:eq(2)').find('input').attr('id', 'txtDescription' + i);
        i = i + 1;
        //$(this).chosen();

    });
}


function DeleteService(obj) {
    var tbl = $(obj).parent().parent().parent();
    var rowCount = $(tbl).rowCount();
    if (rowCount == 1) {
        alert('You can not delete this row');
        return false;
    }
    var listItemId = $(obj).parent().parent();
    listItemId.remove(); // remove row
    var r = ($('#tbllistServiceRecord tr').length);
    var i = 1;
    $("#tbllistServiceRecord tr:gt(0)").each(function () {
        //var lblid = $(this).find('td:first').children('label').attr('id');
        // $(this).find('td:first').children('label').html(i + '.');
        //var ddddstid = $(this).find('td:first').next().children('select').attr('id');
        $(this).find('td:eq(0)').find('select').attr('id', 'ddlServiceDesignation' + i);


        $(this).find('td:eq(1)').find('select').attr('id', 'ddlServicePosting' + i);

        // alert($(this).find('td').children('select').attr('id'));
        // alert($(this).find('td:second').children('select'));
        //$(this).find('td').children('select').attr('id', 'ddlDistrict' + i);


        $(this).find('td:eq(4)').find('select').attr('id', 'PostingCollage' + i);
       $(this).find('td:eq(4)').find('input').attr('id', 'txtCollegeName' + i);
        i = i + 1;
       // $(this).chosen();

    });
    $('.datepicker').datepicker({ dateFormat: 'dd/mm/yy' });
}
$.fn.rowCount = function () {
    return $(this).find('tr').length;
};
function ShowHide() {

    if ($('#ddlMartial').val() == '1') {
        $("#MarriedStatus1").show();
        $("#MarriedStatus2").show();
    }
    else {
        $("#MarriedStatus1").hide();
        $("#MarriedStatus2").hide();
    }
}
function ShowHideAdminExp() {

    if ($('#ddlAdministrativeExp').val() == '0') {
        $("#OrgDet1").hide();
        $("#OrgDet2").hide();
    }
    else {
        $("#OrgDet1").show();
        $("#OrgDet2").show();
    }
}

function ShowHideRuralService() {

   if ($('#ddlRuralService').val() == '2') {
        $("#tdService1").hide();
        $("#tdService2").hide();
    }
    else {
        $("#tdService1").show();
        $("#tdService2").show();
    }
}

function GetDataFailed(result) {

}

function fnQualificationSaveBtn() {
    var count = 0;
    var EmpCode = $('#hdnEmpCode').val();
    if (EmpCode > 0) {
        $('#MainEmpQlTable1 tr:gt(0)').each(function () {
            $(this).find('td select').each(function () {
                if ($(this).val() == "0") {
                    alert('Select' + ' ' + $(this).attr('msg'));
                    count = 1;
                    return false;
                }
            });
        });
        if (count == 1) {
            return false;
        }

        var JSONObject = new Array();

        $('#MainEmpQlTable1 tr:gt(0)').each(function () {
            var obj = new Object();

            obj.CourseID = $(this).find('td:eq(1)').find('select').val();
            obj.UniversityID = $(this).find('td:eq(2)').find('select').val();
            obj.Marks = $(this).find('td:eq(3)').find('input').val();
            obj.Subject = $(this).find('td:eq(4)').find('input').val();
            obj.Year = $(this).find('td:eq(5)').find('input').val();

            JSONObject.push(obj);
        });

        var strdata = JSON.stringify(JSONObject);
        $.ajax({
            type: "POST",
            url: "Handler/SaveInfo.ashx?functionKey=42&EmpID=" + EmpCode,
            data: JSON.stringify(JSONObject),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) { }
        });

        //        $.getJSON('Handler/SaveInfo.ashx?functionKey=9&EmpID=' + EmpCode, function (country) {
        //        });
        //        $('#MainEmpQlTable tr:gt(0)').each(function () {
        //            var Qualification = $(this).find('td:eq(1)').find('select').val();
        //            var University = $(this).find('td:eq(2)').find('select').val();
        //            var Marks = $(this).find('td:eq(3)').find('input').val();
        //            var Subject = $(this).find('td:eq(4)').find('input').val();
        //            var Year = $(this).find('td:eq(5)').find('input').val();
        //            //            var Qualification = $(this).find('td:first').next().children('select').val();
        //            //            var University = $(this).find('td:first').next().next().children('select').val();
        //            //            var Marks = $(this).find('td:first').next().next().next().children('input').val();
        //            //            var Subject = $(this).find('td:first').next().next().next().next().children('input').val();
        //            //            var Year = $(this).find('td:first').next().next().next().next().next().children('input').val();
        //            $.getJSON('Handler/SaveInfo.ashx?functionKey=2&EmpID=' + EmpCode + '&CourseID=' + Qualification + '&UniversityID=' + University + '&Marks=' + Marks + '&Subject=' + Subject + '&Year=' + Year, function (country) {
        //            });
        //        });
        alert('Record Saved Successfully');
    }
    else {
        alert('Please Enter Personal Detail first');
    }

}


function fnAchievements() {
    var count = 0;
    var EmpCode = $('#hdnEmpCode').val();
    if (EmpCode > 0) {
        $('#mainAchivement tr:gt(0)').each(function () {
            $(this).find('td select').each(function () {

                if ($(this).val() == "0") {
                    alert('Select' + ' ' + $(this).attr('msg'));
                    count = 1;
                    return false;
                }
            });
        });
        if (count == 1) {
            return false;
        }
        var cnt;
        cnt = -1;
        $('#mainAchivement tr:gt(0)').each(function () {
            var AchivementId = $(this).find('td:eq(1)').find('select').val();
            var Detail = $(this).find('td:eq(2)').find('input').val();
            cnt = cnt + 1;
            $.getJSON('Handler/SaveInfo.ashx?functionKey=30&EmpID=' + EmpCode + '&AchievementId=' + AchivementId + '&Detail=' + Detail + '&isdelete=' + cnt, {})
                .done(function (achivement) {
                })
                .fail(function () {
                });
        });
        alert('Record Saved Successfully');
    }
    else {
        alert('Please Enter Personal Detail first');
    }
}
function fnServiceTrainingSaveBtn() {

    //var rcnt = ($('#mainAchivement tr').length);

    var count = 0;
    var EmpCode = $('#hdnEmpCode').val();
    if (EmpCode > 0) {
        $('#tblServiceTable tr:gt(0)').each(function () {
            $(this).find('td select').each(function () {
                if ($(this).val() == "0") {
                    alert('Select' + ' ' + $(this).attr('msg'));
                    count = 1;
                    return false;
                }
            });
        });
        if (count == 1) {
            return false;
        }
        $('#tblServiceTable tr:gt(0)').each(function () {
            var StartDate = $(this).find('td:eq(1)').find('input').val();
            var EndDate = $(this).find('td:eq(2)').find('input').val();
            var Organizedat = $(this).find('td:eq(3)').find('input').val();
            //var Remarks = $(this).find('td:eq(4)').find('input').val();
            if ((StartDate == "") || (EndDate == "") || (Organizedat == "")) {
                count = 1;
            }
        });
        if (count == 0) {

            var JSONObject = new Array();

            $('#tblServiceTable tr:gt(0)').each(function () {
                var obj = new Object();

                obj.TrainingID = $(this).find('td:eq(0)').find('select').val();

                var date = $(this).find('td:eq(1)').find('input').val();
                var StartDate = date.split("/").reverse().join("-");
                obj.StartDate = StartDate; // $(this).find('td:eq(1)').find('input').val();

                var date = $(this).find('td:eq(2)').find('input').val();
                var Enddate = date.split("/").reverse().join("-");
                obj.EndDate = Enddate; //$(this).find('td:eq(2)').find('input').val();

                obj.Organizedat = $(this).find('td:eq(3)').find('input').val();
                obj.Remarks = $(this).find('td:eq(4)').find('input').val();


                JSONObject.push(obj);
            });

            var strdata = JSON.stringify(JSONObject);

            $.ajax({
                type: "POST",
                url: "Handler/SaveInfo.ashx?functionKey=43&EmpID=" + EmpCode,
                data: JSON.stringify(JSONObject),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) { }
            });
            //            $.getJSON('Handler/SaveInfo.ashx?functionKey=8&EmpID=' + EmpCode, function (country) {
            //            });

            //            $('#tblServiceTable tr:gt(0)').each(function () {
            //                var TrainingID = $(this).find('td:eq(0)').find('select').val();
            //                var StartDate = $(this).find('td:eq(1)').find('input').val();
            //                var EndDate = $(this).find('td:eq(2)').find('input').val();
            //                var Organizedat = $(this).find('td:eq(3)').find('input').val();
            //                var Remarks = $(this).find('td:eq(4)').find('input').val();
            //                $.getJSON('Handler/SaveInfo.ashx?functionKey=3&EmpID=' + EmpCode + '&TrainingID=' + TrainingID + '&StartDate=' + StartDate + '&EndDate=' + EndDate + '&Organizedat=' + Organizedat + '&Remarks=' + Remarks, function (country) {
            //                });
            //            });
            alert('Record Saved Successfully');
        }
    }
    else {
        alert('Please Enter Personal Detail first');
    }

}
function fnServiceSaveBtn() {
    var count = 0;
    var EmpCode = $('#hdnEmpCode').val();
   
    if (EmpCode > 0) {
        $('#tbllistServiceRecord tr:gt(0)').each(function () {
            $(this).find('td select').each(function () {
//                if ($(this).val() == "0") {
//                    alert('Select ' + ' ' + $(this).attr('msg'));
//                    count = 1;
//                    return false;
//                }
            });
        });
        if (count == 1) {
            return false;
        }

        $('#tbllistServiceRecord tr:gt(0)').each(function () {

            var FromDate = $(this).find('td:eq(2)').find('input').val();
            var ToDate = $(this).find('td:eq(3)').find('input').val();
            if ((FromDate == "") || (ToDate == "")) {
                count = 1;
            }
        });
        if (count == 0) {

            // array
            var JSONObject = new Array();

            $('#tbllistServiceRecord tr:gt(0)').each(function () {
                var obj = new Object();

                obj.DesignationID = $(this).find('td:eq(0)').find('select').val();
                //alert(serviceid);
                obj.EmpCategoryID = $(this).find('td:eq(1)').find('select').val();

                var date = $(this).find('td:eq(2)').find('input').val();
                var fromdate = date.split("/").reverse().join("-");
                obj.FromDate = fromdate//$(this).find('td:eq(2)').find('input').val();

                var date = $(this).find('td:eq(3)').find('input').val();
                var todate = date.split("/").reverse().join("-");

                obj.ToDate = todate; //$(this).find('td:eq(3)').find('input').val();
                obj.CollegeID = $(this).find('td:eq(4)').find('select').val();
                var id = $(this).find('td:eq(4)').find('select').attr('id');
                id = id.replace('PostingCollage', '');
                obj.CollegeName = $('#txtCollegeName' + id).val();
                obj.ServiceType = $(this).find('td:eq(5)').find('select').val();

                JSONObject.push(obj);
            });

            var strdata = JSON.stringify(JSONObject);
            //            alert(strdata);
            //            $.getJSON('Handler/SaveInfo.ashx?functionKey=41&EmpID=' + EmpCode + '&data=' + strdata, function (country) {
            //            });

            $.ajax({
                type: "POST",
                url: "Handler/SaveInfo.ashx?functionKey=41&EmpID=" + EmpCode,
                data: JSON.stringify(JSONObject),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) { }
            });


            //========================================================

            //            //$.getJSON('Handler/SaveInfo.ashx?functionKey=7&EmpID=' + EmpCode, function (country) {
            //            $.getJSON('Handler/SaveInfo.ashx?functionKey=7&EmpID=0', function (country) {
            //            });

            //            $('#tbllistServiceRecord tr:gt(0)').each(function () {
            //                var DesignationID = $(this).find('td:eq(0)').find('select').val();
            //                var serviceid = $(this).find('td:eq(7)').find('input').val();
            //                //alert(serviceid);
            //                var EmpCategoryID = $(this).find('td:eq(1)').find('select').val();
            //                var FromDate = $(this).find('td:eq(2)').find('input').val();
            //                var ToDate = $(this).find('td:eq(3)').find('input').val();
            //                var CollegeID = $(this).find('td:eq(4)').find('select').val();
            //                var id = $(this).find('td:eq(4)').find('select').attr('id');
            //                id = id.replace('PostingCollage', '');
            //                var CollegeName = $('#txtCollegeName' + id).val();
            //                var ServiceType = $(this).find('td:eq(5)').find('select').val();
            //                //$.getJSON('Handler/SaveInfo.ashx?functionKey=4&EmpID=' + EmpCode + '&DesignationID=' + DesignationID + '&EmpCategoryID=' + EmpCategoryID + '&FromDate=' + FromDate + '&ToDate=' + ToDate + '&CollegeID=' + CollegeID + '&ServiceType=' + ServiceType + '&CollegeName=' + CollegeName , function (country) {

            //                $.getJSON('Handler/SaveInfo.ashx?functionKey=4&EmpID=' + EmpCode + '&DesignationID=' + DesignationID + '&EmpCategoryID=' + EmpCategoryID + '&FromDate=' + FromDate + '&ToDate=' + ToDate + '&CollegeID=' + CollegeID + '&ServiceType=' + ServiceType + '&CollegeName=' + CollegeName + '&serviceid=' + serviceid, function (country) {
            //                });

            //            });
            alert('Record Saved Successfully');
        }
    }
    else {
        alert('Please Enter Personal Detail first');
    }
}
(function ($) {

    $.showprogress = function () {
        $.hideprogress();
        $("BODY").append('<div id="processing_overlay"></div>');
        $("BODY").append(
		      '<div id="processing_container">' +
        //'<div id="processing_title">This is title</div>' +
		        '<div id="processing_content">' +
    		            '<img src="img/30.gif"  alt=""/>' +
		                '<br/><br/>Please wait While Loading...' +
			    '</div>' +
		      '</div>');
        var pos = ($.browser.msie && parseInt($.browser.version) <= 6) ? 'absolute' : 'fixed';

        $("#processing_container").css({
            position: pos,
            zIndex: 99999,
            padding: 0,
            margin: 0
        });

        $("#processing_container").css({
            minWidth: $("#processing_container").outerWidth(),
            maxWidth: $("#processing_container").outerWidth()
        });

        var top = (($(window).height() / 2) - ($("#processing_container").outerHeight() / 2)) + (-75);
        var left = (($(window).width() / 2) - ($("#processing_container").outerWidth() / 2)) + 0;
        if (top < 0) top = 0;
        if (left < 0) left = 0;

        // IE6 fix
        if ($.browser.msie && parseInt($.browser.version) <= 6) top = top + $(window).scrollTop();

        $("#processing_container").css({
            top: top + 'px',
            left: left + 'px'
        });
        $("#processing_overlay").height($(document).height());
    },
    $.hideprogress = function () {
        $("#processing_container").remove();
        $("#processing_overlay").remove();
    },
    $.showmsg = function (msgEle, msgText, msgClass, msgIcon, msgHideIcon, autoHide) {
        var tblMsg;

        tblMsg = '<table width="100%" cellpadding="1" cellspacing="0" border="0" class="' + msgClass + '"><tr><td style="width:30px;" align="center" valign="middle">' + msgIcon + '</td><td>' + msgText + '</td><td style="width:30px;" align="center" valign="middle"><a href="javascript:void(0);" onclick="$(\'#' + msgEle + '\').toggle(400);">' + msgHideIcon + '</a></td></tr></table>';

        $("#" + msgEle).html(tblMsg);
        $("#" + msgEle).show();
        if (autoHide) {
            setTimeout(function () {
                $('#' + msgEle).fadeOut('normal')
            }, 10000
	        );
        }
    }
})(jQuery);


function IntegerNumberEmp(obj) {

    var data = $('#' + obj).val();
    var len = data.length;
    var c;
    for (var i = 0; i < len; i++) {
        c = data.charAt(i).charCodeAt(0);
        if (c < 48 || c > 57) {
            alert('Only Integer Allowed');
            $('#' + obj).val('');
            $('#' + obj).focus();
            return false;
            //event.preventDefault();
            //break;
        }
    }
}


//.......To validate email address ...........//
function isValidEmailAddress(emailAddress,cntrl,className) {
 var inputContol = document.getElementById(emailAddress);
if($(cntrl).val() != ""){
        var pattern = new RegExp(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
        var a = pattern.test ($(cntrl).val());
        if (a == false)
        {
       $("#"+className).css({ "background-image": "url('validNo.png')" });
          $(cntrl).val("");
        }
        else
        {
         $("#"+className).css({ "background-image": "url('validYes.png')" });
        }
    }
    
}

//----------Remove Additional Class-------------
function removeErrorClass(controlName, className) {
   var inputContol = document.getElementById(controlName);  

    if (inputContol.value != "") {
        $("#"+className).css({ "background-image": "url('validYes.png')" });
    }
    else {
      $("#"+className).css({ "background-image": "url('validNo.png')" });
   }
}

function fillCity2(obj,cid) {

    var id = obj;
    var values=$('#'+obj).val();
    var city = id.replace("ddlPreferDist", "");
    $('#ddlPreferCity' + city).chosen();
    var ddlData;
    var rowid = $(obj).parent().parent();

    $.getJSON('Handler/LoadCities.ashx?functionKey=3&ID=' + values, function (country) {
    
        ddlData = "<option value='0'>Select...</option>";
        $.each(country, function () {
            ddlData += "<option value='" + this['CityId'] + "'>" + this['Name'] + "</option>";
        });
        $('#ddlPreferCity' + city).html(ddlData);
        $('#ddlPreferCity'+ city).val(cid);
       $('#ddlPreferCity' + city).chosen();
       $('#ddlPreferCity' + city).trigger("liszt:updated");
       
    });
    }
    function ShowCollege(obj){
    var id=$(obj).parent().find('input');
      if($(obj).val()=="10001")
      {
      $(id).css("display","block");
      }
      else
      {
        $(id).css("display","none");
      }
    }

    function GetEmployeeViceRecord(EmpId)
    {
     $.getJSON('Handler/LoadCities.ashx?functionKey=27&EmpId=' + EmpId, function (country) {
            $('#tbllistServiceRecord tr:gt(0)').remove();
            $.each(country, function () {
                var DesignationID = this['DesignationID'];
                var EmpCategoryID = this['EmpCategoryID'];
                var FromDate = this['FromDate'];
                var ToDate = this['ToDate'];
                var CollegeID = this['CollegeID'];
                var ServiceType = this['ServiceType'];
                var CollegeName=this['CollegeName'];
                var html = "";
                // $("#ddlCity1").unchosen();
                var ddlData = '';
                var ddlUniversty = '';
                var tp=1;
                //ddlData = "<option value='0'>Select...</option>";
                $.getJSON('Handler/LoadCities.ashx?functionKey=18', function (country) {
                ddlData=ddlData+"<option value='0'>Select</option>";
                    $.each(country, function () {
                        ddlData = ddlData + "<option value='" + this['ID'] + "'>" + this['Name'] + "</option>";
                    });
                    $.getJSON('Handler/LoadCities.ashx?functionKey=19', function (country) {
                    ddlUniversty=ddlUniversty+"<option value='0'>Select</option><option value='10001'>Other</option>";
                        $.each(country, function () {
                            ddlUniversty = ddlUniversty + "<option value='" + this['ID'] + "'>" + this['Name'] + "</option>";
                        });

                        $('#tbllistServiceRecord').append("<tr id='FirstRow'><td class='controls'><select id='ddlServiceDesignation" + tp + "' msg='Designation'>" + ddlData + "</select></td><td class='controls'><select  id='ddlServicePosting" + tp + "' msg='Service Posting'><option value='1'>Adoc</option><option value='2'>Regular</option><option value='3'>Deputational</option></select></td><td class='controls'><input type='text' class='input-small datepicker' id='txtPeriodFrom' value='' onblur='check_date(this)' /></td><td class='controls'><input type='text' class='input-small datepicker' onblur='check_date(this)' id='txtPeriodTo' value='' /></td><td class='controls' id='rp"+tp+"'><select id='PostingCollage" + tp + "' onchange='ShowCollege(this);'>" + ddlUniversty + "</select><input id='txtCollegeName"+tp+"' class='input-medium' style='display:none'/></td><td class='controls'><select id='ddlServiceType" + tp + "'><option value='Rural'>Rural</option> <option value='Urban'>Urban</option></select></td><td><a href='javascript:void(0)' title='' id='A1' class='btn btn-danger' onclick='DeleteService(this)'>Delete</a></td></tr>");

                        //$('#tbllistServiceRecord').append("<tr id='FirstRow'><td class='controls'><select id='ddlServiceDesignation" + tp + "' msg='Designation'>" + ddlData + "</select></td><td class='controls'><select  id='ddlServicePosting" + tp + "' msg='Service Posting'><option value='1'>Adoc</option><option value='2'>Regular</option><option value='3'>Deputational</option></select></td><td class='controls'><input type='text' class='input-small datepicker' id='txtPeriodFrom' value='' onblur='check_date(this)' /></td><td class='controls'><input type='text' class='input-small datepicker' onblur='check_date(this)' id='txtPeriodTo' value='' /></td><td class='controls'><select id='PostingCollage" + tp + "'>" + ddlUniversty + "</select></td><td class='controls'><select id='ddlServiceType" + tp + "'><option value='Rural'>Rural</option> <option value='Urban'>Urban</option></select></td><td><a href='javascript:void(0)' title='' id='A1' class='btn btn-danger' onclick='DeleteService(this)'>Delete</a></td></tr>");

                        tp = tp + 1;
                        $('#tbllistServiceRecord tr:last').each(function () {
                            $(this).find('td:eq(0)').find('select').val(DesignationID);
                            $(this).find('td:eq(0)').find('select').chosen();
                            $(this).find('td:eq(1)').find('select').val(EmpCategoryID);
                            $(this).find('td:eq(1)').find('select').chosen();
                            $(this).find('td:eq(2)').find('input').val(FromDate);
                            $(this).find('td:eq(3)').find('input').val(ToDate);
                            $(this).find('td:eq(4)').find('select').val(CollegeID);
                           
                            if(CollegeID=="0")
                            {
                            $(this).find('td:eq(4)').find('select').val('10001');
                            $(this).find('td:eq(4)').find('input').css('display','block');
                            $(this).find('td:eq(4)').find('input').val(CollegeName);
                            }
                            $(this).find('td:eq(4)').find('select').chosen();
                            $(this).find('td:eq(5)').find('select').val(ServiceType);
                            $(this).find('td:eq(5)').find('select').chosen();
                        });
                        $('.datepicker').datepicker({ dateFormat: 'dd/mm/yy' });
                    });
                });

            });
             
        });
    }


    function PreviewImage() {
    var fReader = new FileReader();
    fReader.readAsDataURL($("#fileInput")[0].files[0]);
    fReader.onload = function (fileEvent) {
        $("#imgEmployee").attr("src", fileEvent.target.result);
    };
};

    function district() {
    $.ajax({
        type: 'Post',
        url: "Service/CommonService.asmx/GetMarCommittee",
        contentType: "application/json;",
        dataType: "json",
        async: false,
      //   data: JSON.stringify({ BranchCode: BranchCode }),
        success: function (result) {
            $('#ddlNameofCollage').find('option').remove();
            var strData = eval('(' + result.d + ')');
           // $('#ddlNameofCollage').append('<option value="0">Select MarketCommitee</option>');
            for (var i = 0; i <= strData.length - 1; i++) {

                $("#ddlNameofCollage").append($("<option></option>").val(strData[i].MarketCommiteeID).html(strData[i].MarketCommiteeName));
            }
            $('#ddlNameofCollage').chosen();

        }
    });
}



    function Edit(EmpId) {
     if (EmpId > 0) {
   $('#hdnEmpCode').val(EmpId);

    $.ajax({
        type: 'Post',
        url: 'Service/CommonService.asmx/EditDetail',
        contentType: "application/json;",
        dataType: "json",
        data: JSON.stringify({ EmpId: EmpId }),
        success: function (result) {
            var strdata = eval('(' + result.d + ')');
            for (var i = 0; i <= strdata.length - 1; i++) {
                $('#txtSeniority').val(strdata[i].SeniorityNo);
                $('#txtFristName').val(strdata[i].FirstName);
                $('#txtMediumName').val(strdata[i].MidleName);
                $('#txtLastname').val(strdata[i].LastName);
                $('#txtFatherName').val(strdata[i].FatherName);
                $('#txtMotherName').val(strdata[i].MotherName);
                $('#txtSuperAn').val(strdata[i].DateofSuperannuation);
                $('#txtDOB').val(strdata[i].DOB);
                $('#txtAddress').val(strdata[i].Address);
                $('#txtDOJ').val(strdata[i].DateofJoining);
                BindDesignation(strdata[i].DesignationID);
                BindState(strdata[i].fnStateCode,strdata[i].DistrictID);
                district(strdata[i].CollegeID);
                $('#txtPostCode').val(strdata[i].PostalCode);
                $('#txtGPFNo').val(strdata[i].GPFPRAN);
                BindPayScale(strdata[i].PayScaleID);
                BindCategory(strdata[i].EmpCategoryID);
                $('#ddlGender').val(strdata[i].Gender);
                $("#ddlGender").trigger("liszt:updated");
                $('#ddlNameofCollage').val(strdata[i].CollegeID);
                $('#txtPhone').val(strdata[i].PhoneNo);
                $('#txtMobileNo').val(strdata[i].MobileNo);
                $('#txtEmailID').val(strdata[i].EmailId);
                $('#txtECRNo').val(strdata[i].ECRNO);
                $('#txtAccNo').val(strdata[i].BankAccountNo);
                $('#txtBasicSalary').val(strdata[i].BasicSalary);
                $('#txtAchievement').val(strdata[i].Achivements);
                $('#txtaadharcard').val(strdata[i].AadharCard); 
                $('#txtnominee').val(strdata[i].Nominee);
                $('#txtbankname').val(strdata[i].BankName);
                $('#txtifsccode').val(strdata[i].IFSCCode);
                $('#txtOrgDetail').val(strdata[i].Organization);
                  $('#ddlMartial').val(strdata[i].MartialID); 
                    $("#ddlMartial").trigger("liszt:updated");
                $("#imgEmployee").attr("src","Service/Pics/Student/" + strdata[i].Image.toString());
                $("#imgEmployee").attr("value",strdata[i].Image);
                $('#ddlTransferCategory').val(strdata[i].TransferCatId);
                $('#ddlTransferCategory').chosen(); 
                $('#ddlGender').chosen(); 
                $('#ddlAdministrativeExp').chosen(); 
                $('#chkServicemen').chosen();   
                $('#ddlMartial').chosen(); 
                if (strdata[i].IShandicap == 1) {
                $('#chkIshandicap').attr('checked', true);
                }
                else
                $('#chkIshandicap').attr('checked', false);
                if (strdata[i].ExQratiachk == 1) {
                $('#ExQratia').attr('checked', true);
                $('#trExQratia').show();
                $('#trExQratia1').show();
                }
                else
                {
                $('#ExQratia').attr('checked', false);
                $('#trExQratia').hide();
                $('#trExQratia1').hide();
                }
                $('#txtDescriptionEXP').val(strdata[i].Description);
                $('#txtExpireDate').val(strdata[i].ExpiryDate);
                $('#txtExpName').val(strdata[i].Name);
                             
                if (strdata[i].IsActive == 1) {
                    $('#IsActive').attr('checked', true);
                }
                else {
                    $('#IsActive').attr('checked', false);
                }
            }
               var row='';
                $.getJSON('Handler/LoadCities.ashx?functionKey=71&EmpId=' + EmpId, function (achievements) {
                    var r = 1;
                    $.each(achievements, function () {
                        var abc = this['AchievementId'];
                        if (r == 1) {
                            GetAchivement();
                            $("#ddlAchivements option[value=" + this["AchievementId"] + "]").attr('selected', 'selected');
                            $("div [id*='ddlAchivements']").find("a").find("span").text(this["Name"]);
                            $("#txtDescription").val(this["Detail"]);
                        }
                        else {

                            row = ''
                            row += "<tr><td><label id='PreferredOrder1' >" + r + ".</label></td><td><select class='input-medium' id='ddlAchivements" + r + "' msg='Achievements'>" + GetAchivementxyz("ddlAchivements" + r, abc) + "</select></td><td><input  type='text' class='input-small focused' id='txtDescription" + r + "' msg='AchievementDescription'/></td><td><a href=javascript:void(0)  id='btnDelete' onclick='DeleteAchievement(this);'  class='btn btn-danger'>Delete</a></td></tr>";
                            $("#mainAchivement tbody").append(row);
                            $("#ddlAchivements" + r).find('select').chosen();
                            $("#txtDescription" + r).val(this["Detail"]);
                        }
                        r = r + 1;
                    });

                });

           $.getJSON('Handler/LoadCities.ashx?functionKey=26&EmpId=' + EmpId, function (country) {
            $('#MainEmpQlTable1 tr:gt(0)').remove();
            var t = 1;
            $.each(country, function () {
                var university = this['UniversityID'];
                var Marks = this['Marks'];
                var Subject = this['Subject'];
                var Year = this['Year'];
                var Course = this['CourseID'];
                var r = ($('#MainEmpQlTable1 tr').length);
                var ddlData = '';
                var ddlUniversity = '';
                $.getJSON('Handler/LoadCities.ashx?functionKey=15', function (country) {
                ddlData=ddlData+"<option value='0'>Select</option>";
                    $.each(country, function () {
                        ddlData = ddlData + "<option value='" + this['CourseID'] + "'>" + this['Name'] + "</option>";
                    });
                  
                    $.getJSON('Handler/LoadCities.ashx?functionKey=16', function (country) {
                    ddlUniversity=ddlUniversity+"<option value='0'>Select</option>"
                        $.each(country, function () {
                            ddlUniversity = ddlUniversity + "<option value='" + this['UniversityId'] + "'>" + this['UniveristyName'] + "</option>";
                            
                        });
               
                        $('#MainEmpQlTable1').append("<tr id='FirstRow'><td><label id='PreferredOrder1' >" + t + ".</label> </td> <td class=controls><select id='ddlDegreeQualification" + t + "' msg='Qualification'>" + ddlData + "</select></td><td class='controls'><select id='ddlQlfUniversity" + t + "' msg='University'>" + ddlUniversity + "</select></td><td class='controls'><input id='txtPerMarks" + t + "' type='text' class='input-small focused'/></td><td class='controls'><input id='txtEmpQlSubjects" + t + "' type='text' class='input-small focused'/></td><td class='controls'><input id='txtYearofpassing" + t + "' type='text' class='input-small focused'/></td><td><a href=javascript:void(0)  id='btnDelete' onclick='DeleteQlification(this);'  class='btn btn-danger'>Delete</a></td></tr>");

                        t = t + 1;
                        $('#MainEmpQlTable1 tr:last').each(function () {
                            $(this).find('td:eq(1)').find('select').val(Course);
                            $(this).find('td:eq(1)').find('select').chosen();
                            $(this).find('td:eq(2)').find('select').val(university);
                            $(this).find('td:eq(2)').find('select').chosen();
                            $(this).find('td:eq(3)').find('input').val(Marks);
                            $(this).find('td:eq(4)').find('input').val(Subject);
                            $(this).find('td:eq(5)').find('input').val(Year);
                            //var id = $(this).find('td:eq(2)').find('select').attr(id);
                        });

                    });

                });
            });
        });
            var tq = 1;
        $.getJSON('Handler/LoadCities.ashx?functionKey=28&EmpId=' + EmpId, function (country) {
            $('#tblServiceTable tr:gt(0)').remove();
            $.each(country, function () {
                var TrainingID = this['TrainingID'];
                var StartDate = this['StartDate'];
                var EndDate = this['EndDate'];
                var Organizedat = this['Organizedat'];
                var Remarks = this['Remarks'];
                var ddlData = '';
                $.getJSON('Handler/LoadCities.ashx?functionKey=17', function (country) {
                ddlData=ddlData+"<option value='0'>Select</option>"
                    $.each(country, function () {
                        ddlData = ddlData + "<option value='" + this['TrainingID'] + "'>" + this['TrainingDescription'] + "</option>";
                    });
                    $('#tblServiceTable').append("<tr id='FirstRow'><td class=controls><select id='ddlServiceDescription" + tq + "' msg='Service Description'>" + ddlData + "</select></td><td class='controls'><input id='txtDateFromService" + tq + "' type='text' class='input-small datepicker' onblur='check_date(this)'/></td><td class='controls'><input id='txtDateToService" + tq + "' type='text' class='input-small datepicker' onblur='check_date(this)'/></td><td class='controls'><input id='txtEmpQlSubjects" + tq + "' type='text' class='input-small focused'/></td><td class='controls'><input id='txtRemarksService" + tq + "' type='text' class='input-small focused'/></td><td><a href=javascript:void(0)  id='btnDelete' onclick='DeleteServiceDetail(this);'  class='btn btn-danger'>Delete</a></td></tr>");
                    tq = tq + 1;
                    $('#tblServiceTable tr:last').each(function () {
                        $(this).find('td:eq(0)').find('select').val(TrainingID);
                        $(this).find('td:eq(0)').find('select').chosen();
                        $(this).find('td:eq(1)').find('input').val(StartDate);
                        $(this).find('td:eq(2)').find('input').val(EndDate);
                        $(this).find('td:eq(3)').find('input').val(Organizedat);
                        $(this).find('td:eq(4)').find('input').val(Remarks);
                    });
                   $('.datepicker').datepicker({ dateFormat: 'dd/mm/yy' });
                });
            });
        }); 
                var tp = 1;
        $.getJSON('Handler/LoadCities.ashx?functionKey=27&EmpId=' + EmpId, function (country) {
            $('#tbllistServiceRecord tr:gt(0)').remove();
            $.each(country, function () {
                var DesignationID = this['DesignationID'];
                var EmpCategoryID = this['EmpCategoryID'];
                var FromDate = this['FromDate'];
                var ToDate = this['ToDate'];
                var CollegeID = this['CollegeID'];
                var ServiceType = this['ServiceType'];
                var CollegeName=this['CollegeName'];
                var html = "";
                var ddlData = '';
                var ddlUniversty = '';
                $.getJSON('Handler/LoadCities.ashx?functionKey=18', function (country) {
                ddlData=ddlData+"<option value='0'>Select</option>";
                    $.each(country, function () {
                        ddlData = ddlData + "<option value='" + this['DesignationId'] + "'>" + this['Designation'] + "</option>";
                    });
                    $.getJSON('Handler/LoadCities.ashx?functionKey=19', function (country) {
                    ddlUniversty=ddlUniversty+"<option value='0'>Select</option><option value='10001'>Other</option>";
                        $.each(country, function () {
                            ddlUniversty = ddlUniversty + "<option value='" + this['CollegeId'] + "'>" + this['CollegeName'] + "</option>";
                        });
                        $('#tbllistServiceRecord').append("<tr id='FirstRow'><td class='controls'><select id='ddlServiceDesignation" + tp + "' msg='Designation'>" + ddlData + "</select></td><td class='controls'><select  id='ddlServicePosting" + tp + "' msg='Service Posting'><option value='1'>Adoc</option><option value='2'>Regular</option><option value='3'>Deputational</option></select></td><td class='controls'><input type='text' class='input-small datepicker' id='txtPeriodFrom' value='' onblur='check_date(this)' /></td><td class='controls'><input type='text' class='input-small datepicker' onblur='check_date(this)' id='txtPeriodTo' value='' /></td><td class='controls' id='rp"+tp+"'><select id='PostingCollage" + tp + "' onchange='ShowCollege(this);'>" + ddlUniversty + "</select><input id='txtCollegeName"+tp+"' class='input-medium' style='display:none'/></td><td class='controls'><select id='ddlServiceType" + tp + "'><option value='Rural'>Rural</option> <option value='Urban'>Urban</option></select></td><td><a href='javascript:void(0)' title='' id='A1' class='btn btn-danger' onclick='DeleteService(this)'>Delete</a></td></tr>");
                        tp = tp + 1;
                        $('#tbllistServiceRecord tr:last').each(function () {
                            $(this).find('td:eq(0)').find('select').val(DesignationID);
                            $(this).find('td:eq(0)').find('select').chosen();
                            $(this).find('td:eq(1)').find('select').val(EmpCategoryID);
                            $(this).find('td:eq(1)').find('select').chosen();
                            $(this).find('td:eq(2)').find('input').val(FromDate);
                            $(this).find('td:eq(3)').find('input').val(ToDate);
                            $(this).find('td:eq(4)').find('select').val(CollegeID);                          
                            if(CollegeID=="0")
                            {
                            $(this).find('td:eq(4)').find('select').val('10001');
                            $(this).find('td:eq(4)').find('input').css('display','block');
                            $(this).find('td:eq(4)').find('input').val(CollegeName);
                            }
                            $(this).find('td:eq(4)').find('select').chosen();
                            $(this).find('td:eq(5)').find('select').val(ServiceType);
                            $(this).find('td:eq(5)').find('select').chosen();
                        });
                        $('.datepicker').datepicker({ dateFormat: 'dd/mm/yy' });
                    });
                });
            });  
        });
          $.getJSON('Handler/LoadCities.ashx?functionKey=64&EmpId=' + EmpId, function (country) {
            $('#MainTable tr:gt(0)').remove();
            var r = ($('#MainTable tr').length);
            $.each(country, function () {
            var City=this['CityID'];
            var Dist=this['DistrictId']; 
            var ddlData = '';
            ddlData = "<option value='0'>Select...</option>";
            $.getJSON('Handler/LoadCities.ashx?functionKey=4&StateId=1' + '&distcode=0', function (country) {
                $.each(country, function () {
                    ddlData = ddlData + "<option value='" + this['ID'] + "'>" + this['DistrictName'] + "</option>";  
                });
               
                $('#MainTable').append("<tr id='row'><td><label id='PreferredOrder1' class='control-label'>" + r + ".</label> </td> <td class=controls><select class='input-medium' id='ddlPreferDist" + r + "' onchange='fillCity2(this.id,0);'>" + ddlData + "</select></td><td class='controls'><select class='input-medium' id='ddlPreferCity" + r + "'><option value='0'>Select...</option></select></td><td><a href=javascript:void(0)  id='btnDelete' onclick='DeleteThis(this);'  class='btn btn-danger'>Delete</a></td></tr>");
           r=r+1;
            $('#MainTable tr:last').each(function () {
                            $(this).find('td:eq(1)').find('select').val(Dist);
                            $(this).find('td:eq(1)').find('select').chosen();
                            fillCity2($(this).find('td:eq(1)').find('select').attr('id'),Dist,City);
                          
                        });
            });
            });
            });

        },
        error: function () {
           // alert('Some error occured.');
        }
    });
}
}
 function RemoveClass(obj)
  {
  $(obj).removeClass('error');
  } 



