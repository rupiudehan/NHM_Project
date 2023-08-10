// JScript File
function CreateCookie(name,value,days)
{
    if(days)
    {
        var date=new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires="; expires="+date.toGMTString();
    }
    else
        var expires="";
    document.cookie=name+"="+value+expires+"; path=/";
    if(days!=-1)
    {
        //alert('Cookie Created');
        //var a=document.getElementById('url').value;
        //alert(a);
        //window.location=a;
    }
}
function ReadCookie(name)
{
    var nameEq=name+"=";
    var ck=document.cookie.split(';');
    //alert(ck);
    for(var i=0;i<ck.length;i++)
    {
        var c=ck[i];
        //alert(c);
        while(c.charAt(0)==' ')
            c=c.substring(1,c.length);
        if(c.indexOf(nameEq)==0)
            return c.substring(nameEq.length,c.length);
            //alert(c.substring(nameEq.length,c.length));
    }
    return null;
}
function EraseCookie(name)
{
    CreateCookie(name,"",-1);
    alert('Cookie Deleted');
}
function findidDL()
{
    //var a = document.forms['Content1'];
//    var a=window.opener.document.forms["form1"].elements["TextBox4"].value
//    alert(a);
    var grd=document.forms[0].elements[2].value;
    alert(grd);
//    var index='<%=index %>';
//    alert(index);        
//    var ctrl=grd.rows[index].cells[0].children[2];
//    alert(ctrl);
//    var txt=ctrl.value;
//    alert(txt);
}
