function isInteger (s)
{      
  var txt=s.value;
  var i;

  if (isEmpty(txt))
  if (isInteger.arguments.length == 1) return 0;
  else return (isInteger.arguments[1] == true);

  for (i = 0; i < txt.length; i++)
  {
     var c = txt.charAt(i);

     if (!isDigit(c))
     {              
        return false;
     }
  }

  return true;
}

function isEmpty(s)
{
  return ((s == null) || (s.length == 0))
}

function isDigit (c)
{
  return ((c >= "0") && (c <= "9"))
}
function isFloat (s)
{      
  var txt=s.value;
  var i;

  if (isEmpty(txt))
  if (isFloat.arguments.length == 1) return 0;
  else return (isFloat.arguments[1] == true);
  var txt=parseFloat(txt);
  if(isNaN(txt))
  {
    alert('Enter numeric value');
    s.value='';
    s.focus();  
    return false;
  }
  return true;
}