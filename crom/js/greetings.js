//4.0
const loginForm = document.querySelector("#login-form");
// const loginInput = loginForm.querySelector("input");
// const loginButton = loginForm.querySelector("button");

const loginInput = document.querySelector("#login-form input");
const loginButton = document.querySelector("#login-form button");

//4.3
const link = document.querySelector("a");

//4.4
const greeting = document.querySelector("#greeting")
const HIDDEN_CLASSNAME = "hidden"
const USERNAME_KEY = "username"

// function onLoginBtnClick() {
//     const username = loginInput.value;
//     if (username === "") {
//         alert("Please write your name")
//     } else if(username.length > 15) {
//         alert("Your name is too long.")
//     }
// }

function onLoginSubmit(event) {
    // const username = loginInput.value;
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    // greeting.innerText = "Hello " + username;
    paintGreetings();
    
    //4.5
    localStorage.setItem(USERNAME_KEY, loginInput.value);

}
// loginButton.addEventListener("click", onLoginBtnClick)
// loginForm.addEventListener("submit", onLoginSubmit)

//4.3
function handleLinkClick(event){
    event.preventDefault();
    console.log(event)

}
// link.addEventListener("click",handleLinkClick)

//4.6
function paintGreetings(){
    const username = localStorage.getItem(USERNAME_KEY);
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME)
    loginForm.addEventListener("submit", onLoginSubmit)
} else {
    paintGreetings();
}













