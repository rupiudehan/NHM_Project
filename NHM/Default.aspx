<%@ Page Title="Login" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="NHM._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

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
         $(function () {
            getUrl('/');
             domainUrl = $('#hdnUrl').val();
             //sessionStorage.clear();
             if (sessionStorage.getItem("sessionValue")!=null) {
                 window.location.replace("Official/");
             } 
            $('#btnLogin').on('click', function () {
                var username = $('#txtHrms').val();
                var password = $('#txtPassword').val();
                $.ajax({

                    type: "GET",
                    url: domainUrl + 'app/GetLoginEmployee?username=' + username +'&password='+password,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                       
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
                            setMessage("Warning", 'Invalid user credentails');
                        }
                    },
                    failure: function (response) {
                        setMessage("Error", response.responseText);
                    },
                    error: function (response) {
                        setMessage("Error", response.responseText);
                    }

                });
            });
        });
     </script>

</asp:Content>
