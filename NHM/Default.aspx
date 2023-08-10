<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="NHM._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <div class="*">

        <div>
          <%--  <form class="login-form">--%>
                <h1>Login</h1>
                <div class="input-field">
                    <input type="email" placeholder="HRMS">
                </div>
                <div class="input-field">
                    <input type="password" placeholder="Password">
                </div>

                <div class="action"> 
                    <%--<button type="button" (click)="registrationform()">Register </button>--%>
                    <button type="button" class="btn btn-primary" (click)="login()">Login</button>
                </div>
            <%--</form>--%>
        </div>
    </div>

</asp:Content>
