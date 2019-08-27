var query_info = decodeURIComponent(window.location.search);
query_info = query_info.substring(1);
var queries = query_info.split("&");
const surname = queries[1];
const firstname = queries[0];
const email = queries[2];
console.log(firstname,surname,email);
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
function readURL(input) {
if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
        $('#profile_image')
            .attr('src', e.target.result);
    };  
    reader.readAsDataURL(input.files[0]);     
    }
}
function getBase64Image(img) {
    try{
        // Create an empty canvas element
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        // Copy the image contents to the canvas
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        // Get the data-URL formatted image
        // Firefox supports PNG and JPEG. You could check img.src to
        // guess the original format, but be aware the using "image/jpg"
        // will re-encode the image.
        const dataURL = canvas.toDataURL("image/jpg");
        const image = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
        return dataURL;
    }
    catch(error){
        console.log(error);
    }
}
function Back(){
    window.location.href = "messenger.html"+ query_info;
} 
    
async function UploadSettings(age,biography,school,country,image64){
    try{ 
        const data = {
                settings : {
                    firstname: firstname,
                    surname: surname,
                    email: email,
                    age: age,
                    bio: biography,
                    school: school,
                    country: country,
                    image: image64
                }
        };
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
        alert("info added");
    }
    catch(error){
        console.log(error);
    }            
}
async function UpdateEntry(thisfname,thissname,thisemail,thisage,thisbiography,thisschool,thiscountry,thisimage64,id,time){
    try{ 
        const data ={
            settings:{
                firstname: thisfname,
                surname: thissname,
                email: thisemail,
                age: thisage,
                bio: thisbiography,
                school: thisschool,
                country: thiscountry,
                image: thisimage64       
            },
            time: time,
            _id: id
        }
        console.log(data);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/setup', options);
        const json = await response.json();
        console.log(json);  
        console.log("info deleted"); 

    }
    catch(error){
        console.log(error);
    }           
}
async function CheckSettings(){
    try{
        const age = document.getElementById("age").value;
        const biography = document.getElementById("bio").value;
        const school = document.getElementById("school").value;
        const country = document.getElementById("country").value;
        const image64 = getBase64Image(document.getElementById('profile_image'));

        let thisfname;
        let thissname;
        let thisemail;
        let thisage;
        let thisbiography;
        let thisschool;
        let thiscountry;
        let thisimage64;
        let time;
        let id;

        const response = await fetch('/reg');
        const dbcontent = await response.json();

        if ((age=="")||(biography=="")||
        (school=="")||(country=="")){
            console.log("empty fields");
        }
        else{
            let user_found = false;
            if (dbcontent.length !== 0){
                dbcontent.forEach((user)=>{
                if (user.settings !== undefined){
                    if (user.settings.email==email){
                        user_found=true;
                        console.log("account already exists");
                        thisfname=user.settings.firstname;
                        thissname=user.settings.surname;
                        thisemail=user.settings.email; 
                        thisage =user.settings.age; 
                        thisbiography =user.settings.bio;
                        thisschool = user.settings.school;
                        thiscountry =user.settings.country;
                        thisimage64 = user.settings.image;
                        time = user.time;
                        id = user._id;
                    }
                }
                else{
                    return 0;
                }
                });
                if (!user_found){
                    UploadSettings(age,biography,school,country,image64);
                }
                else{
                    UpdateEntry(thisfname,thissname,thisemail,thisage,thisbiography,thisschool,thiscountry,thisimage64,id,time); 
                    UploadSettings(age,biography,school,country,image64);
                }
            }
            else{
               UploadSettings(age,biography,school,country,image64);
            }
        }
    }
    catch(error){
        console.log(error);
    }
}