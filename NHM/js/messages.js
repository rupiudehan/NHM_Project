// form validation function //
function validate(form) {
  var TxtNo = form.TxtNo.value;
  var TxtDate = form.TxtDate.value;
  var TxtEntrySerialNo = form.TxtEntrySerialNo.value;
  var TxtDBags = form.TxtDBags.value;
  var TxtDWeight = form.TxtDWeight.value;
  var TxtDDRate = form.TxtDDRate.value;
  var TxtDAmount = form.TxtDAmount.value;
  var TxtTDBags = form.TxtTDBags.value;
  var TxtTDWeight = form.TxtTDWeight.value;
  var TxtTDAmount = form.TxtTDAmount.value;
  var TxtBBags = form.TxtBBags.value;
  var TxtBWeight = form.TxtBWeight.value;
  var TxtBAmount = form.TxtBAmount.value;
  var TxtGTAmount = form.TxtGTAmount.value;
  var TxtGTTaxPer = form.TxtGTTaxPer.value;
  var TxtGTTax = form.TxtGTTax.value;
  var TxtGTBonus = form.TxtGTBonus.value;
  var TxtGTRoundOff = form.TxtGTRoundOff.value;
  var TxtGTNetTotal = form.TxtGTNetTotal.value;
  var nameRegex = /^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/;
  var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  var messageRegex = new RegExp(/<\/?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/gim);
  var alphanumericwith_ =/^(\w(\s)?)+/;
  var onlyalphabets =/^[a-zA-Z]+$/;
  var numeric=/^\d{1,8}$/; 
  var numeric_range=/^\d{2}$/;//2 is max length 
  var onlyalphanumeric   =/^[0-9a-zA-Z' ']+$/;
  var isfloat=/^((\d+(\.\d*)?)|((\d*\.)?\d+))$/;
  if(TxtNo == "") {
    inlineMsg('TxtNo','You must enter No.',2);
    return false;
  }
  if(!TxtNo.match(numeric)) {
    inlineMsg('TxtNo','You have entered an invalid No.',2);
    return false;
  }
  if(TxtDate == "") {
    inlineMsg('TxtDate','You must enter Date.',2);
    return false;
  }
  if(TxtEntrySerialNo == "") {
    inlineMsg('TxtEntrySerialNo','You must enter entry serial no.',2);
    return false;
  }
  if(!TxtEntrySerialNo.match(numeric)) {
    inlineMsg('TxtEntrySerialNo','You have entered an invalid serial no.',2);
    return false;
  }
  if(TxtDBags == "") {
    inlineMsg('TxtDBags','You must enter bags.',2);
    return false;
  }
//  if(TxtDBags.match(isfloat)) {
//    inlineMsg('TxtDBags','You have entered an invalid bags.',2);
//    return false;
//  }  
  if(TxtDWeight == "") {
    inlineMsg('TxtDWeight','You must enter weight.',2);
    return false;
  }
  if(!TxtDWeight.match(isfloat)) {
    inlineMsg('TxtDWeight','You have entered an invalid weight.',2);
    return false;
  }
  if(TxtDDRate == "") {
    inlineMsg('TxtDDRate','You must enter rate.',2);
    return false;
  }
  if(!TxtDDRate.match(isfloat)) {
    inlineMsg('TxtDDRate','You have entered an invalid rate.',2);
    return false;
  }
 if(TxtDAmount == "") {
    inlineMsg('TxtDAmount','You must enter amount.',2);
    return false;
  }
//  if(!TxtDAmount.match(isfloat)) {
//    inlineMsg('TxtDAmount','You have entered an invalid amount.',2);
//    return false;
//  }
//  if(TxtTDBags == "") {
//    inlineMsg('TxtTDBags','You must enter bags.',2);
//    return false;
//  }
//  if(!TxtTDBags.match(isfloat)) {
//    inlineMsg('TxtTDBags','You have entered an invalid bags.',2);
//    return false;
//  }
//  if(TxtTDWeight == "") {
//    inlineMsg('TxtTDWeight','You must enter weight.',2);
//    return false;
//  }
//  if(!TxtTDWeight.match(isfloat)) {
//    inlineMsg('TxtTDWeight','You have entered an invalid weight.',2);
//    return false;
//  }
//  if(TxtTDAmount == "") {
//    inlineMsg('TxtTDAmount','You must enter amount.',2);
//    return false;
//  }
//  if(!TxtTDAmount.match(isfloat)) {
//    inlineMsg('TxtTDAmount','You have entered an invalid amount.',2);
//    return false;
//  }
//  if(TxtBBags == "") {
//    inlineMsg('TxtBBags','You must enter bags.',2);
//    return false;
//  }
//  if(!TxtBBags.match(isfloat)) {
//    inlineMsg('TxtBBags','You have entered an invalid bags.',2);
//    return false;
//  }
//  if(TxtBWeight == "") {
//    inlineMsg('TxtBWeight','You must enter weight',2);
//    return false;
//  }
//  if(!TxtBWeight.match(isfloat)) {
//    inlineMsg('TxtBWeight','You have entered an invalid weight.',2);
//    return false;
//  }
//  if(TxtBAmount == "") {
//    inlineMsg('TxtBAmount','You must enter amount.',2);
//    return false;
//  }
//  if(!TxtBAmount.match(isfloat)) {
//    inlineMsg('TxtBAmount','You have entered an invalid amount.',2);
//    return false;
//  }
//  if(TxtGTAmount == "") {
//    inlineMsg('TxtGTAmount','You must enter amount.',2);
//    return false;
//  }
//  if(!TxtGTAmount.match(isfloat)) {
//    inlineMsg('TxtGTAmount','You have entered an invalid amount.',2);
//    return false;
//  }
//  if(TxtGTTaxPer == "") {
//    inlineMsg('TxtGTTaxPer','You must enter tax percentage.',2);
//    return false;
//  }
//  if(!TxtGTTaxPer.match(numeric_range)) {
//    inlineMsg('TxtGTTaxPer','You have entered an invalid tax percentage.',2);
//    return false;
//  }
//  if(TxtGTTax == "") {
//    inlineMsg('TxtGTTax','You must enter tax.',2);
//    return false;
//  }
//  if(!TxtGTTax.match(isfloat)) {
//    inlineMsg('TxtGTTax','You have entered an invalid tax.',2);
//    return false;
//  }
//  if(TxtGTBonus == "") {
//    inlineMsg('TxtGTBonus','You must enter bonus.',2);
//    return false;
//  }
//  if(!TxtGTBonus.match(isfloat)) {
//    inlineMsg('TxtGTBonus','You have entered an invalid bonus.',2);
//    return false;
//  }
//  if(!TxtGTRoundOff.match(numeric)) {
//    inlineMsg('TxtGTRoundOff','You have entered an invalid roundoff.',2);
//    return false;
//  }
//  if(TxtGTNetTotal == "") {
//    inlineMsg('TxtGTNetTotal','You must enter total.',2);
//    return false;
//  }
//  if(!TxtGTNetTotal.match(isfloat)) {
//    inlineMsg('TxtGTNetTotal','You have entered an invalid total.',2);
//    return false;
//  }
 }
// START OF MESSAGE SCRIPT //

var MSGTIMER = 20;
var MSGSPEED = 5;
var MSGOFFSET = 3;
var MSGHIDE = 3;

// build out the divs, set attributes and call the fade function //
function inlineMsg(target,string,autohide) {
  var msg;
  var msgcontent;
  if(!document.getElementById('msg')) {
    msg = document.createElement('div');
    msg.id = 'msg';
    msgcontent = document.createElement('div');
    msgcontent.id = 'msgcontent';
    document.body.appendChild(msg);
    msg.appendChild(msgcontent);
    msg.style.filter = 'alpha(opacity=0)';
    msg.style.opacity = 0;
    msg.alpha = 0;
  } else {
    msg = document.getElementById('msg');
    msgcontent = document.getElementById('msgcontent');
  }
  msgcontent.innerHTML = string;
  msg.style.display = 'block';
  var msgheight = msg.offsetHeight;
  var targetdiv = document.getElementById(target);
  targetdiv.focus();
  var targetheight = targetdiv.offsetHeight;
  var targetwidth = targetdiv.offsetWidth;
  var topposition = topPosition(targetdiv) - ((msgheight - targetheight) / 2);
  var leftposition = leftPosition(targetdiv) + targetwidth + MSGOFFSET;
  msg.style.top = topposition + 'px';
  msg.style.left = leftposition + 'px';
  clearInterval(msg.timer);
  msg.timer = setInterval("fadeMsg(1)", MSGTIMER);
  if(!autohide) {
    autohide = MSGHIDE;  
  }
  window.setTimeout("hideMsg()", (autohide * 1000));
}

// hide the form alert //
function hideMsg(msg) {
  var msg = document.getElementById('msg');
  if(!msg.timer) {
    msg.timer = setInterval("fadeMsg(0)", MSGTIMER);
  }
}

// face the message box //
function fadeMsg(flag) {
  if(flag == null) {
    flag = 1;
  }
  var msg = document.getElementById('msg');
  var value;
  if(flag == 1) {
    value = msg.alpha + MSGSPEED;
  } else {
    value = msg.alpha - MSGSPEED;
  }
  msg.alpha = value;
  msg.style.opacity = (value / 100);
  msg.style.filter = 'alpha(opacity=' + value + ')';
  if(value >= 99) {
    clearInterval(msg.timer);
    msg.timer = null;
  } else if(value <= 1) {
    msg.style.display = "none";
    clearInterval(msg.timer);
  }
}

// calculate the position of the element in relation to the left of the browser //
function leftPosition(target) {
  var left = 0;
  if(target.offsetParent) {
    while(1) {
      left += target.offsetLeft;
      if(!target.offsetParent) {
        break;
      }
      target = target.offsetParent;
    }
  } else if(target.x) {
    left += target.x;
  }
  return left;
}

// calculate the position of the element in relation to the top of the browser window //
function topPosition(target) {
  var top = 0;
  if(target.offsetParent) {
    while(1) {
      top += target.offsetTop;
      if(!target.offsetParent) {
        break;
      }
      target = target.offsetParent;
    }
  } else if(target.y) {
    top += target.y;
  }
  return top;
}

// preload the arrow //
if(document.images) {
  arrow = new Image(7,80); 
  arrow.src = "../images/msg_arrow.gif"; 
  
}