let users = JSON.parse(localStorage.getItem("usersData"));

let userDetail = document.getElementById("detail");
let userp = document.getElementById("password"); 

let msg = document.getElementById("msg");
let login = document.getElementById("login");

login.addEventListener("click",(e)=>{
    e.preventDefault();
    users.forEach(data => {
    if((data.userpass === userp.value) && (data.username === userDetail.value)){
        window.location.href="main.html";
        localStorage.setItem("currentUser",JSON.stringify(userDetail.value));
    } else{
        msg.textContent = "Incorrect username or password";
    }
});
})