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

$(document).on('click', '.userprofileimg' ,function(e){
    profileopen = true;
    $(document.body).append(`<div class="profilepopup"> <div class="profilebackground"></div> <div class="profileimg"></div> <div class="profileimgunder"></div> <div class="profileshitcontainer"> <p class="profileusername">vewu#0288</p> <p class="profileseparator">-</p> <p class="profileaboutmetitle">About me</p> <p class="profileaboutmetext">Hey there, I develop some random web stuff. [ <a href="https://github.com/vwv-source" target="_blank">https://github.com/vwv-source</a> ]</p> </div> </div>`)
    $('.profilepopup').css('left',e.pageX);
    $('.profilepopup').css('top',e.pageY);
})

$(document).on('click', function(e){
    if(profileopen == true && $(e.target).is(".chatcontainer")){
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
        setTimeout(function(){$('.chatcontainer').scrollTop($('.chatcontainer')[0].scrollHeight);}, 200);
        $('#chattextinput').val('');
        
    }
});

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
