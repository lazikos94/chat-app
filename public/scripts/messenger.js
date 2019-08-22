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

socket.on('my_message',(data)=> {
    try{
    document.getElementById('display_message').innerText=data.message;
    document.getElementById('sender').innerText= data.firstname+" "+data.surname;
    const data={
        received_message:{
        firstname:data.firstname,
        surname:data.surname,
        email:data.email,
        to:email,
        message:data.message}
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    };
    const response = await fetch('/reg', options);
    const json = await response.json();}
    catch(error){
        console.log(error);
    }
});

socket.emit('userConnected',userdata);
function readURL(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $('#user_message')
                    .attr('src', e.target.result);
            };  
            reader.readAsDataURL(input.files[0]);     
        }
}
function PictureLoad(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $('#profile_picture')
                    .attr('src', e.target.result);
            };  
            reader.readAsDataURL(input.files[0]);     
        }
} 
async function SendMessage(){
    try{

    const message = document.getElementById('message').value;
    const toemail = document.getElementById('to_email').value;    

    socket.emit('pm_message', {message: message, email: toemail, firstname:firstname, surname: surname});

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