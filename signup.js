let form = document.getElementById("form");
let user = document.getElementById("username");
let gmail = document.getElementById("email");
let password = document.getElementById("password");

let users = JSON.parse(localStorage.getItem("usersData")) || [];

form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    let obj = {
        username: user.value,
        useremail: gmail.value,
        userpass: password.value,
    };

    let emailExists = users.some((ele) => ele.useremail === obj.useremail); 
    if (emailExists) {
        alert("Email Already Exists");
        return;
    }

    users.push(obj);
    localStorage.setItem("usersData", JSON.stringify(users)); 
    alert("Registered Successfully");
    form.reset();

    setTimeout(() => {
        window.location.href = "login.html";
    }, 500);
});
