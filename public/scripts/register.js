async function CheckEmail(){
	try{
		const f_name = document.getElementById('fname').value;
		const s_name = document.getElementById('sname').value;
		const email = document.getElementById('email').value;
		const password = document.getElementById('pass1').value;
		const r_password = document.getElementById('pass2').value;

		const response = await fetch('/reg');
		const dbcontent = await response.json();
		let user_found = false;
		if (password == r_password){
			if (dbcontent.length !== 0){
				dbcontent.forEach((user)=>{
				if (user.info !== undefined){
					if (user.info.email == email){
						user_found = true;
						console.log("account already exists");       
					}					
				}
				else{
					return 0;
				}
				});
				if (!user_found){
					SendReg(f_name,s_name,email,password);
					window.location.href='login.html';
				}
				else{
					alert("account exists")
				}
			}
			else{
				console.log("empty database");
				SendReg(f_name,s_name,email,password);
				window.location.href='login.html';
			}
		}
		else{
			alert("passwords dont match");
		}
	}
	catch(error){
		console.log(error);
	}	
}
async function SendReg(f_name,s_name,email,password){
	const data = { 
        info : {
        firstname: f_name,
        surname: s_name,
        email: email,
        password: password
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
}
