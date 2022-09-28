import 'https://code.jquery.com/jquery-3.6.0.min.js'

//----------Firebase-------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getDatabase, ref, set, push, update, get, remove } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js";

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

setInterval(function(){ 
    const messages = ref(getDatabase(), selectedchannel)
    get(messages).then((snapshot) => {
        $('.messagecontainer').empty();
        var snapshot = snapshot.val();
        for(let index in snapshot){
            var element = snapshot[index];
            $('.messagecontainer').append(`<div class="message"> <div class="userprofileimg"></div><p class="username">vewu</p><p class="time">15:00</p><br><br><p class="messagetext">${element}</p></div>`)
        }
    })
}, 200);

$(document).on('click', '.categoryname', function(e){
    if($(this).attr('hide') == ""){
        console.log('hello')
        $(this).parent().children().removeAttr('hide')
    }else{
        console.log('hell')
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
        const messages = ref(getDatabase(), selectedchannel)
        const chat = ref(getDatabase(), selectedchannel)
        update(chat, 
        {
            [
                await get(messages).then((snapshot) => {if(!snapshot.val()){return 0}return snapshot.val().length})
            ]:$('#chattextinput').val()
        })
        setTimeout(function(){$('.chatcontainer').scrollTop($('.chatcontainer')[0].scrollHeight);}, 500);
        $('#chattextinput').val('');
        
    }
});

$('.minicog').on('click', function(e){
    settingsopen = true;
    $(document.body).append(`<div class="settingscontainer"> <div class="settingswindow"> <div class="settingssidebar"> <p class="settingcategorytitle">user settings</p> <input type="button" value="My Account" class="settingbutton" style="color: white;background-color: rgba(77, 77, 77, 0.377);box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.274);cursor: pointer;"> <input type="button" value="Profiles" class="settingbutton"> <p class="settingseparator">-</p> <p class="settingcategorytitle">app settings</p> <input type="button" value="Appearence" class="settingbutton"> <p class="settingseparator">-</p> <p class="settingcategorytitle">Activity</p> <input type="button" value="What's New" class="settingbutton"> <input type="button" value="Log Out" class="settingbutton"> </div> </div> </div>`)
})

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
