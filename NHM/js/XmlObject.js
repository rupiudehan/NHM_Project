// JScript File
var xmlHttp;
function GetXmlObject()
{
    var xmlHttp=null;
    try
    {
        xmlHttp = new XMLHttpRequest();  //Firefox, Opera,Safari
    }
    catch (e)
    {
        try
        { 
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); //IE 6.0+
        }
        catch(e)
        {
            try
            {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); //IE 5.5+
            }
            catch(e)
            {
                alert("browser does not support");
            }
        }
    }
    return xmlHttp;
}