function getUrl(startingUrl) {
    $.ajax({

        type: "POST",
        url: startingUrl+'service.asmx/FetchLinkUrl',
        //data: "[]",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (data) {
            $('#hdnUrl').val(data.d);
        }

    });
}