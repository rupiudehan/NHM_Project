<%@ Page Title="Login" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="NHM._Default" %>
<asp:Content ID="HeaderContent" ContentPlaceHolderID="head" runat="server">
  
</asp:Content>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
   <%-- <div class="ajax-loader" style="z-index:9999999;height:100%;width:100%">
        <img src="../images/loading.gif" id="image" class="img-responsive"/>
    </div>--%>

    <div class="*">
     

        <div>
          <%--  <form class="login-form">--%>
                <h1>Login</h1>
                <div class="input-field">
                    <input type="email" id="txtHrms" placeholder="HRMS">
                </div>
                <div class="input-field">
                    <input type="password" id="txtPassword" placeholder="Password">
                </div>

                <div class="action"> 
                    <%--<button type="button" (click)="registrationform()">Register </button>--%>
                    <button type="button" class="btn btn-primary" id="btnLogin">Login</button>
                </div>
            <%--</form>--%>
        </div>
    </div>
     <script type="text/javascript">
         var domainUrl = "";
         var btn = $('#btnLogin');
         var loader = $('.ajax-loader');
         $(function () {
             //$('#image').hide();
             loader.hide();
            getUrl('/');
             domainUrl = $('#hdnUrl').val();
             //sessionStorage.clear();
             if (sessionStorage.getItem("sessionValue")!=null) {
                 window.location.replace("Official/");
             } 
            $('#btnLogin').on('click', function () {
                var username = $('#txtHrms').val();
                var password = $('#txtPassword').val();
                loader.show();
                $.ajax({

                    type: "GET",
                    url: domainUrl + 'app/GetLoginEmployee?username=' + username +'&password='+password,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    beforeSend: function () {
                        loader.show();
                        btn.prop('disabled', true).css('cursor', 'not-allowed');
                    },
                    complete: function () {
                        loader.hide();
                        btn.prop('disabled', false).removeAttr('style');
                    },
                    success: function (data) {
                        loader.show();
                       
                        if (data.isSucess) {
                            $.each(data.responseData, function (index, value) {
                                var sessionValues = { name: value.employeeName, hrms: value.hrmsNo, designation: value.designationName, office: value.officeName };
                                sessionStorage.setItem("sessionValue", sessionValues);
                                //sessionStorage.setItem("id", value.employeeID);                           
                                sessionStorage.setItem("name", value.employeeName);
                                sessionStorage.setItem("hrms", value.hrmsNo);
                                sessionStorage.setItem("designation", value.designationName);
                                sessionStorage.setItem("office", value.officeName);
                            });
                            window.location.replace("Official/");
                            
                        }
                        else {
                            loader.hide();
                            setMessage("Warning", 'Invalid user credentails');
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
            });
        });
     </script>

</asp:Content>
