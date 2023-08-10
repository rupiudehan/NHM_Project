/// <reference path="../../PIMS/Service/JQry.asmx" />
/// <reference path="../../PIMS/Service/JQry.asmx" />
/// <reference path="../../webservices/MillerPerforma.asmx" />
var isEdit = "0";
$(document).ready(function () {
    $('#loading').ajaxStart(function () {
        $.showprogress();
    });
    $('#loading').ajaxStop(function () {
        $.hideprogress();
    });

    $("#txtGratiaDate").datepicker($.datepicker.regional["de"]).datepicker("option", {
        changeMonth: true,
        changeYear: true,
        yearRange: "-70:+0"
    });

    $("#txtOrderDate").datepicker($.datepicker.regional["de"]).datepicker("option", {
        changeMonth: true,
        changeYear: true,
        yearRange: "-70:+0"
    });

    $("#addNew").click(function () {
        $("#hdnGrantCode").val("0");
        $("#promotiondatatable").css("display", "none");
        $("#promotioncontent").css("display", "block");
        $("#addNew").hide();
        $("#editNew").show();
        var distID = $('#ContentPlaceHolder1_hdnDistId').val();
        $("#ContentPlaceHolder1_button1").hide();
        $('#ddldistrict option[value=' + distID + ']').attr("selected", true);
        $("#ddldistrict").val();
        $("#ddldistrict").trigger("liszt:updated");
        //$('#ddlCropYear').val(36);
		//$('#ddlCropYear').val(38);
		$('#ddlCropYear').val(40);
        $("#ddlCropYear").trigger("liszt:updated");
        $("#MillerPerformaId").val(0);
        BindCentre();
        BindMiller();
    });

    $("#editNew").click(function () {
        $("#hdnGrantCode").val("0");
        $("#promotiondatatable").css("display", "block");
        $("#promotioncontent").css("display", "none");
        $("#addNew").show();
        $("#editNew").hide();
        location.reload();
    });

    $('#ddldistrict').change(function () {
        //BindCentre();
        BindMiller();
    });
    $('#ddlCropYear').change(function () {
        BindMiller();
    });
    BindTable();
    BindDistrict();
    function BindDistrict() {
        $.ajax({
            type: 'Post',
            url: "../webservices/MillerPerforma.asmx/BindDistrict",
            contentType: "application/json;",
            dataType: "json",
            asyn: false,
            success: function (result) {
                $('#ddldistrict').find('option').remove();
                var strData = eval('(' + result.d + ')');
                $("#ddldistrict").append('<option value="0">-- SELECT --</option>');
                for (var i = 0; i <= strData.length - 1; i++) {
                    $("#ddldistrict").append($("<option></option>").val(strData[i].fanSerialCode).html(strData[i].fsDistrictName));
                }
                $("[id$=ddldistrict]").val();
                $('#ddldistrict').trigger("liszt:updated");
                BindMiller();
            }
        });
    }
    function BindCentre() {
        DistrictId = $("#ddldistrict").val();
        $.ajax({
            type: 'Post',
            url: "../webservices/MillerPerforma.asmx/BindCentre",
            contentType: "application/json;",
            dataType: "json",
            asyn: false,
            data: JSON.stringify({ DistrictId: DistrictId }),
            success: function (result) {
                $('#ddlCentre').find('option').remove();
                var strData = eval('(' + result.d + ')');
                $("#ddlCentre").append('<option value="0">-- SELECT --</option>');
                for (var i = 0; i <= strData.length - 1; i++) {
                    $("#ddlCentre").append($("<option></option>").val(strData[i].fanSerialCode).html(strData[i].fsCityName));
                }
                $("[id$=ddlCentre]").val();
                $('#ddlCentre').trigger("liszt:updated");
            }
        });
    }
    function BindMiller() {
        DistrictId = $('#ContentPlaceHolder1_hdnDistId').val();
        CentreId = $("#ddlCropYear").val();
        $.ajax({
            type: 'Post',
            url: "../webservices/MillerPerforma.asmx/BindMiller",
            contentType: "application/json;",
            dataType: "json",
            asyn: false,
            data: JSON.stringify({ DistrictId: DistrictId, CentreId: CentreId }),
            success: function (result) {
                $('#ddlMiller').find('option').remove();
                var strData = eval('(' + result.d + ')');
                $("#ddlMiller").append('<option value="0">-- SELECT --</option>');
                for (var i = 0; i <= strData.length - 1; i++) {
                    $("#ddlMiller").append($("<option></option>").val(strData[i].fanSerialCode).html(strData[i].fsCompanyName));
                }
                $("[id$=ddlMiller]").val();
                $('#ddlMiller').trigger("liszt:updated");
            }
        });
    }



    $('#SaveDetail').click(function () {
        if (isEdit == "0") {
        if($('#txtCibil').val() !="") {
                if ($('#txtCibil').val() != "0") {
                    if ($('#cibilUpload').val() == '') {
                        alert('Please Upload Cibil Documnet.');
                        return false;
                    }
                }
            }
            if ($('#ddlCCTV').val() == "1") {
                if ($('#CCTVUpload').val() == '') {
                    alert('Please Upload Photo proof of CCTV Document.');
                    return false;
                }
            }
            if ($('#ddlFire').val() == "1") {
                if ($('#FireUpload').val() == '') {
                    alert('Please Upload Photo proof of fire fighting Equipment Document.');
                    return false;
                }
            }
            if ($('#ddlAgreementExecuted').val() == "1") {
                if ($('#AgreementExecutedUpload').val() == '') {
                    alert('Please Upload Milling Agreement Document.');
                    return false;
                }
            }
            if ($('#ddllitigation').val() == "2") {
                if ($('#litigationUpload').val() == '') {
                    alert('Please Upload Litigation Document.');
                    return false;
                }
            }
            if ($('#ddlcheque').val() == "1") {
                if ($('#chequeofRs45lacUpload').val() == '') {
                    alert('Please Upload Copy of MICR cheque Document.');
                    return false;
                }
            }
            if ($('#ddlBankGurantee').val() == "1") {
                if ($('#BankGuranteeUpload').val() == '') {
                    alert('Please Upload Bank Gurantee Document.');
                    return false;
                }
            }
            if ($('#ddlmillermember').val() == "1") {
                if ($('#MillerMemberUpload').val() == '') {
                    alert('Please Upload Document.');
                    return false;
                }
            }
        } else {
            if (!$('#cibilUploadLink').is(':visible')) {
                if ($('#txtCibil').val() != "0") {
                    if ($('#cibilUpload').val() == '') {
                        alert('Please Upload Cibil Documnet.');
                        return false;
                    }
                }
            }
            if (!$('#CCTVUploadLink').is(':visible')) {
                if ($('#ddlCCTV').val() == "1") {
                    if ($('#CCTVUpload').val() == '') {
                        alert('Please Upload Photo proof of CCTV Document.');
                        return false;
                    }
                }
            } //
            // if (!$('#StockCertificateLink').is(':visible')) {
            //     if ($('#StockCertificateUpload').val() == '') {
            //         alert('Please Upload Stock Certificate Document.');
            //         return false;
            //     }
            // }
            if (!$('#FireUploadLink').is(':visible')) {
                if ($('#ddlFire').val() == "1") {
                    if ($('#FireUpload').val() == '') {
                        alert('Please Upload Photo proof of fire fighting Equipment Document.');
                        return false;
                    }
                }
            }
            if (!$('#AgreementExecutedUploadLink').is(':visible')) {
                if ($('#ddlAgreementExecuted').val() == "1") {
                    if ($('#AgreementExecutedUpload').val() == '') {
                        alert('Please Upload Milling Agreement Document.');
                        return false;
                    }
                }
            } if (!$('#litigationUploadLink').is(':visible')) {
                if ($('#ddllitigation').val() == "2") {
                    if ($('#litigationUpload').val() == '') {
                        alert('Please Upload Litigation Document.');
                        return false;
                    }
                }
            }
            if (!$('#BankGuranteeUploadLink').is(':visible')) {
                if ($('#ddlcheque').val() == "1") {
                    if ($('#chequeofRs45lacUpload').val() == '') {
                        alert('Please Upload Copy of MICR cheque Document.');
                        return false;
                    }
                }
            }
            if (!$('#BankGuranteeUploadLink').is(':visible')) {
                if ($('#ddlBankGurantee').val() == "1") {
                    if ($('#BankGuranteeUpload').val() == '') {
                        alert('Please Upload Bank Gurantee Document.');
                        return false;
                    }
                }
            }
            if (!$('#MillerMemberUploadLink').is(':visible')) {
                if ($('#ddlmillermember').val() == "1") {
                    if ($('#MillerMemberUpload').val() == '') {
                        alert('Please Upload Document.');
                        return false;
                    }
                }
            }
        }

        var count = 0;
        $(".required").each(function () {
            if ($(this).val() == "" || $(this).val() == "0" || $(this).val() == null) {
                $(this).addClass('error');
                count = 1;
            }
        });
        if ($('#hdnMillerPerformaCode').val() == 0) {
            IsMillerExsist();
        } else {
            Insert();
            
        }
    });

    function PreviewImage() {
        var fReader = new FileReader();
        fReader.readAsDataURL($("#fileInput")[0].files[0]);
        fReader.onload = function (fileEvent) {
            $("#imgEmployee").attr("src", fileEvent.target.result);
        };
    };

    function IsMillerExsist() {
        var DistrictId = $('#ddldistrict').val();
        var CropYear = $('#ddlCropYear').val();
        var MillerId = $('#ddlMiller').val();
        $.ajax({
            type: 'Post',
            url: "../webservices/MillerPerforma.asmx/IsMillerExsist",
            data: JSON.stringify({
                DistrictId: DistrictId, CropYear: CropYear, MillerId: MillerId
            }),
            contentType: "application/json;",
            dataType: "json",
            asyn: false,
            success: function (result) {
                var strData = result.d;
                if (strData == "exist") {
                    alert("Duplicate miller registration not allowed.");
                    return false;
                }
                if (strData == "notexist") {
                    Insert();
                }
            }
        });
    }


    function Insert() {
        $('#SaveDetail').hide();
        var countexp = 0;
        var DistrictId = $('#ddldistrict').val();
        var CentreId = $('#ddlCentre').val();
        var CropYear = $('#ddlCropYear').val();
        var MillerId = $('#ddlMiller').val();
        var StatusOfMill = $('#ddlStatusMiller').val();
        var FreeHold = $('#ddlFreehold').val();
        var SibilScore = 0; $('#txtCibil').val();
        if ($('#txtCibil').val() != '') {
            SibilScore = $('#txtCibil').val();
        }
        var SibilScoreDocument = $('#cibilUpload').val();
        var DryerInstalled = $('#ddlDryer').val();
        var SortexInstalled = $('#ddlSortex').val();
        var CCTVinstalled = $('#ddlCCTV').val();
        var CCTVinstalledDocument = $('#CCTVUpload').val();
        var FireFightingEquipmentInstalled = $('#ddlFire').val();
        var FireFightingEquipmentInstalledDocument = $('#FireUpload').val();
        var AllotedAgency = $('#ddlAgencies').val();
        var DateOfCompletionOfMilling = '01/01/1900';
        //var fDateOfCompletionOfMilling ='01/01/2018';
        if ($('#txtCompletionDate').val() != '') {
            DateOfCompletionOfMilling = $('#txtCompletionDate').val().replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$2/$1/$3");
        }
       
        var AllotedCapacity = 0; $('#txtAlloted').val();
        if ($('#txtAlloted').val() != '') {
            var AllotedCapacity = $('#txtAlloted').val();
        }
        var EntitlementPerCMP = 0.0; $('#txtEntitlement').val();
        if ($('#txtEntitlement').val() != '') {
            EntitlementPerCMP = $('#txtEntitlement').val();
        }
        var LandAvailablePerCMPpolicy = $('#ddlLand').val();
        var NumberOfUnitsInMillComplex = 0;
        if ($('#txtmillComplexUnits').val() != '') {
            NumberOfUnitsInMillComplex = $('#txtmillComplexUnits').val();
        }
        var InstalledOperationalMill = $('#ddloperationalpremises').val();
        var ElectricityBillByName = $('#txtElectricity').val();
        var ElectricityBillByNameDocument = $('#ElectricityUpload').val();
        var AgreementExecuted = $('#ddlAgreementExecuted').val();
        var AgreementExecutedDocument = $('#AgreementExecutedUpload').val();
        var OrignalVerifyByDM = $('#ddlOrignaldocumentverified').val();
        var MillPremisesLitigationDisputes = $('#ddllitigation').val();
        var MillPremisesLitigationDisputesDocument = $('#litigationUpload').val();
        var MillerAvailLimitCCLloanOfPSWC = $('#ddlLimit').val();

        var PeriodOfLease = 0;
        if ($('#txtLeasePeriod').val() != '') {
            PeriodOfLease = $('#txtLeasePeriod').val();
        }
        var IsLeaseRegistration1908Act = $('#ddlLeaseRegistration').val();
        var IsLeaseRegistration1908ActDocument = $('#LeaseRegistrationUpload').val();
        var IsLeaseInRevenueRecord = $('#ddlLeaseentered').val();
        var UndertakingFromLesse = $('#ddlLeaseUndertaking').val();
        var GranteeOfLessorOnStamp = $('#ddllessesGurantee').val();
        var LienOfOwner = $('#ddlLien').val();

        var RMhypothecatedLien = $('#ddlhypothecated').val();
        var LienInRevenueRecord = $('#txtLienObtained').val();
        var WheatherChequeByMiller = $('#ddlcheque').val();
        var WheatherChequeByMillerDocument = $('#chequeofRs45lacUpload').val();
        var WheatherBankGurantee = $('#ddlBankGurantee').val();
        var WheatherBankGuranteeDocument = $('#BankGuranteeUpload').val();
        var WheatherMillerFamilyIsInBussinessCommission = $('#ddlmillermember').val();
        var WheatherMillerFamilyIsInBussinessCommissionDocument = $('#MillerMemberUpload').val();

        var WheatherMillerListSentToBanks = $('#ddlleadingBanks').val();

        var PANcardDocument = $('#PANcardUpload').val();
        var PhotoIDDocument = $('#PhotoIDUpload').val();
        var ShellerAttotmentDocument = $('#ShellerAttotmentUpload').val();
        var ITRLastYearDocument = $('#ITRLastYearUpload').val();
        var PPCBConsentDocument = $('#PPCBConsentUpload').val();
        var PunjabMandiDocument = $('#PunjabMandiUpload').val();
        var BusinessEntityDocument = $('#BusinessEntityUpload').val();
        var PictorialChartsDocument = $('#PictorialChartsUpload').val();

        var StockCertificateDocument = $('#StockCertificateUpload').val();

        var MillerPerformaId = $('#hdnMillerPerformaCode').val();
        var SMEScore = $('#txtSME').val();
        if($('#txtSME').val()==''){
                SMEScore=0;
        }
        var StorageCompletionDate ='01/01/1900';
        if ($('#txtStorageCompletionDate').val() != '') {
            StorageCompletionDate = $('#txtStorageCompletionDate').val().replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$2/$1/$3");
        }
        console.log(StorageCompletionDate);
        var cibilUpload = '';
        var CCTVUpload = '';
        var FireUpload = '';
        var ElectricityUpload = '';
        var AgreementExecutedUpload = '';
        var litigationUpload = '';
        var LeaseRegistrationUpload = '';
        var chequeofRs45lacUpload = '';
        var BankGuranteeUpload = '';
        var MillerMemberUpload = '';
        var PANcardUpload = '';
        var PhotoIDUpload = '';
        var ShellerAttotmentUpload = '';
        var ITRLastYearUpload = '';
        var PPCBConsentUpload = '';
        var PunjabMandiUpload = '';
        var BusinessEntityUpload = '';
        var PictorialChartsUpload = '';


        if ($('#cibilUpload').val() != "") {
            var fname = $('#cibilUpload').val();
            var ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            cibilUpload = 'cibilUpload_' + '_' + DistrictId + '_' + MillerId + '_' + CropYear + '.' + ext;
            ajaxFileUpload('cibilUpload', cibilUpload);
        }
        if ($('#CCTVUpload').val() != "") {
            var fname = $('#CCTVUpload').val();
            var ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            CCTVUpload = 'CCTVUpload_' + '_' + DistrictId + '_' + MillerId + '_' + CropYear + '.' + ext;
            ajaxFileUpload('CCTVUpload', CCTVUpload);
        }
        if ($('#FireUpload').val() != "") {
            var fname = $('#FireUpload').val();
            var ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            FireUpload = 'FireUpload_' + '_' + DistrictId + '_' + MillerId + '_' + CropYear + '.' + ext;
            ajaxFileUpload('FireUpload', FireUpload);
        }
        if ($('#ElectricityUpload').val() != "") {
            var fname = $('#ElectricityUpload').val();
            var ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            ElectricityUpload = 'ElectricityUpload_' + '_' + DistrictId + '_' + MillerId + '_' + CropYear + '.' + ext;
            ajaxFileUpload('ElectricityUpload', ElectricityUpload);
        }
        if ($('#AgreementExecutedUpload').val() != "") {
            var fname = $('#AgreementExecutedUpload').val();
            var ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            AgreementExecutedUpload = 'AgreementExecutedUpload_' + '_' + DistrictId + '_' + MillerId + '_' + CropYear + '.' + ext;
            ajaxFileUpload('AgreementExecutedUpload', AgreementExecutedUpload);
        }
        if ($('#litigationUpload').val() != "") {
            var fname = $('#litigationUpload').val();
            var ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            litigationUpload = 'litigationUpload_' + '_' + DistrictId + '_' + MillerId + '_' + CropYear + '.' + ext;
            ajaxFileUpload('litigationUpload', litigationUpload);
        }
        if ($('#LeaseRegistrationUpload').val() != "") {
            var fname = $('#LeaseRegistrationUpload').val();
            var ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            LeaseRegistrationUpload = 'LeaseRegistrationUpload_' + '_' + DistrictId + '_' + MillerId + '_' + CropYear + '.' + ext;
            ajaxFileUpload('LeaseRegistrationUpload', LeaseRegistrationUpload);
        }
        if ($('#chequeofRs45lacUpload').val() != "") {
            var fname = $('#chequeofRs45lacUpload').val();
            var ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            chequeofRs45lacUpload = 'chequeofRs45lacUpload_' + '_' + DistrictId + '_' + MillerId + '_' + CropYear + '.' + ext;
            ajaxFileUpload('chequeofRs45lacUpload', chequeofRs45lacUpload);
        }
        if ($('#BankGuranteeUpload').val() != "") {
            var fname = $('#BankGuranteeUpload').val();
            var ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            BankGuranteeUpload = 'BankGuranteeUpload_' + '_' + DistrictId + '_' + MillerId + '_' + CropYear + '.' + ext;
            ajaxFileUpload('BankGuranteeUpload', BankGuranteeUpload);
        }
        if ($('#MillerMemberUpload').val() != "") {
            var fname = $('#MillerMemberUpload').val();
            var ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            MillerMemberUpload = 'MillerMemberUpload_' + '_' + DistrictId + '_' + MillerId + '_' + CropYear + '.' + ext;
            ajaxFileUpload('MillerMemberUpload', MillerMemberUpload);
        }
        if ($('#PANcardUpload').val() != "") {
            var fname = $('#PANcardUpload').val();
            var ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            PANcardUpload = 'PANcardUpload_' + '_' + DistrictId + '_' + MillerId + '_' + CropYear + '.' + ext;
            ajaxFileUpload('PANcardUpload', PANcardUpload);
        }
        if ($('#PhotoIDUpload').val() != "") {
            var fname = $('#PhotoIDUpload').val();
            var ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            PhotoIDUpload = 'PhotoIDUpload_' + '_' + DistrictId + '_' + MillerId + '_' + CropYear + '.' + ext;
            ajaxFileUpload('PhotoIDUpload', PhotoIDUpload);
        }
        if ($('#ShellerAttotmentUpload').val() != "") {
            var fname = $('#ShellerAttotmentUpload').val();
            var ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            ShellerAttotmentUpload = 'ShellerAttotmentUpload_' + '_' + DistrictId + '_' + MillerId + '_' + CropYear + '.' + ext;
            ajaxFileUpload('ShellerAttotmentUpload', ShellerAttotmentUpload);
        }
        if ($('#ITRLastYearUpload').val() != "") {
            var fname = $('#ITRLastYearUpload').val();
            var ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            ITRLastYearUpload = 'ITRLastYearUpload_' + '_' + DistrictId + '_' + MillerId + '_' + CropYear + '.' + ext;
            ajaxFileUpload('ITRLastYearUpload', ITRLastYearUpload);
        }
        if ($('#PPCBConsentUpload').val() != "") {
            var fname = $('#PPCBConsentUpload').val();
            var ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            PPCBConsentUpload = 'PPCBConsentUpload_' + '_' + DistrictId + '_' + MillerId + '_' + CropYear + '.' + ext;
            ajaxFileUpload('PPCBConsentUpload', PPCBConsentUpload);
        }
        if ($('#PunjabMandiUpload').val() != "") {
            var fname = $('#PunjabMandiUpload').val();
            var ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            PunjabMandiUpload = 'PunjabMandiUpload_' + '_' + DistrictId + '_' + MillerId + '_' + CropYear + '.' + ext;
            ajaxFileUpload('PunjabMandiUpload', PunjabMandiUpload);
        }
        if ($('#BusinessEntityUpload').val() != "") {
            var fname = $('#BusinessEntityUpload').val();
            var ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            BusinessEntityUpload = 'BusinessEntityUpload_' + '_' + DistrictId + '_' + MillerId + '_' + CropYear + '.' + ext;
            ajaxFileUpload('BusinessEntityUpload', BusinessEntityUpload);
        }
        if ($('#PictorialChartsUpload').val() != "") {
            var fname = $('#PictorialChartsUpload').val();
            var ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            PictorialChartsUpload = 'PictorialChartsUpload_' + '_' + DistrictId + '_' + MillerId + '_' + CropYear +'.'+ ext;
            ajaxFileUpload('PictorialChartsUpload', PictorialChartsUpload);
        }

        if ($('#StockCertificateUpload').val() != "") {
            var fname = $('#StockCertificateUpload').val();
            var ext = fname.slice((fname.lastIndexOf(".") - 1 >>> 0) + 2);
            StockCertificateDocument = 'StockCertificateUpload' + '_' + DistrictId + '_' + MillerId + '_' + CropYear + '.' + ext;
            ajaxFileUpload('StockCertificateUpload', StockCertificateDocument);
        }

        $.ajax({
            type: 'Post',
            url: "../webservices/MillerPerforma.asmx/Insert",
            data: JSON.stringify({
                DistrictId: DistrictId,
                CentreId: CentreId,
                CropYear: CropYear,
                MillerId: MillerId,
                StatusOfMill: StatusOfMill,
                FreeHold: FreeHold,
                SibilScore: SibilScore,
                SibilScoreDocument: cibilUpload,
                DryerInstalled: DryerInstalled,
                SortexInstalled: SortexInstalled,
                CCTVinstalled: CCTVinstalled,
                CCTVinstalledDocument: CCTVUpload,
                FireFightingEquipmentInstalled: FireFightingEquipmentInstalled,
                FireFightingEquipmentInstalledDocument: FireUpload,
                AllotedAgency: AllotedAgency,
                DateOfCompletionOfMilling: DateOfCompletionOfMilling,
                AllotedCapacity: AllotedCapacity,
                EntitlementPerCMP: EntitlementPerCMP,
                LandAvailablePerCMPpolicy: LandAvailablePerCMPpolicy,
                NumberOfUnitsInMillComplex: NumberOfUnitsInMillComplex,
                InstalledOperationalMill: InstalledOperationalMill,
                ElectricityBillByName: ElectricityBillByName,
                ElectricityBillByNameDocument: ElectricityUpload,
                AgreementExecuted: AgreementExecuted,
                AgreementExecutedDocument: AgreementExecutedUpload,
                OrignalVerifyByDM: OrignalVerifyByDM,
                MillPremisesLitigationDisputes: MillPremisesLitigationDisputes,
                MillPremisesLitigationDisputesDocument: litigationUpload,
                MillerAvailLimitCCLloanOfPSWC: MillerAvailLimitCCLloanOfPSWC,
                PeriodOfLease: PeriodOfLease,
                IsLeaseRegistration1908Act: IsLeaseRegistration1908Act,
                IsLeaseRegistration1908ActDocument: LeaseRegistrationUpload,
                IsLeaseInRevenueRecord: IsLeaseInRevenueRecord,
                UndertakingFromLesse: UndertakingFromLesse,
                GranteeOfLessorOnStamp: GranteeOfLessorOnStamp,
                LienOfOwner: LienOfOwner,
                RMhypothecatedLien: RMhypothecatedLien,
                LienInRevenueRecord: LienInRevenueRecord,
                WheatherChequeByMiller: WheatherChequeByMiller,
                WheatherChequeByMillerDocument: chequeofRs45lacUpload,
                WheatherBankGurantee: WheatherBankGurantee,
                WheatherBankGuranteeDocument: BankGuranteeUpload,
                WheatherMillerFamilyIsInBussinessCommission: WheatherMillerFamilyIsInBussinessCommission,
                WheatherMillerFamilyIsInBussinessCommissionDocument: MillerMemberUpload,
                WheatherMillerListSentToBanks: WheatherMillerListSentToBanks,
                PANcardDocument: PANcardUpload,
                PhotoIDDocument: PhotoIDUpload,
                ShellerAttotmentDocument: ShellerAttotmentUpload,
                ITRLastYearDocument: ITRLastYearUpload,
                PPCBConsentDocument: PPCBConsentUpload,
                PunjabMandiDocument: PunjabMandiUpload,
                BusinessEntityDocument: BusinessEntityUpload,
                PictorialChartsDocument: PictorialChartsUpload,
                MillerPerformaId: MillerPerformaId,
                SMEScore: SMEScore,
                StorageCompletionDate:StorageCompletionDate,
                StockCertificate: StockCertificateDocument
            }),
            contentType: "application/json;",
            dataType: "json",
            asyn: false,
            success: function (result) {
                //debugger;
                var strData = result.d;
                if (strData == "isExist") {
                    alert("Duplicate miller registration not allowed.");
                    return false;
                }
                else {
                    alert("Record Saved Sucessfully");
                    if ($('#MillerPerformaId').val() == "") {
                        $('#MillerPerformaId').val(0);
                        $('#hdnMillerPerformaCode').val(strData);
                    }
                }
                //BindTable();
                //AllClearTextBox();                
            }
        });
    }

    function ajaxFileUpload(obj, formno) {
        var val = formno.replace(/\.[^/.]+$/, "");
        $.ajaxFileUpload({
            url: '../PIMS/Service/JQry.asmx/Upload',
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


    function BindTable() {
        DistrictId = $("#ContentPlaceHolder1_hdnDistId").val();
        $.ajax({
            type: 'Post',
            url: '../webservices/MillerPerforma.asmx/BindTable',
            contentType: "application/json;",
            dataType: "json",
            data: JSON.stringify({ DistId: DistrictId }),
            success: function (result) {
                $('#dvContent').dataTable().fnDestroy();
                $('#tblbody').html(result.d);
                $("#dvContent").dataTable({ "iDisplayLength": 10, "sPaginationType": "full_numbers", "bLengthChange": true, "bFilter": true, "bInfo": true, "bPaginate": true, "aoColumns": [0, 1, 2, 3, 4, 5, { "bSortable": false }] });
            }
        });
    }
});
function EditBindCentre(id) {
    DistrictId = $("#ddldistrict").val();
    $.ajax({
        type: 'Post',
        url: "../webservices/MillerPerforma.asmx/BindCentre",
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        data: JSON.stringify({ DistrictId: DistrictId }),
        success: function (result) {
            $('#ddlCentre').find('option').remove();
            var strData = eval('(' + result.d + ')');
            $("#ddlCentre").append('<option value="0">-- SELECT --</option>');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("#ddlCentre").append($("<option></option>").val(strData[i].fanSerialCode).html(strData[i].fsCityName));
            }
            $("[id$=ddlCentre]").val(id);
            $('#ddlCentre').trigger("liszt:updated");
        }
    });
}
function EditBindMiller(distId, centerID, millerID) {
    DistrictId = $("#ddldistrict").val();
    CentreId = $("#ddlCropYear").val();
    $.ajax({
        type: 'Post',
        url: "../webservices/MillerPerforma.asmx/BindMiller",
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        data: JSON.stringify({ DistrictId: distId, CentreId: centerID }),
        success: function (result) {
            $('#ddlMiller').find('option').remove();
            var strData = eval('(' + result.d + ')');
            $("#ddlMiller").append('<option value="0">-- SELECT --</option>');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("#ddlMiller").append($("<option></option>").val(strData[i].fanSerialCode).html(strData[i].fsCompanyName));
            }
            $("[id$=ddlMiller]").val(millerID);
            $('#ddlMiller').trigger("liszt:updated");
        }
    });
}

function convertDate(str) {
    var mnths = {
        Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
        Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
    },
    date = str.split(" ");

    return [date[2], mnths[date[1]], date[3], ].join("/");
}
var CenterID = 0;
function Edit(MillerPerformaId) {
    isEdit = "1";
    $("#promotiondatatable").css("display", "none");
    $("#promotioncontent").css("display", "block");
    $("#addNew").hide();
    $("#editNew").show();
    var MillerPerformaId = MillerPerformaId;
    $('#hdnMillerPerformaCode').val(MillerPerformaId);
    $.ajax({
        type: 'Post',
        url: '../webservices/MillerPerforma.asmx/BindDataById',
        contentType: "application/json;",
        dataType: "json",
        data: JSON.stringify({ MillerPerformaId: MillerPerformaId }),
        success: function (result) {
            var strdata = eval('(' + result.d + ')');

            $('#ddldistrict').val(strdata[0].DistrictId);
            $("#ddldistrict").trigger("liszt:updated");
            CenterID = strdata[0].CentreId;

            EditBindCentre(CenterID);
            //EditBindMiller(strdata[0].DistrictId, 36, strdata[0].MillerId);
			EditBindMiller(strdata[0].DistrictId, 40, strdata[0].MillerId);

            //$('#ddlCropYear').val(36);
			$('#ddlCropYear').val(40);
            $("#ddlCropYear").trigger("liszt:updated");

            $('#ddlFreehold').val(strdata[0].FreeHold);
            $("#ddlFreehold").trigger("liszt:updated");

            $('#ddlStatusMiller').val(strdata[0].StatusOfMill);
            $("#ddlStatusMiller").trigger("liszt:updated");

            $('#txtCibil').val(strdata[0].SibilScore);

            $('#cibilUploadLink').attr("href", "../PIMS/Service/MillerUploads/" + strdata[0].SibilScoreDocument);
            $('#ddlDryer').val(strdata[0].DryerInstalled);
            $("#ddlDryer").trigger("liszt:updated");

            $('#ddlSortex').val(strdata[0].SortexInstalled);
            $('#ddlCCTV').val(strdata[0].CCTVinstalled);
            $('#CCTVUploadLink').attr("href", "../PIMS/Service/MillerUploads/" + strdata[0].CCTVinstalledDocument);
            $('#ddlFire').val(strdata[0].FireFightingEquipmentInstalled);
            $('#FireUploadLink').attr("href", "../PIMS/Service/MillerUploads/" + strdata[0].FireFightingEquipmentInstalledDocument);
            $('#ddlAgencies').val(strdata[0].AllotedAgency);
            $('#txtCompletionDate').val(strdata[0].DateOfCompletionOfMilling);
            $('#txtAlloted').val(strdata[0].AllotedCapacity);
            $('#txtEntitlement').val(strdata[0].EntitlementPerCMP);
            $('#ddlLand').val(strdata[0].LandAvailablePerCMPpolicy);
            $('#txtmillComplexUnits').val(strdata[0].NumberOfUnitsInMillComplex);
            $('#ddloperationalpremises').val(strdata[0].InstalledOperationalMill);
            $('#txtElectricity').val(strdata[0].ElectricityBillByName);
            $('#ElectricityUploadLink').attr("href", "../PIMS/Service/MillerUploads/" + strdata[0].ElectricityBillByNameDocument);

            $('#ddlAgreementExecuted').val(strdata[0].AgreementExecuted);
            $('#AgreementExecutedUploadLink').attr("href", "../PIMS/Service/MillerUploads/" + strdata[0].AgreementExecutedDocument);
            $('#ddlOrignaldocumentverified').val(strdata[0].OrignalVerifyByDM);
            $('#ddllitigation').val(strdata[0].MillPremisesLitigationDisputes);
            $('#litigationUploadLink').attr("href", "../PIMS/Service/MillerUploads/" + strdata[0].MillPremisesLitigationDisputesDocument);

            $('#ddlLimit').val(strdata[0].MillerAvailLimitCCLloanOfPSWC);
            $('#txtLeasePeriod').val(strdata[0].PeriodOfLease);
            $('#ddlLeaseRegistration').val(strdata[0].IsLeaseRegistration1908Act);

            $('#LeaseRegistrationUploadLink').attr("href", "../PIMS/Service/MillerUploads/" + strdata[0].IsLeaseRegistration1908ActDocument);
            $('#ddlLeaseentered').val(strdata[0].IsLeaseInRevenueRecord);
            $('#ddlLeaseUndertaking').val(strdata[0].UndertakingFromLesse);
            $('#ddllessesGurantee').val(strdata[0].GranteeOfLessorOnStamp);
            $('#ddlLien').val(strdata[0].LienOfOwner);
            $('#ddlhypothecated').val(strdata[0].RMhypothecatedLien);
            $('#txtLienObtained').val(strdata[0].LienInRevenueRecord);
            $('#ddlcheque').val(strdata[0].WheatherChequeByMiller);
            $('#chequeofRs45lacUploadLink').attr("href", "../PIMS/Service/MillerUploads/" + strdata[0].WheatherChequeByMillerDocument);
            $('#ddlBankGurantee').val(strdata[0].WheatherBankGurantee);
            $('#BankGuranteeUploadLink').attr("href", "../PIMS/Service/MillerUploads/" + strdata[0].WheatherBankGuranteeDocument);
            $('#ddlmillermember').val(strdata[0].WheatherMillerFamilyIsInBussinessCommission);
            $('#MillerMemberUploadLink').attr("href", "../PIMS/Service/MillerUploads/" + strdata[0].WheatherMillerFamilyIsInBussinessCommissionDocument);
            $('#ddlleadingBanks').val(strdata[0].WheatherMillerListSentToBanks);

            $('#PANcardUploadLink').attr("href", "../PIMS/Service/MillerUploads/" + strdata[0].PANcardDocument);
            $('#PhotoIDUploadLink').attr("href", "../PIMS/Service/MillerUploads/" + strdata[0].PhotoIDDocument);
            $('#ShellerAttotmentUploadLink').attr("href", "../PIMS/Service/MillerUploads/" + strdata[0].ShellerAttotmentDocument);
            $('#ITRLastYearUploadLink').attr("href", "../PIMS/Service/MillerUploads/" + strdata[0].ITRLastYearDocument);
            $('#PPCBConsentUploadLink').attr("href", "../PIMS/Service/MillerUploads/" + strdata[0].PPCBConsentDocument);
            $('#PunjabMandiUploadLink').attr("href", "../PIMS/Service/MillerUploads/" + strdata[0].PunjabMandiDocument);
            $('#BusinessEntityUploadLink').attr("href", "../PIMS/Service/MillerUploads/" + strdata[0].BusinessEntityDocument);
            $('#PictorialChartsUploadLink').attr("href", "../PIMS/Service/MillerUploads/" + strdata[0].PictorialChartsDocument);
			$('#StcoCertificateLink').attr("href", "../PIMS/Service/MillerUploads/" + strdata[0].StockCertificate);
            $('#txtSME').val(strdata[0].SMEScore);
            $('#txtStorageCompletionDate').val(strdata[0].StorageCompletionDate);

            //$("#imgEmployee").attr("src", "Service/Pics/Employee/" + strdata[i].DocumentAttached.toString());
            //$("#imgEmployee").attr("value", strdata[i].DocumentAttached);
            $('.documentShowHide').show();
            $("a[href='../PIMS/Service/MillerUploads/']").hide();
            $("a[href$='undefined']").hide();
        },
        error: function () {
            // alert('Some error occured.');
        }
    });
    $('#ddlCentre option[value=' + CenterID + ']').attr("selected", true);
}

