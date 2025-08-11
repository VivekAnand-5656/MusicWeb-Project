let usergmail = JSON.parse(localStorage.getItem("userEmail"));
let user = JSON.parse(localStorage.getItem("currentUser"));

let username = document.getElementById("username");
let mail = document.getElementById("mail");
username.innerText=user;
mail.innerText=usergmail;