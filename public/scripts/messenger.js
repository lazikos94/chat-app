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

socket.on('my_message',async (data)=> {
    try{

    $("div.chat_history").append(
        `<div class='containerchat'>
            <img id='user_message' src='images/face.png' alt='Avatar'>
            <p id='display_message'>${data.firstname} ${data.surname}: ${data.message}</p>
            <span class='time_right' id='time'></span>
        </div>`
    );
    //$("div.containerchat").children('p').text(message);
    //document.getElementById('display_message').innerText=data.firstname+" "+data.surname+": "+data.message;
    document.getElementById('sender').innerText= data.firstname+" "+data.surname;
    const datatosend={
        received_message:{
        firstname:firstname,
        surname:surname,
        email:data.email,
        from:data.from,
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

    const message = document.getElementById('message').value;
    const toemail = document.getElementById('to_email').value;    

    socket.emit('pm_message', {message: message, email: toemail, firstname:firstname, surname: surname,from: email});

    $("div.chat_history").append(
        `<div class='containerchat'>
            <img id='user_message' src='images/face.png' alt='Avatar'>
            <p id='display_message'>${toemail}: ${message}</p>
            <span class='time_right' id='time'></span>
        </div>`
    );

    const data = {
        sent_message:{
            firstname:firstname,
            surname:surname,
            email:email,
            to:toemail,
            message:message
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
    console.log(json);  
    }
    catch(error){
        console.log(error);
    }
}
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
            else{
				return 0;
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
    /*$('#send_button').click(function(){
        $("#chat_history").append("<div class='containerchat'><img id='user_message' src='images/face.png' alt='Avatar'><p id='display_message'></p><span class='time_right' id='time'></span></div>");
    });*/