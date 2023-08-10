<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="NHM.Login" %>

<asp:Content ID="contentHead" ContentPlaceHolderID="head" runat="server">
    <style type="stylesheet">
        * {
            font-family: 'Poppins', sans-serif;
        }

        .wrapper {
            background: #ececec;
            padding: 0 20px 0 20px;
        }

        .main {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .row {
            width: 900px;
            height: 550px;
            border-radius: 10px;
            background: #fff;
            box-shadow: 5px 5px 10px 1px rgba(0, 0, 0, 0.2);
        }

        .side-image {
            /* background-image: url("images/nhmlogo.png"); */
            background-position: center;
        }

        .img {
            position: center;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .text p {
            color: #fff
        }

        i {
            font-size: 400;
            font-size: 15px;
        }

        /* credential  */
        .right {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }

        .input-box {
            width: 290px;
            box-sizing: border-box;
        }

            .input-box header {
                font-weight: 700;
                text-align: center;
                margin-bottom: 45px;
            }

        .input-field {
            display: flex;
            flex-direction: column;
            position: relative;
            padding: 0 10px 10px 10px;
        }

        input {
            height: 45px;
            width: 100%;
            background: transparent;
            border: 0px none;
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
            outline: none;
            margin-bottom: 20px;
            color: #40414a;
        }

        .input-box .input-field label {
            position: absolute;
            top: 10px;
            left: 10px;
            pointer-events: none;
            transition: 0.5s;
        }

        button {
            background: #3C8DBC;
            color: #fff;
            border-radius: 5px;
            box-shadow: 5px 5px #cfc5c5;
        }
    </style>
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    
     <div class="wrapper ">
        <div class="container main">
            <div class="row">
                <div class="col-md-6 side-image">
                    <!-- Image -->
                    <img src="images/nhmlogo.png" alt="Logo"/>
                    <div class="text">
                        <p>Hello Welcome</p>
                    </div>

                </div>

                <div class="col-md-6 right">
                    <div class="input-box">
                        <header>Log In</header>
                        <div class="input-field">
                            <label for="email">Enter HRMS</label>
                            <input type="text" name="input" id="email" required>
                        </div>

                        <div class="input-field">
                            <label for="password">Password</label>
                            <input type="password" name="input" id="password" required>
                        </div>

                        <div class="input-field">
                            <button type="button">Login</button>

                        </div>


                    </div>
                </div>

            </div>
        </div>
    </div>
</asp:Content>
