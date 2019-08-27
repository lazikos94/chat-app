let email = document.getElementById('email');
let password = document.getElementById('password');
let rememberme = document.getElementById("remember");
let localemail = document.getElementById('email');
let localpassword = document.getElementById('password');
let query_info;
async function getDatabase(data){
    try{
        const response = await fetch('/reg');
        const dbcontent = await response.json();
        let user_found = false;
        dbcontent.forEach((user)=>{
            //console.log(user.info);
            if (user.info !== undefined){
                console.log(user.info);		
                if ((user.info.email == data.email)&&(user.info.password == data.password)){
                    user_found=true;
                    correct_firstname =user.info.firstname;
                    correct_surname = user.info.surname;
                    correct_email = user.info.email;
                    query_info = "?" + correct_firstname + "&" + correct_surname +"&" +correct_email ;
                    window.location.href = "messenger.html"+ query_info;
                    console.log("login succesful");
                }			
            }
            else{
                return 0;
            }
        });
        if (!user_found){
            alert("wrong credentials");
        }
    }	
    catch (error){
        console.log(error);
    }	
}
document.getElementById('submit').addEventListener('click',async ()=>{
    const user_email = email.value;
    const user_password = password.value;
    const data = {
        "email" : user_email,
        "password" :user_password
    };
    getDatabase(data);
    IsRememberMe();
});
if (localStorage.checkbox && localStorage.checkbox != "") {
    rememberme.setAttribute("checked", "checked");
    localemail.value = localStorage.email;
    localpassword.value = localStorage.password;
} else {
    rememberme.removeAttribute("checked");
    localemail.value = "";
    localpassword.value = "";
}
function IsRememberMe() {
    if (rememberme.checked && localemail.value != "" && localpassword.value !="") {
        localStorage.email = localemail.value;
        localStorage.password= localpassword.value;
        localStorage.checkbox = rememberme.value;
    } else {
        localStorage.email ="";
        localStorage.password= "";
    }
}