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
var firstnames =  ["Adam", "Alex", "Aaron", "Ben", "Carl", "Dan", "David", "Edward", "Fred", "Frank", "George", "Hal", "Hank", "Ike", "John", "Jack", "Joe", "Larry", "Monte", "Matthew", "Mark", "Nathan", "Otto", "Paul", "Peter", "Roger", "Roger", "Steve", "Thomas", "Tim", "Ty", "Victor", "Walter"];
var lastnames = ["Chopper","Anderson", "Ashwoon", "Aikin", "Bateman", "Bongard", "Bowers", "Boyd", "Cannon", "Cast", "Deitz", "Dewalt", "Ebner", "Frick", "Hancock", "Haworth", "Hesch", "Hoffman", "Kassing", "Knutson", "Lawless", "Lawicki", "Mccord", "McCormack", "Miller", "Myers", "Nugent", "Ortiz", "Orwig", "Ory", "Paiser", "Pak", "Pettigrew", "Quinn", "Quizoz", "Ramachandran", "Resnick", "Sagar", "Schickowski", "Schiebel", "Sellon", "Severson", "Shaffer", "Solberg", "Soloman", "Sonderling", "Soukup", "Soulis", "Stahl", "Sweeney", "Tandy", "Trebil", "Trusela", "Trussel", "Turco", "Uddin", "Uflan", "Ulrich", "Upson", "Vader", "Vail", "Valente", "Van Zandt", "Vanderpoel", "Ventotla", "Vogal", "Wagle", "Wagner", "Wakefield", "Weinstein", "Weiss", "Woo", "Yang", "Yates", "Yocum", "Zeaser", "Zeller", "Ziegler", "Bauer", "Baxster", "Casal", "Cataldi", "Caswell", "Celedon", "Chambers", "Chapman", "Christensen", "Darnell", "Davidson", "Davis", "DeLorenzo", "Dinkins", "Doran", "Dugelman", "Dugan", "Duffman", "Eastman", "Ferro", "Ferry", "Fletcher", "Fietzer", "Hylan", "Hydinger", "Illingsworth", "Ingram", "Irwin", "Jagtap", "Jenson", "Johnson", "Johnsen", "Jones", "Jurgenson", "Kalleg", "Kaskel", "Keller", "Leisinger", "LePage", "Lewis", "Linde", "Lulloff", "Maki", "Martin", "McGinnis", "Mills", "Moody", "Moore", "Napier", "Nelson", "Norquist", "Nuttle", "Olson", "Ostrander", "Reamer", "Reardon", "Reyes", "Rice", "Ripka", "Roberts", "Rogers", "Root", "Sandstrom", "Sawyer", "Schlicht", "Schmitt", "Schwager", "Schutz", "Schuster", "Tapia", "Thompson", "Tiernan", "Tisler" ];
var profilecolors = ["palegreen","palegoldenrod","paleturquoise","palevioletred","coral","dodgerblue","mediumpurple","mediumseagreen"];
var currentsettingmenu;

if(!getCookie("username") || !getCookie("profilecolor")){
    document.cookie = `username=${firstnames[Math.floor(Math.random() * firstnames.length)]} ${lastnames[Math.floor(Math.random() * lastnames.length)]}; expires=Thu, 18 Dec 2038 12:00:00 UTC`;
    document.cookie = `profilecolor=${profilecolors[Math.floor(Math.random() * profilecolors.length)]}; expires=Thu, 18 Dec 2038 12:00:00 UTC`;
}

setInterval(async function(){ 
    if (await $.getJSON(`https://anocord-5d60a-default-rtdb.firebaseio.com/${selectedchannel}.json?shallow=true`) == null){
        return
    }else if(Object.keys(await $.getJSON(`https://anocord-5d60a-default-rtdb.firebaseio.com/${selectedchannel}.json?shallow=true`)).length == $('.messagecontainer').children().length){
        return
    }else{
        const messages = ref(getDatabase(), selectedchannel)
        get(messages).then((snapshot) =>  {
            snapshot = snapshot.val()
            $('.messagecontainer').empty();
            for (let index in snapshot) {
                var element = snapshot[index];
                $('.messagecontainer').append(element)
            }
        })
    }
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
        var utcDate = new Date();
        var image;
        var imageList = $('.imageupbutton').prop("files");
        if (imageList && imageList[0]) {
            var reader = new FileReader();
            reader.onloadend = function() {
                image = reader.result;
                console.log(image)
            }
            reader.readAsDataURL($('.imageupbutton').prop("files")[0]);
        }
        if( /^\s*$/.test($('#chattextinput').val())){
            return
        }
        if($('.imageupbutton').prop("files").length == 0){
            const messages = ref(getDatabase(), selectedchannel)
            const chat = ref(getDatabase(), selectedchannel)
            update(chat,
                {
                    [
                        await get(messages).then((snapshot) => { if (!snapshot.val()) { return 0 } return snapshot.val().length })
                    ]: `<div class="message"> <div class="userprofileimg" style="background-color:${getCookie('profilecolor')};"></div><p class="username">${getCookie('username')}</p><p class="time">${utcDate.getUTCHours()+':'+utcDate.getUTCMinutes()}</p><br><br><p class="messagetext">${$('#chattextinput').val()} </p></div>`
                })
            setTimeout(function () { $('.chatcontainer').scrollTop($('.chatcontainer')[0].scrollHeight); }, 500);
            $('#chattextinput').val('');
        }else if($('.imageupbutton').val()){
            const messages = ref(getDatabase(), selectedchannel)
            const chat = ref(getDatabase(), selectedchannel)
            update(chat,
                {
                    [
                        await get(messages).then((snapshot) => { if (!snapshot.val()) { return 0 } return snapshot.val().length })
                    ]: `<div class="message"> <div class="userprofileimg" style="background-color:${getCookie('profilecolor')};"></div><p class="username">${getCookie('username')}</p><p class="time">${utcDate.getUTCHours()+':'+utcDate.getUTCMinutes()}</p><br><br><p class="messagetext">${$('#chattextinput').val()} <br><img src="${image}"></p></div>`
                })
            setTimeout(function () { $('.chatcontainer').scrollTop($('.chatcontainer')[0].scrollHeight); }, 500);
            $('label').css('color','white')
            $('.imageupbutton').val('');
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

$('.imageupbutton').on('change', function() {
    $('label').css('color','greenyellow')
});

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}