var query_info = decodeURIComponent(window.location.search);
query_info = query_info.substring(1);
var queries = query_info.split("&");
const surname = queries[1];
const firstname = queries[0];
const email = queries[2];
document.getElementById('name').innerText =firstname+" "+surname;
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
                document.getElementById('age').innerText = user.settings.age;
                document.getElementById('bio').innerText = user.settings.bio;
                document.getElementById('school').innerText = user.settings.school;
                document.getElementById('country').innerText = user.settings.country;
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
