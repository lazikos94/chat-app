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
<<<<<<< HEAD
let friend_name;
socket.on('my_message',async (data)=> {
    try{
    let datafromemail =await getdatafromemail(data.email);
    var today = new Date();
    var date = today.toLocaleString();
=======

socket.on('my_message',async (data)=> {
    try{

>>>>>>> 3df6595705cd137bf3b7a84812f8676d30d1aac9
    $("div.chat_history").append(
        `<div class='containerchat'>
            <img id='user_message' src='images/face.png' alt='Avatar'>
            <p id='display_message'>${data.firstname} ${data.surname}: ${data.message}</p>
<<<<<<< HEAD
            <span class='time_right' id='time'>${date}</span>
        </div>`
    );
    $('div.chat_history').scrollTop($('div.chat_history')[0].scrollHeight);
=======
            <span class='time_right' id='time'></span>
        </div>`
    );
>>>>>>> 3df6595705cd137bf3b7a84812f8676d30d1aac9
    //$("div.containerchat").children('p').text(message);
    //document.getElementById('display_message').innerText=data.firstname+" "+data.surname+": "+data.message;
    document.getElementById('sender').innerText= data.firstname+" "+data.surname;
    const datatosend={
<<<<<<< HEAD
        message:{
        firstname:firstname,
        surname:surname,
        from:data.from,
        to:data.email,
=======
        received_message:{
        firstname:firstname,
        surname:surname,
        email:data.email,
        from:data.from,
>>>>>>> 3df6595705cd137bf3b7a84812f8676d30d1aac9
        message:data.message}
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
    console.log(json);  
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

<<<<<<< HEAD
    /*const message = document.getElementById('message').value;
    const toemail = document.getElementById('to_email').value;
    const datafromemail=await getdatafromemail(toemail);
    
    GetMessages(toemail,email);
    var today = new Date();
    var date = today.toLocaleString();
    socket.emit('pm_message', {message: message, email: toemail, firstname:firstname, surname: surname,from: email, image:datafromemail.image});
    $("div.chat_history").append(
        `<div class='containerchat'>
            <img id='user_message' src='images/face.png' alt='Avatar'>
            <p id='display_message'>${firstname} ${surname}: ${message}</p>
            <span class='time_right' id='time'>${date}</span>
        </div>`
    );

    const data = {
        message:{
            firstname:firstname,
            surname:surname,
            from:email,
            to:toemail,
            message:message
        }
    }*/
    const message = document.getElementById('message').value;
    const datafromemail=await getdatafromemail(friend_name);
    
    GetMessages(friend_name,email);
    var today = new Date();
    var date = today.toLocaleString();
    socket.emit('pm_message', {message: message, email: friend_name, firstname:firstname, surname: surname,from: email, image:datafromemail.image});
    $("div.chat_history").append(
        `<div class='containerchat'>
            <img id='user_message' src='images/face.png' alt='Avatar'>
            <p id='display_message'>${firstname} ${surname}: ${message}</p>
            <span class='time_right' id='time'>${date}</span>
=======
    const message = document.getElementById('message').value;
    const toemail = document.getElementById('to_email').value;    

    socket.emit('pm_message', {message: message, email: toemail, firstname:firstname, surname: surname,from: email});

    $("div.chat_history").append(
        `<div class='containerchat'>
            <img id='user_message' src='images/face.png' alt='Avatar'>
            <p id='display_message'>${toemail}: ${message}</p>
            <span class='time_right' id='time'></span>
>>>>>>> 3df6595705cd137bf3b7a84812f8676d30d1aac9
        </div>`
    );

    const data = {
<<<<<<< HEAD
        message:{
            firstname:firstname,
            surname:surname,
            from:email,
            to:friend_name,
            message:message
        }
    } 
=======
        sent_message:{
            firstname:firstname,
            surname:surname,
            email:email,
            to:toemail,
            message:message
        }
    }
>>>>>>> 3df6595705cd137bf3b7a84812f8676d30d1aac9
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    };
    const response = await fetch('/reg', options);
    const json = await response.json();
    console.log(json);  
    }
    catch(error){
        console.log(error);
    }
}
<<<<<<< HEAD
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
=======
>>>>>>> 3df6595705cd137bf3b7a84812f8676d30d1aac9
window.onload = async function GetSettings(){
    try{
        const response = await fetch('/reg');
		const dbcontent = await response.json();
        let user_found = false;
        dbcontent.forEach((user)=>{
            if (user.settings !== undefined){
                if (user.settings.email==email){
                    user_found=true;
                    const image = document.getElementById('profile_picture');
                    image.src = user.settings.image;
                    image.alt="picture of lazaros";
                }
            }
<<<<<<< HEAD
=======
            else{
				return 0;
			}
>>>>>>> 3df6595705cd137bf3b7a84812f8676d30d1aac9
        });      
        if (!user_found){
            alert("please update settings");
        }
    }
    catch(error){
        console.log(error);
    }
}
<<<<<<< HEAD
async function GetMessages(toemail,fromemail){
    const response = await fetch('/reg');
    const dbcontent = await response.json();
    dbcontent.forEach((user)=>{
        if (user.message !== undefined){
            if((user.message.from=fromemail)&&(user.message.toemail=toemail)){
                const datestring= new Date(user.time).toLocaleString();
                $("div.chat_history").append(
                    `<div class='containerchat'>
                        <img id='user_message' src='images/face.png' alt='Avatar'>
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
            $("#friends_found").append(
            `<div id='friend'>
                <img id='friend_image' src='images/face.png' width='42px' title='show_profile'>
                <span id='content'>${search_email}</span>
                <i id='add' class='fa fa-plus' aria-hidden='true'></i>
            </div>`);
            //edo ginetai i oli mpizna me to add
            $('#add').click(async function(){
                console.log('click')
                span= $("#content").text();
                console.log(span);
                $("div.friendscontainer").append(
                    `<div class='containerchat'>
                        <img id='user_message' src='images/face.png' alt='Avatar'>
                        <span id='friend_name'>${span}</span>
                        <i id='select_friend' class='fa fa-plus' aria-hidden='true'></i>
                    </div>`);
                $('#friends_found').empty();
                $("#friends_found").hide();
            });
        }
    });
});
$(document).on('click','#select_friend',async function(){
    friend_name = $('i#select_friend').siblings('span#friend_name').text();
    console.log(friend_name);
});


//$(document).on("click", function () {});

=======
>>>>>>> 3df6595705cd137bf3b7a84812f8676d30d1aac9
    /*$('#send_button').click(function(){
        $("#chat_history").append("<div class='containerchat'><img id='user_message' src='images/face.png' alt='Avatar'><p id='display_message'></p><span class='time_right' id='time'></span></div>");
    });*/