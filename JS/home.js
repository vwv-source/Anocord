import 'https://code.jquery.com/jquery-3.6.0.min.js'

//----------Firebase-------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, set, push, update, get, remove } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyATBGPrXWawfFQJIAdTk0MD7fIJvGmEteU",
    authDomain: "anocord-5d60a.firebaseapp.com",
    databaseURL: "https://anocord-5d60a-default-rtdb.firebaseio.com",
    projectId: "anocord-5d60a",
    storageBucket: "anocord-5d60a.appspot.com",
    messagingSenderId: "1085914798946",
    appId: "1:1085914798946:web:bf722cb78516da14bf6a3b"
};

const app = initializeApp(firebaseConfig);
//----------Firebase-------------

var selectedchannel = 'general';
var shiftpressed;
var profileopen = false;
var settingsopen = false;
var currentsettingmenu;

setInterval(function(){ 
    const messages = ref(getDatabase(), selectedchannel)
    get(messages).then((snapshot) => {
        var snapshot = snapshot.val();
        if(!snapshot){
            return;
        }else if($('.messagecontainer').children().length == snapshot.length || !snapshot){
            return;
        }else{
            $('.messagecontainer').empty();
            for(let index in snapshot){
                var element = snapshot[index];
                $('.messagecontainer').append(`<div class="message"> <div class="userprofileimg"></div><p class="username">Anonymous</p><p class="time">15:00</p><br><br><p class="messagetext">${element}</p></div>`)
            }
        }
    })
}, 200);

$(document).on('click', '.categoryname', function(e){
    if($(this).attr('hide') == ""){
        $(this).parent().children().removeAttr('hide')
    }else{
        $(this).parent().children().attr('hide', '')
    }
})

$(document).on('click', '.userprofileimg' ,function(e){
    profileopen = true;
    $(document.body).append(`<div class="profilepopup"> <div class="profilebackground"></div> <div class="profileimg"></div> <div class="profileimgunder"></div> <div class="profileshitcontainer"> <p class="profileusername">vewu#0288</p> <p class="profileseparator">-</p> <p class="profileaboutmetitle">About me</p> <p class="profileaboutmetext">Hey there, I develop some random web stuff. [ <a href="https://github.com/vwv-source" target="_blank">https://github.com/vwv-source</a> ]</p> </div> </div>`)
    $('.profilepopup').css('left',e.pageX);
    $('.profilepopup').css('top',e.pageY);
})

$(document).on('click', '.miniprofile' ,function(e){
    if(profileopen){
        profileopen = false;
        $('.profilepopup').remove()
        return;
    }
    profileopen = true;
    $(document.body).append(`<div class="profilepopup"> <div class="profilebackground"></div> <div class="profileimg"></div> <div class="profileimgunder"></div> <div class="profileshitcontainer"> <p class="profileusername">vewu#0288</p> <p class="profileseparator">-</p> <p class="profileaboutmetitle">About me</p> <p class="profileaboutmetext">Hey there, I develop some random web stuff. [ <a href="https://github.com/vwv-source" target="_blank">https://github.com/vwv-source</a> ]</p> </div> </div>`)
    $('.profilepopup').css('left','40px');
    $('.profilepopup').css('bottom','80px');
})

$(document).on('click', function(e){
    if(settingsopen == true && $(e.target).is(".settingscontainer")){
        currentsettingmenu = null;
        settingsopen = false;
        $(".settingscontainer").remove()
    }else if(profileopen == true && $(e.target).is(".chatcontainer")){
        profileopen = false;
        $('.profilepopup').remove()
    }else if(profileopen == true && $(e.target).is(".messagetext")){
        profileopen = false;
        $('.profilepopup').remove()
    }else if(profileopen == true && $(e.target).is(".message")){
        profileopen = false;
        $('.profilepopup').remove()
    }
})

$('.channelbutton').on('click', function(e){
    e.preventDefault()
    $('.messagecontainer').empty();
    $('.channelbutton[selected]').removeAttr('selected')
    $(this).attr('selected', '');
    selectedchannel = $(this).attr('channelid')
})

$("#chattextinput").on('keyup', async function (e) {
    if(e.key == 'Shift'){
        shiftpressed = false;
    }
})

$("#chattextinput").on('keydown', async function (e) {
    if(e.key == 'Shift'){
        shiftpressed = true;
    }
    if(shiftpressed){
        return
    }else
    if (e.key == 'Enter' || e.keyCode == 13) {
        e.preventDefault();
        var image;
        if ($('.imageupbutton').prop("files") && $('.imageupbutton').prop("files")[0]) {
            var reader = new FileReader();
            reader.onloadend = function() {
                image = reader.result;
                console.log(image);
            }
            reader.readAsDataURL($('.imageupbutton').prop("files")[0]);
        }
        if( /^\s*$/.test($('#chattextinput').val())){
            return
        }else{
            const messages = ref(getDatabase(), selectedchannel)
            const chat = ref(getDatabase(), selectedchannel)
            update(chat,
                {
                    [
                        await get(messages).then((snapshot) => { if (!snapshot.val()) { return 0 } return snapshot.val().length })
                    ]: `${$('#chattextinput').val()}`/*  <br><img src="${image}"> `*/
                })
            setTimeout(function () { $('.chatcontainer').scrollTop($('.chatcontainer')[0].scrollHeight); }, 500);
            $('#chattextinput').val('');
        }
        
    }
});

$('.minicog').on('click', function(e){
    settingsopen = true;
    $(document.body).append(`<div class="settingscontainer"> <div class="settingswindow"> <div class="settingssidebar"> <p class="settingcategorytitle">user settings</p> <input type="button" settingname="myaccount" value="My Account" class="settingbutton"> <input type="button" settingname="profiles" value="Profiles" class="settingbutton"> <p class="settingseparator">-</p> <p class="settingcategorytitle">app settings</p> <input type="button" settingname="appearence" value="Appearence" class="settingbutton"> <p class="settingseparator">-</p> <p class="settingcategorytitle">Activity</p> <input type="button" settingname="whatsnew" value="What's New" class="settingbutton"> <input type="button" settingname="logout" value="Log Out" class="settingbutton"> </div> <div class="settingwindowcontainer"> </div> </div> </div>`)
})

//setttings bs

$(document).on('click','.settingbutton', function(e){
    $(this).parent().children().removeAttr('selected');
    $(this).attr('selected','')
    $(".settingwindowcontainer").empty();
    if($(this).attr('settingname') == 'appearence' && currentsettingmenu != 'appearence'){
        currentsettingmenu = 'appearence'
        $(".settingwindowcontainer").append(`<p class="settingtitle">Appearence</p> <div class="messagepreviewcontainer"> <div class="message"> <div class="userprofileimg"></div> <p class="username">vewu</p> <p class="time">15:00</p><br><br> <p class="messagetext">Look at me, I'm a beautiful butterfly<br>Fluttering in the moonlight 🙂</p> </div> </div> <p class="settingtitle">Colors</p> <p class="innersettingtitle">Color Accent</p> <input class="settingcolormeter" id="color" type="range" min="0" max="255" step="1" value="0"> <p class="innersettingtitle">Color Saturation</p> <input class="settingcolormeter" id="saturation" type="range" min="0" max="15" step="1" value="0"><br> <p class="settingtitle">Chat</p> <p class="innersettingtitle">Chat Font Scaling (experimental)</p> <input class="settingrangemeter" id="chatfontscale" type="range" min="12" max="25" step="1" value="0">`)
        return;
    }
    currentsettingmenu = $(this).attr('settingname');
    
})

$(document).on('input','#color.settingcolormeter', function () {
    $(":root").get(0).style.setProperty("--accentcolor", `${$(this).val()}`);
    $('.settingscontainer').attr('style','backdrop-filter:none;');
})

$(document).on('input','#saturation.settingcolormeter', function () {
    $(":root").get(0).style.setProperty("--accentsaturation", `${$(this).val()}%`);
    $('.settingscontainer').attr('style','backdrop-filter:none;');
})

$(document).on('input','#chatfontscale.settingrangemeter', function () {
    $(":root").get(0).style.setProperty("--messegefontsize", `${$(this).val()}px`);
})

$(document).on('click','.settingcolormeter', function () {
    $('.settingscontainer').attr('style','backdrop-filter: blur(50px);');
})

//setttings bs

//image wizardry

$('.imageupbutton').on('change', function() {
    if ($('.imageupbutton').prop("files") && $('.imageupbutton').prop("files")[0]) {
        var reader = new FileReader();
        reader.onloadend = function() {
            console.log(reader.result)
        }
        reader.readAsDataURL($('.imageupbutton').prop("files")[0]);
    }
});

//image wizardry

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
