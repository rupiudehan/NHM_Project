/// <reference path="../../PIMS/Service/FcrInput.asmx" />
/// <reference path="../../PIMS/Service/FcrInput.asmx" />
$(document).ready(function () {
    var d = new Date();
    var day = d.getDate();
    if (day <= 15) {
        $("#ddl_fcr_period").val(2);
    }
    else {
        $("#ddl_fcr_period").val(1);
    }
    $('#loading').ajaxStart(function () {
        $.showprogress();
    });
    $('#loading').ajaxStop(function () {
        $.hideprogress();
    });
    $("#txtWeightA").keyup(function () { BindTotal(); });
    $("#txtWeightB").keyup(function () { BindTotal(); });
    $("#txtWeightC").keyup(function () { BindTotal(); });
    $("#txtWeightD").keyup(function () { BindTotal(); });
    //$("#txtWeightA").keyup(function () { BindNoOfBagsA(); });
    //$("#txtWeightB").keyup(function () { BindNoOfBagsB(); });
    //$("#txtWeightC").keyup(function () { BindNoOfBagsC(); });
    //$("#txtWeightD").keyup(function () { BindNoOfBagsD(); });


    $("#txtWeightClear").keyup(function () { BindTotalSatisfactory(); });
    $("#txtWeightFew").keyup(function () { BindFewHeavySatisfactory(); });
    $("#txtWeightHeavy").keyup(function () { BindTotalSatisfactory(); });
    $("#txtWeightFew").keyup(function () { BindTotalSatisfactory(); });
    $("#txtWeightHeavy").keyup(function () { BindFewHeavySatisfactory(); });
    //$("#txtClearFumigated").keyup(function () { BindTotalFumigated(); });
    //$("#txtFewFumigated").keyup(function () { BindTotalFumigated(); });
    //$("#txtHeavyFumigated").keyup(function () { BindTotalFumigated(); });
    //$("#txtWeightClear").keyup(function () { BindNoOfBagsClear(); });
    //$("#txtWeightFew").keyup(function () { BindNoOfBagsFew(); });
    //$("#txtWeightHeavy").keyup(function () { BindNoOfBagsHeavy(); });

    $("#isStockNill").change(function () {
        if (this.checked) {
            $("#stocknill").css("display", "none");
            $(".required").removeClass("required");
            $('input:text').each(function () {
                $(this).val('0'); // or this.value = $(this).attr('original');
            });
        } else {
            $("#stocknill").css("display", "block");
        }
    });
    $("#addNew").click(function () {
        $("#hdnFCRCode").val("0");
        $("#promotiondatatable").css("display", "none");
        $("#promotioncontent").css("display", "block");
        $("#addNew").hide();
        $("#editNew").show();
    });

    $("#editNew").click(function () {
        $("#hdnFCRCode").val("0");
        $("#promotiondatatable").css("display", "block");
        $("#promotioncontent").css("display", "none");
        $("#addNew").show();
        $("#editNew").hide();
    });

    $("#btnCloseShort").click(function () {
        $("#ddShortWeightReason").val(0);
        $("#txtShortWeightremarks").val("");
        $("#txtShortWeight").val();
        $('#myModal').modal('hide');
        return true;
    });

    $("#dataShow").click(function () {
        if ($("#ddl_fcr_period").val() == 0) {
            alert("Please select health check period");
            isFormValid = false;
        }
        else if ($("#ddlComplex").val() == 0) {
            alert("Please select complex name.");
            isFormValid = false;
        }
            //else if ($("#ddlGodown").val() == 0) {
            //    alert("Please select godown plinth name/number.");
            //    isFormValid = false;
            //}
        else if ($("#ddlGodownType").val() == 0) {
            alert("Please select godown type.");
            isFormValid = false;
        }
        else if ($("#ddlCropYear").val() == 0) {
            alert("Please select crop year.");
            isFormValid = false;
        }
            //else if ($("#ddlStorage").val() == 0) {
            //    alert("Please select year of storage.");
            //    isFormValid = false;
            //}
        else if ($("#ddlAgency").val() == 0) {
            alert("Please select agency.");
            isFormValid = false;
        }
        else if ($("#ddlCommodityId").val() == 0) {
            alert("Please select commodity.");
            isFormValid = false;
        }
        else {
            GetLastFNData();
        }
    });
    $("#btnSaveShort").click(function () {
        if ($("#ddShortWeightReason").val() == 0) {
            alert("Please select short weight reason");
            return false;
        }
        else {
            $('#myModal').modal('hide');
            Insert();
            return true;
        }
    });
    $("#save").click(function () {
        //var tmp = [];
        //$('#checkBox').find('input[type="checkbox"]:checked').each(function () {
        //    tmp.push($(this).val());
        //    //this is the current checkbox
        //});
        //$("#chechboxHidden").val(tmp);
        var isFormValid = true;
        TotalStockCurrent = $("#txtTotalStock").val();

        if (TotalStockCurrent != "" && !isNaN(TotalStockCurrent)) {
            TotalStockCurrent = parseFloat(TotalStockCurrent);
        }
        TotalStockPrevious = $("#txtTotalStockPrevious").val();
        if (TotalStockPrevious != "" && !isNaN(TotalStockPrevious)) {
            TotalStockPrevious = parseFloat(TotalStockPrevious);
        }

        $(".required").each(function () {

            if (isFormValid == true) {
                if ($.trim($(this).val()).length == 0) {
                    $(this).addClass("highlight");
                    alert("Please fill in all the required fields (indicated by *)");
                    isFormValid = false;

                }
            }
        });
        if (!isFormValid)
            return isFormValid;
        if ($("#ddl_fcr_period").val() == 0) {
            alert("Please select health check period");
            isFormValid = false;
        }
        else if ($("#ddlComplex").val() == 0) {
            alert("Please select complex name.");
            isFormValid = false;
        }
            //else if ($("#ddlGodown").val() == 0) {
            //    alert("Please select godown plinth name/number.");
            //    isFormValid = false;
            //}
        else if ($("#ddlGodownType").val() == 0) {
            alert("Please select godown type.");
            isFormValid = false;
        }
        else if ($("#ddlCropYear").val() == 0) {
            alert("Please select crop year.");
            isFormValid = false;
        }
            //else if ($("#ddlStorage").val() == 0) {
            //    alert("Please select year of storage.");
            //    isFormValid = false;
            //}

        else if ($("#ddlAgency").val() == 0) {
            alert("Please select agency.");
            isFormValid = false;
        }
        else if ($("#ddlCommodityId").val() == 0) {
            alert("Please select commodity.");
            isFormValid = false;
        }
        else if ($("#txtTotalStock").val() != $("#txtTotalSatisfactory").val()) {
            alert("Total value of stock must be equal to total satisfactory stock.");
            isFormValid = false;
        }
        else if ($("#txtFewFumigatedStockInLF").val() > $("#txtFewInfestedStockInLF").val()) {
            alert("Few fumigated stock cant be grater then Few infested stock.");
            isFormValid = false;
        }
        else if ($("#txtHeavyFumigatedInLF").val() > $("#txtHeavyInfestedStockInLF").val()) {
            alert("Heavy fumigated stock cant be grater then Heavy infested stock.");
            isFormValid = false;
        }
            //else if (parseFloat($("#txtWeightClear").val()) < parseFloat($("#txtClearFumigated").val())) {
            //    alert("Clear stock must be greater or equal to the fumigated clear stock.");
            //    isFormValid = false;
            //}

            //else if (parseFloat($("#txtWeightFew").val()) < parseFloat($("#txtFewFumigated").val())) {
            //    alert("Few stock must be greater or equal to the fumigated Few stock.");
            //    isFormValid = false;
            //}
            //else if (parseFloat($("#txtWeightHeavy").val()) < parseFloat($("#txtHeavyFumigated").val())) {
            //    alert("Heavy stock must be greater or equal to the fumigated Heavy stock.");
            //    isFormValid = false;
            //}
            //else if (parseFloat(parseFloat($("#txtMarkedForSprayWithMatalthionDuringFN").val() * 100) / $("#txtTotalSatisfactory").val()) > 20.00 && $("#ddlGodownType").val() == "1") {
            //    alert("Treatment of malathion in covered can't be greater then 20% of total stock.");
            //    isFormValid = false;
            //}
            //else if (parseFloat(parseFloat($("#txtMarkedForSprayWithMatalthionDuringFN").val() * 100) / $("#txtTotalSatisfactory").val()) > 100.00 && $("#ddlGodownType").val() == "2") {
            //    alert("Treatment of malathion in open can't be greater then 100% of total stock.");
            //    isFormValid = false;
            //}
            //else if (parseFloat(parseFloat($("#txtMarkedForSprayWithDDVPDuringFN").val() * 100) / $("#txtTotalSatisfactory").val()) > 80.00 && $("#ddlGodownType").val() == "1") {
            //    alert("Treatment of DDVP in covered can't be greater then 20% of total stock.");
            //    isFormValid = false;
            //}
            //else if (parseFloat(parseFloat($("#txtMarkedForSprayWithALPDuringFN").val() * 100) / $("#txtTotalSatisfactory").val()) > 20.00 && $("#ddlGodownType").val() == "1") {
            //    alert("Treatment of phosphate in open can't be greater then 100% of total stock.");
            //    isFormValid = false;
            //}
            //else if (parseFloat(parseFloat($("#txtMarkedForSprayWithALPDuringFNHeavy").val() * 100) / $("#txtTotalSatisfactory").val()) > 20.00 && $("#ddlGodownType").val() == "1") {
            //    alert("Treatment of phosphate in open can't be greater then 100% of total stock.");
            //    isFormValid = false;
            //}
        else {

            if (TotalStockCurrent < TotalStockPrevious) {
                var r = confirm("Stock total weight is less then total previous  fortnight. Are you sure you want to update with new changes?");
                if (r == true) {
                    $('#myModal').modal('show');
                } else {
                    $('#myModal').modal('hide');
                }
            }
            else {
                Insert();
            }

            $(this).removeClass("highlight");
        }
        if (!isFormValid)
            return isFormValid;
    });

    BindTable();
    BindCheckBoxTable();
    getallAgency(0);
    getComplexType(0);
    getallComudity(0);
    $('#ddlComplex').change(function () {
        BindGodown(0);
    });
    var count = 0;
    $('#SaveDetail').click(function () {

        $(".required").each(function () {
            if ($(this).val() == "" || $(this).val() == "0" || $(this).val() == null) {
                $(this).addClass('error');
                count = 1;
            }
        });
        if (count >= 1) {
            $("#promotiondatatable").css("display", "none");
            $("#promotioncontent").css("display", "block");
            $("#addNew").hide();
            $("#editNew").show();
            alert("Please fill all the required field marked with *.")
            return false;
        }
        Insert();
    });
});

function BindNoOfBagsClear() {
    var weightClear = $("#txtWeightClear").val();

    var noOfBags = 0;

    if (weightClear != "" && !isNaN(weightClear)) {
        noOfBags = parseFloat(weightClear * 20.00);
    }

    if (noOfBags == "NaN" || noOfBags == "") {
        $("#txtBagsClear").val('0');
    }
    else {
        $("#txtBagsClear").val(noOfBags);
    }
};

function BindNoOfBagsFew() {
    var weightFew = $("#txtWeightFew").val();

    var noOfBags = 0;

    if (weightFew != "" && !isNaN(weightFew)) {
        noOfBags = parseFloat(weightFew * 20.00);
    }

    if (noOfBags == "NaN" || noOfBags == "") {
        $("#txtBagsFew").val('0');
    }
    else {
        $("#txtBagsFew").val(noOfBags);
    }
};

function BindNoOfBagsHeavy() {
    var weightHeavy = $("#txtWeightHeavy").val();

    var noOfBags = 0;

    if (weightHeavy != "" && !isNaN(weightHeavy)) {
        noOfBags = parseFloat(weightHeavy * 20.00);
    }

    if (noOfBags == "NaN" || noOfBags == "") {
        $("#txtBagsHeavy").val('0');
    }
    else {
        $("#txtBagsHeavy").val(noOfBags);
    }
};

function BindNoOfBagsA() {
    var weightA = $("#txtWeightA").val();

    var noOfBags = 0;

    if (weightA != "" && !isNaN(weightA)) {
        noOfBags = parseFloat(weightA * 20.00);
    }

    if (noOfBags == "NaN" || noOfBags == "") {
        $("#txtBagsA").val('0');
    }
    else {
        $("#txtBagsA").val(noOfBags);
    }
};

function BindNoOfBagsB() {
    var weightB = $("#txtWeightB").val();

    var noOfBags = 0;

    if (weightB != "" && !isNaN(weightB)) {
        noOfBags = parseFloat(weightB * 20.00);
    }

    if (noOfBags == "NaN" || noOfBags == "") {
        $("#txtBagsB").val('0');
    }
    else {
        $("#txtBagsB").val(noOfBags);
    }
};

function BindNoOfBagsC() {
    var weightC = $("#txtWeightC").val();

    var noOfBags = 0;

    if (weightC != "" && !isNaN(weightC)) {
        noOfBags = parseFloat(weightC * 20.00);
    }

    if (noOfBags == "NaN" || noOfBags == "") {
        $("#txtBagsC").val('0');
    }
    else {
        $("#txtBagsC").val(noOfBags);
    }
};

function BindNoOfBagsD() {
    var weightD = $("#txtWeightD").val();

    var noOfBags = 0;

    if (weightD != "" && !isNaN(weightD)) {
        noOfBags = parseFloat(weightD * 20.00);
    }

    if (noOfBags == "NaN" || noOfBags == "") {
        $("#txtBagsD").val('0');
    }
    else {
        $("#txtBagsD").val(noOfBags);
    }
};

function BindTotal() {
    var weightA = $("#txtWeightA").val();
    var weightB = $("#txtWeightB").val();
    var weightC = $("#txtWeightC").val();
    var weightD = $("#txtWeightD").val();
    var weightTotal = 0;
    if (weightA != "" && !isNaN(weightA)) {
        weightA = parseFloat(weightA);
    }
    else {
        weightA = 0;
    }
    if (weightB != "" && !isNaN(weightB)) {
        weightB = parseFloat(weightB);
    }
    else {
        weightB = 0;
    }
    if (weightC != "" && !isNaN(weightC)) {
        weightC = parseFloat(weightC);
    }
    else {
        weightC = 0;
    }
    if (weightD != "" && !isNaN(weightD)) {
        weightD = parseFloat(weightD);
    }
    else {
        weightD = 0;
    }
    weightTotal = weightA + weightB + weightC + weightD;
    $("#txtTotalStock").val(parseFloat(weightTotal));
    TotalStockPrevious = $("#txtTotalStockPrevious").val();
    if (TotalStockPrevious != "" && !isNaN(TotalStockPrevious)) {
        TotalStockPrevious = parseFloat(TotalStockPrevious);
    }
    $("#txtShortWeight").val((parseFloat(weightTotal) - parseFloat(TotalStockPrevious)) * -1);
};

function BindTotalSatisfactory() {
    var WeightClear = parseFloat($("#txtWeightClear").val());
    var WeightFew = parseFloat($("#txtWeightFew").val());
    var WeightHeavy = parseFloat($("#txtWeightHeavy").val());
    var weightTotal = 0;

    if (WeightClear != "" && !isNaN(WeightClear)) {
        WeightClear = parseFloat(WeightClear);
    }
    else {
        WeightClear = 0;
    }
    if (WeightFew != "" && !isNaN(WeightFew)) {
        WeightFew = parseFloat(WeightFew);
    }
    else {
        WeightFew = 0;
    }
    if (WeightHeavy != "" && !isNaN(WeightHeavy)) {
        WeightHeavy = parseFloat(WeightHeavy);
    }
    else {
        WeightHeavy = 0;
    }
    weightTotal = WeightClear + WeightFew + WeightHeavy;
    if (weightTotal == "NaN" || weightTotal == "") {
        $("#txtTotalSatisfactory").val('0');
    }
    else {
        $("#txtTotalSatisfactory").val(weightTotal);
    }
};

function BindFewHeavySatisfactory() {
    var WeightFew = $("#txtWeightFew").val();
    var WeightHeavy = $("#txtWeightHeavy").val();
    var weightFewHeavy = 0;
    if (WeightFew != "" && !isNaN(WeightFew)) {
        WeightFew = parseFloat(WeightFew);
    }
    if (WeightHeavy != "" && !isNaN(WeightHeavy)) {
        WeightHeavy = parseFloat(WeightHeavy);
    }
    weightFewHeavy = WeightFew + WeightHeavy;
    if (weightFewHeavy == "NaN" || weightFewHeavy == "") {
        $("#txtFewHeavySatisfactory").val(parseFloat('0'));
    }
    else {
        $("#txtFewHeavySatisfactory").val(parseFloat(weightFewHeavy));
    }

};

function BindTotalFumigated() {
    var FumigatedClear = $("#txtClearFumigated").val();
    var FumigatedFew = $("#txtFewFumigated").val();
    var FumigatedHeavy = $("#txtHeavyFumigated").val();
    var weightFumigated = 0;
    if (FumigatedClear != "" && !isNaN(FumigatedClear)) {
        FumigatedClear = parseFloat(FumigatedClear);
    }
    if (FumigatedFew != "" && !isNaN(FumigatedFew)) {
        FumigatedFew = parseFloat(FumigatedFew);
    }
    if (FumigatedHeavy != "" && !isNaN(FumigatedHeavy)) {
        FumigatedHeavy = parseFloat(FumigatedHeavy);
    }
    weightFumigated = FumigatedClear + FumigatedFew + FumigatedHeavy;
    if (weightFumigated == "NaN" || weightFumigated == "") {
        $("#txtTotalFumigated").val(parseFloat('0'));
    }
    else {
        $("#txtTotalFumigated").val(parseFloat(weightFumigated));
    }
};

function getallAgency(obj) {
    var ID = 0;

    $.ajax({
        type: 'Post',
        url: '../PIMS/Service/FcrInput.asmx/getallAgency',
        contentType: "application/json;",
        data: JSON.stringify({ ID: ID }),
        dataType: "json",
        asyn: false,
        success: function (result) {
            $('#ddlAgency').find('option').remove();
            var strData = eval('(' + result.d + ')');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("#ddlAgency").append($("<option></option>").val(strData[i].fanSerialCode).html(strData[i].FsAgencyName));
            }
            $('#ddlAgency').val(obj);
            $("#ddlAgency").trigger("liszt:updated");
        }
    });
}

function getComplexType(obj) {
    var ID = 0;
    $.ajax({
        type: 'Post',
        url: '../PIMS/Service/FcrInput.asmx/getComplexType',
        contentType: "application/json;",
        data: JSON.stringify({ ID: ID }),
        dataType: "json",
        asyn: false,
        success: function (result) {
            $('#ddlComplex').find('option').remove();
            var strData = eval('(' + result.d + ')');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("#ddlComplex").append($("<option></option>").val(strData[i].fanserialcode).html(strData[i].fsCompanyName));
            }
            $('#ddlComplex').val(obj);
            $("#ddlComplex").trigger("liszt:updated");
        }
    });
}

function getallComudity(obj) {
    var ID = 0;
    $.ajax({
        type: 'Post',
        url: '../PIMS/Service/FcrInput.asmx/getallComudity',
        contentType: "application/json;",
        data: JSON.stringify({ ID: ID }),
        dataType: "json",
        asyn: false,
        success: function (result) {
            $('#ddlCommodityId').find('option').remove();
            var strData = eval('(' + result.d + ')');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("#ddlCommodityId").append($("<option></option>").val(strData[i].fanserialcode).html(strData[i].fscomname));
            }
            $('#ddlCommodityId').val(obj);
            $("#ddlCommodityId").trigger("liszt:updated");
        }
    });
}

function BindGodown(obj) {
    var ComplexId = $('#ddlComplex').val();
    $.ajax({
        type: 'Post',
        url: '../PIMS/Service/FcrInput.asmx/BindGodown',
        contentType: "application/json;",
        data: JSON.stringify({ ComplexId: ComplexId }),
        dataType: "json",
        asyn: false,
        success: function (result) {
            $('#ddlGodown').find('option').remove();
            var strData = eval('(' + result.d + ')');
            for (var i = 0; i <= strData.length - 1; i++) {
                $("#ddlGodown").append($("<option></option>").val(strData[i].fanSerialCode).html(strData[i].fsGodownName));
            }
            $('#ddlGodown').val(obj);
            $("#ddlGodown").trigger("liszt:updated");
        }
    });
}

function BindTable() {

    $.ajax({
        type: 'Post',
        url: '../PIMS/Service/FcrInput.asmx/BindTable',
        contentType: "application/json;",
        dataType: "json",
        success: function (result) {
            $('#dvContent').dataTable().fnDestroy();
            $('#tblbody').html(result.d);
            $("#dvContent").dataTable({ "iDisplayLength": 10, "sPaginationType": "full_numbers", "bLengthChange": true, "bFilter": true, "bInfo": true, "bPaginate": true, "aoColumns": [0, 1, 2, 3, 4, 5, 6, { "bSortable": false }] });
        }
    });
}

function BindCheckBoxTable() {

    $.ajax({
        type: 'Post',
        url: '../PIMS/Service/FcrInput.asmx/BindCheckBoxTable',
        contentType: "application/json;",
        dataType: "json",
        success: function (result) {
            $('#dvCheckBoxContent').dataTable().fnDestroy();
            $('#tblCheckBoxbody').html(result.d);
            $("#dvCheckBoxContent").dataTable({ "aoColumns": [0, { "bSortable": false }] });
        }
    });

}

function BindData() {
    var EmpId = $('#ddlEmployee').val();
    $.ajax({
        type: 'Post',
        url: '../PIMS/Service/FcrInput.asmx/BindData',
        contentType: "application/json;",
        dataType: "json",
        data: JSON.stringify({ EmpId: EmpId }),
        success: function (result) {
            var strdata = eval('(' + result.d + ')');
            for (var i = 0; i <= strdata.length - 1; i++) {
                $('#ddlBranch').val(strdata[i].Branch);
                $("#ddlBranch").trigger("liszt:updated");

                $('#ddlDepartment').val(strdata[i].Department);
                $("#ddlDepartment").trigger("liszt:updated");

                $('#ddlDistrict').val(strdata[i].DistId);
                $("#ddlDistrict").trigger("liszt:updated");

                $('#ddlCenter').val(strdata[i].CollegeID);
                $("#ddlCenter").trigger("liszt:updated");

                $('#ddlDesignation').val(strdata[i].DesignationID);
                $("#ddlDesignation").trigger("liszt:updated");

            }
        },
        error: function () {
            // alert('Some error occured.');
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

function Edit(FcrId) {

    // $('#' + f.join(', #')).prop('checked', 'checked');
    $("#promotiondatatable").css("display", "none");
    $("#promotioncontent").css("display", "block");
    $("#addNew").hide();
    $("#editNew").show();
    var FCRId = FcrId;
    $('#hdnFCRCode').val(FCRId);
    $.ajax({
        type: 'Post',
        url: '../PIMS/Service/FcrInput.asmx/BindDataById',
        contentType: "application/json;",
        dataType: "json",
        data: JSON.stringify({
            FCRId: FCRId
        }),
        success: function (result) {
            var strdata = eval('(' + result.d + ')');
            var values = strdata[0].NameOfInsection.split(',');
            for (i = 0; i < values.length; i++) {
                $('#' + values[i]).prop('checked', true);
            }
            for (var i = 0; i <= strdata.length - 1; i++) {

                $('#ddl_fcr_period').val(strdata[i].PeriodId);
                $("#ddl_fcr_period").trigger("liszt:updated");

                $('#ddlComplex').val(strdata[i].WarehouseId);
                $("#ddlComplex").trigger("liszt:updated");
                BindGodown(strdata[i].GodownId);

                $('#ddlGodown').val(strdata[i].GodownId);
                $("#ddlGodown").trigger("liszt:updated");

                $('#ddlGodownType').val(strdata[i].GodownType);
                $("#ddlGodownType").trigger("liszt:updated");

                $('#ddlCropYear').val(strdata[i].CropYear);
                $("#ddlCropYear").trigger("liszt:updated");

                $('#ddlStorage').val(strdata[i].YearOfStorage);
                $("#ddlStorage").trigger("liszt:updated");

                $('#ddlAgency').val(strdata[i].AgencyId);
                $("#ddlAgency").trigger("liszt:updated");

                $('#ddlCommodityId').val(strdata[i].CommodityId);
                $("#ddlCommodityId").trigger("liszt:updated");

                $('#ddUOM').val(strdata[i].StockUOM);
                $("#ddUOM").trigger("liszt:updated");

                $('#txtWeightA').val(strdata[i].CategoryAWeight);
                $('#txtBagsA').val(strdata[i].CategoryABags);

                $('#txtWeightB').val(strdata[i].CategoryBWeight);
                $('#txtBagsB').val(strdata[i].CategoryBBags);
                $('#txtWeightC').val(strdata[i].CategoryCWeight);

                $('#txtBagsC').val(strdata[i].CategoryCBags);
                $('#txtWeightD').val(strdata[i].CategoryDWeight);
                $('#txtBagsD').val(strdata[i].CategoryDBags);
                $('#txtTotalStock').val(strdata[i].TotalStockLF);

                $('#txtTotalStockPrevious').val(strdata[i].Remarks);
                $('#txtWeightClear').val(strdata[i].ClearStockWeight);
                $('#txtBagsClear').val(strdata[i].ClearStockBags);
                $('#txtClearFumigated').val(strdata[i].ClearStockFumigated);
                $('#txtWeightFew').val(strdata[i].FewStockWeight);
                $('#txtBagsFew').val(strdata[i].FewStockBags);
                $('#txtFewFumigated').val(strdata[i].FewStockFumigated);
                $('#txtWeightHeavy').val(strdata[i].HeavyStockWeight);
                $('#txtBagsHeavy').val(strdata[i].HeavyStockBags);
                $('#txtHeavyFumigated').val(strdata[i].HeavyStockFumigated);

                var totalStock = parseFloat(strdata[i].CategoryAWeight) + parseFloat(strdata[i].CategoryBWeight) + parseFloat(strdata[i].CategoryCWeight) + parseFloat(strdata[i].CategoryDWeight);
                var totalPreviousStock = parseFloat(strdata[i].CategoryAWeight) + parseFloat(strdata[i].CategoryBWeight) + parseFloat(strdata[i].CategoryCWeight) + parseFloat(strdata[i].CategoryDWeight);
                $('#txtTotalStock').val(totalStock);
                $('#txtTotalStockPrevious').val(totalPreviousStock);
                $('#txtTotalSatisfactory').val(strdata[i].ClearStockWeight + strdata[i].FewStockWeight + strdata[i].HeavyStockWeight);
                var totalFewHeavyStock = parseFloat(strdata[i].FewStockWeight) + parseFloat(strdata[i].HeavyStockWeight);
                $('#txtFewHeavySatisfactory').val(totalFewHeavyStock);
                //                var TotalFumigated = parseFloat(strdata[i].ClearStockFumigated) + parseFloat(strdata[i].FewStockFumigated) + parseFloat(strdata[i].HeavyStockFumigated);
                //                $('#txtTotalFumigated').val(TotalFumigated);
                //$('#txtTotalSatisfactory').val(strdata[i].FewInfestedStockInLF);
                //$('#txtFewHeavySatisfactory').val(strdata[i].FewFumigatedStockInLF);
                //$('#txtTotalFumigated').val(strdata[i].HeavyInfestedStockInLF);
                $('#txtFewInfestedStockInLF').val(strdata[i].FewInfestedStockInLF);
                $('#txtFewFumigatedStockInLF').val(strdata[i].FewFumigatedStockInLF);
                $('#txtHeavyInfestedStockInLF').val(strdata[i].HeavyInfestedStockInLF);
                $('#txtHeavyFumigatedInLF').val(strdata[i].HeavyFumigatedInLF);
                $('#txtTreatmentMalathionInLN').val(strdata[i].TreatmentMalathionInLN);

                $('#txtTreatmentMalathionStockSpray').val(strdata[i].TreatmentMalathionStockSpray);
                $('#txtTreatmentMalathionEarmarkedNF').val(strdata[i].TreatmentMalathionEarmarkedNF);
                $('#txtTreatmentDeltaInLN').val(strdata[i].TreatmentDeltaInLN);
                $('#txtTreatmentDeltaStockSpray').val(strdata[i].TreatmentDeltaStockSpray);
                $('#txtTreatmentDeltaEarmarkedNF').val(strdata[i].TreatmentDeltaEarmarkedNF);
                $('#txtTreatmentDDVPInLN').val(strdata[i].TreatmentDDVPInLN);
                $('#txtTreatmentDDVPStockSpray1').val(strdata[i].TreatmentDDVPStockSpray1);
                $('#txtTreatmentDDVPEarmarkedNF1').val(strdata[i].TreatmentDDVPEarmarkedNF1);
                $('#txtBRL').val(strdata[i].BRLStock);

                $('#txtPocketDamage').val(strdata[i].PocketDamageStock);
                $('#txtRainDamage').val(strdata[i].RainDamageStock);
                $('#txtAttaFormation').val(strdata[i].AttaFormationStock);
                $('#txtNonIssueable').val(strdata[i].NonIssueableStock);
                $('#txtUpgradedCurrentFortnight').val(strdata[i].UpgradedCurrentFornight);
                $('#txtShortCommingNotice').val(strdata[i].ShortcomingNoticeByFCR);
                $('#txtInfectionPoint').val(strdata[i].InfestationPointedByTA);
                $('#txtActionTaken').val(strdata[i].ActionTaken);
                $('#txtActionRemarks').val(strdata[i].Remarks);

                $('#txtInsecticideALPConsumption').val(strdata[i].InsecticideALPConsumption);
                $('#txtInsecticideDeltaConsumption').val(strdata[i].InsecticideDeltaConsumption);
                $('#txtInsecticideDDVPConsumption').val(strdata[i].InsecticideDDVPConsumption);
                $('#txtInsecticideMalathionConsumption').val(strdata[i].InsecticideMalathionConsumption);
                $('#txtTotalFumigated').val(strdata[i].TotalStockFumigated);
            }
        },
        error: function () {
            // alert('Some error occured.');
        }
    });
}

function GetLastFNData() {
    $("#promotiondatatable").css("display", "none");
    $("#promotioncontent").css("display", "block");
    $("#addNew").hide();
    $("#editNew").show();
    var PeriodId = $('#ddl_fcr_period').val();
    var WarehourseID = $('#ddlComplex').val();
    //var GodownId = $('#ddlGodown').val();
    var GodownId = 0;
    var CommodityId = $('#ddlCommodityId').val();
    var AgencyID = $('#ddlAgency').val();
    var CropYearId = $('#ddlCropYear').val();
    var GodownTypeId = $('#ddlGodownType').val();
    var YearofStorage = $('#ddlStorage').val();

    $.ajax({
        type: 'Post',
        url: '../PIMS/Service/FcrInput.asmx/BindLastFNData',
        contentType: "application/json;",
        dataType: "json",
        data: JSON.stringify({
            PeriodId: PeriodId, WarehourseID: WarehourseID, GodownId: GodownId, CommodityId: CommodityId, AgencyID: AgencyID,
            CropYearId: CropYearId, GodownTypeId: GodownTypeId, YearofStorage: YearofStorage
        }),
        success: function (result) {
            var strdata = eval('(' + result.d + ')');
            for (var i = 0; i <= strdata.length - 1; i++) {
                //$('#ddl_fcr_period').val(strdata[i].PeriodId);
                //$("#ddl_fcr_period").trigger("liszt:updated");

                //$('#ddlComplex').val(strdata[i].WarehouseId);
                //$("#ddlComplex").trigger("liszt:updated");
                //BindGodown(0);
                //$('#ddlGodown').val(strdata[i].GodownId);
                //$("#ddlGodown").trigger("liszt:updated");

                //$('#ddlGodownType').val(strdata[i].GodownType);
                //$("#ddlGodownType").trigger("liszt:updated");

                //$('#ddlCropYear').val(strdata[i].CropYear);
                //$("#ddlCropYear").trigger("liszt:updated");

                //$('#ddlStorage').val(strdata[i].YearOfStorage);
                //$("#ddlStorage").trigger("liszt:updated");

                //$('#ddlAgency').val(strdata[i].AgencyId);
                //$("#ddlAgency").trigger("liszt:updated");

                //$('#ddlCommodityId').val(strdata[i].CommodityId);
                //$("#ddlCommodityId").trigger("liszt:updated");

                $('#ddUOM').val(strdata[i].StockUOM);
                $("#ddUOM").trigger("liszt:updated");

                $('#txtWeightA').val(strdata[i].CategoryAWeight);
                $('#txtBagsA').val(strdata[i].CategoryABags);

                $('#txtWeightB').val(strdata[i].CategoryBWeight);
                $('#txtBagsB').val(strdata[i].CategoryBBags);
                $('#txtWeightC').val(strdata[i].CategoryCWeight);

                $('#txtBagsC').val(strdata[i].CategoryCBags);
                $('#txtWeightD').val(strdata[i].CategoryDWeight);
                $('#txtBagsD').val(strdata[i].CategoryDBags);
                $('#txtTotalStock').val(strdata[i].TotalStockLF);

                $('#txtTotalStockPrevious').val(strdata[i].Remarks);
                $('#txtWeightClear').val(strdata[i].ClearStockWeight);
                $('#txtBagsClear').val(strdata[i].ClearStockBags);
                $('#txtClearFumigated').val(strdata[i].ClearStockFumigated);
                $('#txtWeightFew').val(strdata[i].FewStockWeight);
                $('#txtBagsFew').val(strdata[i].FewStockBags);
                $('#txtFewFumigated').val(strdata[i].FewStockFumigated);
                $('#txtWeightHeavy').val(strdata[i].HeavyStockWeight);
                $('#txtBagsHeavy').val(strdata[i].HeavyStockBags);
                $('#txtHeavyFumigated').val(strdata[i].HeavyStockFumigated);

                var totalStock = parseFloat(strdata[i].CategoryAWeight) + parseFloat(strdata[i].CategoryBWeight) + parseFloat(strdata[i].CategoryCWeight) + parseFloat(strdata[i].CategoryDWeight);
                var totalPreviousStock = parseFloat(strdata[i].CategoryAWeight) + parseFloat(strdata[i].CategoryBWeight) + parseFloat(strdata[i].CategoryCWeight) + parseFloat(strdata[i].CategoryDWeight);
                $('#txtTotalStock').val(totalStock);
                $('#txtTotalStockPrevious').val(totalPreviousStock);
                $('#txtTotalSatisfactory').val(strdata[i].ClearStockWeight + strdata[i].FewStockWeight + strdata[i].HeavyStockWeight);
                var totalFewHeavyStock = parseFloat(strdata[i].FewStockWeight) + parseFloat(strdata[i].HeavyStockWeight);
                $('#txtFewHeavySatisfactory').val(totalFewHeavyStock);
                //                var TotalFumigated = parseFloat(strdata[i].ClearStockFumigated) + parseFloat(strdata[i].FewStockFumigated) + parseFloat(strdata[i].HeavyStockFumigated);
                //                $('#txtTotalFumigated').val(TotalFumigated);

                //$('#txtTotalSatisfactory').val(strdata[i].FewInfestedStockInLF);
                //$('#txtFewHeavySatisfactory').val(strdata[i].FewFumigatedStockInLF);
                //$('#txtTotalFumigated').val(strdata[i].HeavyInfestedStockInLF);
                $('#txtFewInfestedStockInLF').val(strdata[i].FewStockWeight);
                //$('#txtFewFumigatedStockInLF').val(strdata[i].FewFumigatedStockInLF);


                $('#txtHeavyInfestedStockInLF').val(strdata[i].HeavyStockWeight);
                //$('#txtHeavyFumigatedInLF').val(strdata[i].HeavyFumigatedInLF);
                $('#txtTreatmentMalathionInLN').val(strdata[i].TreatmentMalathionEarmarkedNF);

                //$('#txtTreatmentMalathionStockSpray').val(strdata[i].TreatmentMalathionStockSpray);
                //$('#txtTreatmentMalathionEarmarkedNF').val(strdata[i].TreatmentMalathionEarmarkedNF);
                $('#txtTreatmentDeltaInLN').val(strdata[i].TreatmentDeltaEarmarkedNF);
                //$('#txtTreatmentDeltaStockSpray').val(strdata[i].TreatmentDeltaStockSpray);
                //$('#txtTreatmentDeltaEarmarkedNF').val(strdata[i].TreatmentDeltaEarmarkedNF);
                $('#txtTreatmentDDVPInLN').val(strdata[i].TreatmentDDVPEarmarkedNF1);
                //$('#txtTreatmentDDVPStockSpray1').val(strdata[i].TreatmentDDVPStockSpray1);
                //$('#txtTreatmentDDVPEarmarkedNF1').val(strdata[i].TreatmentDDVPEarmarkedNF1);
                $('#txtBRL').val(strdata[i].BRLStock);

                $('#txtPocketDamage').val(strdata[i].PocketDamageStock);
                $('#txtRainDamage').val(strdata[i].RainDamageStock);
                $('#txtAttaFormation').val(strdata[i].AttaFormationStock);
                $('#txtNonIssueable').val(strdata[i].NonIssueableStock);
                $('#txtUpgradedCurrentFortnight').val(strdata[i].UpgradedCurrentFornight);

                $('#txtShortCommingNotice').val(strdata[i].ShortcomingNoticeByFCR);
                $('#txtInfectionPoint').val(strdata[i].InfestationPointedByTA);
                $('#txtActionTaken').val(strdata[i].ActionTaken);
                $('#txtActionRemarks').val(strdata[i].Remarks);
                $('#txtTotalFumigated').val(strdata[i].TotalStockFumigated);
            }
        },
        error: function () {
            // alert('Some error occured.');
        }
    });
}

function PreviewImage() {
    var fReader = new FileReader();
    fReader.readAsDataURL($("#fileInput")[0].files[0]);
    fReader.onload = function (fileEvent) {
        $("#imgEmployee").attr("src", fileEvent.target.result);
    };
};

function Insert() {
    $('input:text').each(function () {
        if ($(this).val() == "" || $(this).val() == null) {
            $(this).val('0');
        }
    });
    var tmp = [];
    $('#dvCheckBoxContent').find('input[type="checkbox"]:checked').each(function () {
        tmp.push($(this).val());
        //this is the current checkbox       
    });
    $("#chechboxHidden").val(tmp);
    var countexp = 0;

    var PeriodId = $('#ddl_fcr_period').val();
    var WarehouseId = $('#ddlComplex').val();
    //var GodownId = $('#ddlGodown').val();
    var GodownId = 0;
    var CommodityId = $('#ddlCommodityId').val();
    var AgencyId = $('#ddlAgency').val();
    var CropYear = $('#ddlCropYear').val();
    var GodownTypeId = $('#ddlGodownType').val();
    //var YearOfStorage = $('#ddlStorage').val();
    var YearOfStorage = 0;
    var GodownType = $('#ddlGodownType').val();
    var StockUOM = $('#ddUOM').val();

    var ShortWeight = "0"
    var ShortWeightReason = "0"
    var ShortReason = "0"

    var CategoryAWeight = $('#txtWeightA').val();
    var CategoryABags = $('#txtBagsA').val();
    var CategoryBWeight = $('#txtWeightB').val();
    var CategoryBBags = $('#txtBagsB').val();

    var CategoryCWeight = $('#txtWeightC').val();
    var CategoryCBags = $('#txtBagsC').val();
    var CategoryDWeight = $('#txtWeightD').val();
    var CategoryDBags = $('#txtBagsD').val();

    var TotalStockLF = "0";

    var ClearStockWeight = $('#txtWeightClear').val();
    var ClearStockBags = $('#txtBagsClear').val();
    //var ClearStockFumigated = $('#txtClearFumigated').val();
    var ClearStockFumigated = 0;

    var FewStockWeight = $('#txtWeightFew').val();
    var FewStockBags = $('#txtBagsFew').val();
    // var FewStockFumigated = $('#txtFewFumigated').val();
    var FewStockFumigated = 0;
    var HeavyStockWeight = $('#txtWeightHeavy').val();
    var HeavyStockBags = $('#txtBagsHeavy').val();
    //var HeavyStockFumigated = $('#txtHeavyFumigated').val();
    var HeavyStockFumigated = 0;
    var FewInfestedStockInLF = $('#txtFewInfestedStockInLF').val();
    var FewFumigatedStockInLF = $('#txtFewFumigatedStockInLF').val();
    var HeavyInfestedStockInLF = $('#txtHeavyInfestedStockInLF').val();
    var HeavyFumigatedInLF = $('#txtHeavyFumigatedInLF').val();

    var TreatmentMalathionInLN = $('#txtTreatmentMalathionInLN').val();
    var TreatmentMalathionStockSpray = $('#txtTreatmentMalathionStockSpray').val();
    var TreatmentMalathionEarmarkedNF = $('#txtTreatmentMalathionEarmarkedNF').val();
    var TreatmentDeltaInLN = $('#txtTreatmentDeltaInLN').val();
    var TreatmentDeltaStockSpray = $('#txtTreatmentDeltaStockSpray').val();
    var TreatmentDeltaEarmarkedNF = $('#txtTreatmentDeltaEarmarkedNF').val();

    var TreatmentDDVPInLN = $('#txtTreatmentDDVPInLN').val();
    var TreatmentDDVPStockSpray1 = $('#txtTreatmentDDVPStockSpray1').val();
    var TreatmentDDVPEarmarkedNF1 = $('#txtTreatmentDDVPEarmarkedNF1').val();
    var BRLStock = $('#txtBRL').val();
    var PocketDamageStock = $('#txtPocketDamage').val();
    var RainDamageStock = $('#txtRainDamage').val();
    var AttaFormationStock = $('#txtAttaFormation').val();
    var NonIssueableStock = $('#txtNonIssueable').val();
    var UpgradedCurrentFornight = $('#txtUpgradedCurrentFortnight').val();

    var ShortcomingNoticeByFCR = $('#txtShortCommingNotice').val();
    var InfestationPointedByTA = $('#txtInfectionPoint').val();
    var ActionTaken = $('#txtActionTaken').val();
    var Remarks = $('#txtActionRemarks').val();
    var StockStatus = "0";
    var FCRId = $('#hdnFCRCode').val();

    var NameOfInsection = $('#chechboxHidden').val();

    var InsecticideALPConsumption = $('#txtInsecticideALPConsumption').val();
    var InsecticideDeltaConsumption = $('#txtInsecticideDeltaConsumption').val();
    var InsecticideDDVPConsumption = $('#txtInsecticideDDVPConsumption').val();
    var InsecticideMalathionConsumption = $('#txtInsecticideMalathionConsumption').val();
    var TotalStockFumigated = $('#txtTotalFumigated').val();

    $.ajax({
        type: 'Post',
        url: '../PIMS/Service/FcrInput.asmx/Insert',
        data: JSON.stringify({
            FCRId: FCRId, PeriodId: PeriodId, WarehouseId: WarehouseId, GodownType: GodownType, GodownId: GodownId, CropYear: CropYear, YearOfStorage: YearOfStorage,
            AgencyId: AgencyId, CommodityId: CommodityId, StockStatus: StockStatus, StockUOM: StockUOM, ShortWeight: ShortWeight, ShortWeightReason: ShortWeightReason,
            ShortReason: ShortReason, CategoryAWeight: CategoryAWeight, CategoryABags: CategoryABags, CategoryBWeight: CategoryBWeight, CategoryBBags: CategoryBBags,
            CategoryCWeight: CategoryCWeight, CategoryCBags: CategoryCBags, CategoryDWeight: CategoryDWeight, CategoryDBags: CategoryDBags, TotalStockLF: TotalStockLF,
            ClearStockWeight: ClearStockWeight, ClearStockBags: ClearStockBags, ClearStockFumigated: ClearStockFumigated, FewStockWeight: FewStockWeight,
            FewStockBags: FewStockBags, FewStockFumigated: FewStockFumigated, HeavyStockWeight: HeavyStockWeight, HeavyStockBags: HeavyStockBags,
            HeavyStockFumigated: HeavyStockFumigated, FewInfestedStockInLF: FewInfestedStockInLF, FewFumigatedStockInLF: FewFumigatedStockInLF,
            HeavyInfestedStockInLF: HeavyInfestedStockInLF, HeavyFumigatedInLF: HeavyFumigatedInLF, TreatmentMalathionInLN: TreatmentMalathionInLN,
            TreatmentMalathionStockSpray: TreatmentMalathionStockSpray, TreatmentMalathionEarmarkedNF: TreatmentMalathionEarmarkedNF, TreatmentDeltaInLN: TreatmentDeltaInLN,
            TreatmentDeltaStockSpray: TreatmentDeltaStockSpray, TreatmentDeltaEarmarkedNF: TreatmentDeltaEarmarkedNF, TreatmentDDVPInLN: TreatmentDDVPInLN,
            TreatmentDDVPStockSpray1: TreatmentDDVPStockSpray1, TreatmentDDVPEarmarkedNF1: TreatmentDDVPEarmarkedNF1, BRLStock: BRLStock, PocketDamageStock: PocketDamageStock,
            RainDamageStock: RainDamageStock, AttaFormationStock: AttaFormationStock, NonIssueableStock: NonIssueableStock, UpgradedCurrentFornight: UpgradedCurrentFornight, ShortcomingNoticeByFCR: ShortcomingNoticeByFCR,
            InfestationPointedByTA: InfestationPointedByTA, ActionTaken: ActionTaken, Remarks: Remarks, NameOfInsection: NameOfInsection, InsecticideALPConsumption: InsecticideALPConsumption,
            InsecticideDeltaConsumption: InsecticideDeltaConsumption, InsecticideDDVPConsumption: InsecticideDDVPConsumption, InsecticideMalathionConsumption: InsecticideMalathionConsumption,
            TotalStockFumigated: TotalStockFumigated
        }),
        contentType: "application/json;",
        dataType: "json",
        asyn: false,
        success: function (result) {

            var strData = result.d;
            if (strData == '0') {
                alert("Record already exist.");
            }
            else if (strData >= '1') {
                $('#hdnFCRCode').val('0');
                alert("Record Saved Sucessfully");
                $('input:text').each(function () {
                    $(this).val(''); // or this.value = $(this).attr('original');
                });
                //BindTable();
                //AllClearTextBox();
            }
        }
    });
}