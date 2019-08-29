var query_info = decodeURIComponent(window.location.search);
query_info = query_info.substring(1);
var queries = query_info.split("&");
const surname = queries[1];
const firstname = queries[0];
const email = queries[2];
document.getElementById('username').innerText= firstname + " " + surname;
query_info = "?" + firstname + "&" + surname +"&" +email; 
document.getElementById('settings').addEventListener('click', ()=>{
    window.location.href = "settings.html" + query_info; 
});
document.getElementById('messenger').addEventListener('click', ()=>{
    window.location.href = "messenger.html" + query_info; 
});
document.getElementById('profile').addEventListener('click', ()=>{
    window.location.href = "profile.html" + query_info; 
});
document.getElementById('logout').addEventListener('click', ()=>{
    window.location.href = "login.html"; 
});
let uploaded = false;
var socket = io.connect();
let userdata={
    email: email,
    fname: firstname,
    sname: surname
};
let friend_name;
socket.on('my_message',async (data)=> {
    try{
    let datafromemail =await getdatafromemail(data.email);
    var today = new Date();
    var date = today.toLocaleString();
    $("div.chat_history").append(
        `<div class='containerchat'>
            <img id='user_message' src=${data.image} alt='Avatar'>
            <p id='display_message'>${data.firstname} ${data.surname}: ${data.message}</p>
            <span class='time_right' id='time'>${date}</span>
        </div>`
    );
    $('div.chat_history').scrollTop($('div.chat_history')[0].scrollHeight);
    /*const datatosend={
        message:{
            firstname:firstname,
            surname:surname,
            from:data.from,
            to:data.email,
            message:data.message,
            image:data.image
        }
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
    },
    body: JSON.stringify(datatosend)
    };
    const response = await fetch('/reg', options);
    const json = await response.json();
    console.log(json);*/  
    }
    catch(error){
        console.log(error);
    }
});

socket.emit('userConnected',userdata);
function readURL(input) {
    try{
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $('#user_message')
                    .attr('src', e.target.result);
            };  
            reader.readAsDataURL(input.files[0]);     
        }
    }
    catch(error){
        console.log(error)
    }
}
function PictureLoad(input) {
    try{
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $('#profile_picture')
                    .attr('src', e.target.result);
            };  
            reader.readAsDataURL(input.files[0]);     
        }
    }
    catch(error){
        console.log(error)
    }
} 
async function SendMessage(){
    try{
    const message = document.getElementById('message').value;
    const datafromemail=await getdatafromemail(email);
    var today = new Date();
    var date = today.toLocaleString();
    socket.emit('pm_message', {message: message, email: friend_name, firstname:firstname, surname: surname,from: email, image:datafromemail.image64});

    $("div.chat_history").append(
        `<div class='containerchat'>
            <img id='user_message' src=${datafromemail.image64} alt='Avatar'>
            <p id='display_message'>${firstname} ${surname}: ${message}</p>
            <span class='time_right' id='time'>${date}</span>
        </div>`
    );
    const data = {
        message:{
            firstname:firstname,
            surname:surname,
            from:email,
            to:friend_name,
            message:message,
            image:datafromemail.image64
        }
    } 
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    };
    const response = await fetch('/reg', options);
    const json = await response.json();
    }
    catch(error){
        console.log(error);
    }
}
async function getdatafromemail(email){
    const response = await fetch('/reg');
    const dbcontent = await response.json();
    let user_found = false;
    let info_of_user;
    dbcontent.forEach((user)=>{
        if (user.settings !== undefined){
            if (user.settings.email==email){
                user_found = true;
                info_of_user={
                    firstname:user.settings.firstname,
                    surname:user.settings.surname,
                    email:user.settings.email, 
                    age :user.settings.age,
                    biography :user.settings.bio,
                    school : user.settings.school,
                    country :user.settings.country,
                    image64 : user.settings.image
                }
            }
        }
        else{
            return "not such a user";
        }
    });
    if (!user_found){
        return "not such a user";
    }
    else{
        return info_of_user;
    }
}
window.onload = async function GetSettings(){
    try{
        const response = await fetch('/reg');
        const dbcontent = await response.json();
        let user_found=false;
        dbcontent.forEach((user)=>{
            if (user.settings !== undefined){
                if (user.settings.email==email){
                    user_found =true;
                    const image = document.getElementById('profile_picture');
                    image.src = user.settings.image;
                    image.alt="picture of lazaros";
                }
            }
            if(user.friends !== undefined){
                if(user.friends.friend_of == email){
                    $("div.friendscontainer").append(
                        `<div class='containerchat'>
                            <img id='user_message' src=${user.friends.friend_image} alt='Avatar'>
                            <i id='select_friend' class='fa fa-plus' aria-hidden='true'></i>
                            <span id='friend_name'>${user.friends.friend_firstname} ${user.friends.friend_surname}</span></br>
                            <span id='friend_email'>${user.friends.friend_email}</span>

                        </div>`);
                }
            }
        });      
        if (!user_found){
            alert("please update settings");
        }
    }
    catch(error){
        console.log(error);
    }
}
async function GetMessages(toemail,fromemail){
    const response = await fetch('/reg');
    const dbcontent = await response.json();
    dbcontent.forEach((user)=>{
        if (user.message !== undefined){
            if(((user.message.from == fromemail)&&(user.message.to == toemail))||((user.message.from == toemail)&&(user.message.to == fromemail))){
                const datestring= new Date(user.time).toLocaleString();
                $("div.chat_history").append(
                    `<div class='containerchat'>
                        <img id='user_message' src=${user.message.image} alt='Avatar'>
                        <p id='display_message'>${user.message.firstname} ${user.message.surname}: ${user.message.message}</p>
                        <span class='time_right' id='time'>${datestring}</span>
                    </div>`
                );
            }
        }

    });

}
var shouldLoad = true;
$('#searchbtn').click(async function(){
    const search_value=document.getElementById('search').value;
    console.log("click works")
    const response = await fetch('/reg');
    const dbcontent = await response.json();
    let search_email;
    let found=false;
    let span;
    $('#friends_found').slideToggle(300, async function(){
        dbcontent.forEach((user)=>{
            if (user.settings !== undefined){
                if((user.settings.email==search_value)||(user.settings.firstname==search_value)||(user.settings.surname==search_value)){
                    found=true;
                    search_email=user.settings.email;
                    shouldLoad = false;
                }
            }      
        });
        if(!found){
            console.log("nosuchname")
        }
        else{
            let info_for_friend=await getdatafromemail(search_email);
            console.log(info_for_friend)
            $("#friends_found").append(
            `<div id='friend'>
                <img id='friend_image' src=${info_for_friend.image64} width='42px' title='show_profile'>
                <span id='content'>${info_for_friend.firstname} ${info_for_friend.surname}</span>
                <i id='add' class='fa fa-plus' aria-hidden='true'></i>
            </div>`);
            //edo ginetai i oli mpizna me to add
            $('#add').click(async function(){
                console.log('click')
                $("div.friendscontainer").append(
                    `<div class='containerchat'>
                        <img id='user_message' src=${info_for_friend.image64} alt='Avatar'>
                        <i id='select_friend' class='fa fa-plus' aria-hidden='true'></i>
                        <span id='friend_name'>${info_for_friend.firstname} ${info_for_friend.surname}</span></br>
                        <span id='friend_email'>${info_for_friend.email}</span>
                      
                    </div>`);
                const data = {
                    friends:{
                        friend_of:email,
                        friend_email:search_email,
                        friend_image:info_for_friend.image64,
                        friend_firstname:info_for_friend.firstname,
                        friend_surname:info_for_friend.surname,
                    }
                } 
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                };
                const response = await fetch('/reg', options);
                $('#friends_found').empty();
                $("#friends_found").hide();
            });
        }
    });
});
$(document).on('click','#select_friend',async function(){
    friend_name = $('i#select_friend').siblings('span#friend_email').text();
    GetMessages(friend_name,email);
    //GetMessages(email,friend_name);
    let friend_username;
    let friend_pic;
    const response = await fetch('/reg');
    const dbcontent = await response.json();
    dbcontent.forEach((user)=>{
        if (user.settings != undefined){
            if(user.settings.email == friend_name){
                friend_username=user.settings.firstname+" "+user.settings.surname;
                friend_pic = user.settings.image;
            }
        }
    });
    document.getElementById('friend_pic').src=friend_pic;
    document.getElementById('chatter_name').innerText=friend_username;
});


//$(document).on("click", function () {});

    /*$('#send_button').click(function(){
        $("#chat_history").append("<div class='containerchat'><img id='user_message' src='images/face.png' alt='Avatar'><p id='display_message'></p><span class='time_right' id='time'></span></div>");
    });*/