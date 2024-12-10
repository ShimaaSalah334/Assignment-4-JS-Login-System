var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var loginEmptyError = document.querySelectorAll(".loginEmptyError");
var emailLoginError = document.getElementById("emailLoginError");
var passLoginError = document.getElementById("passLoginError");
var eyeIcon = document.querySelector("#eyeIcon");
var loginBtn = document.getElementById("loginBtn");

var token;
var usersList;
if (localStorage.getItem("usersList")) {
  usersList = JSON.parse(localStorage.getItem("usersList"));
} else {
  usersList = [];
}

//Function Login
loginBtn.addEventListener("click", function () {
  if (emptyErrorLogin()) {
    login();
  }
});
function login() {
  if (usersList.length > 0) {
    for (let i = 0; i < usersList.length; i++) {
      if (
        loginEmail.value == usersList[i].email &&
        loginPassword.value == usersList[i].password
      ) {
        token = usersList[i].name;
        saveToLocalStorageLogin();
        clearLoginInputs();
        console.log("logined");
        window.open("/pages/welcome.html");
        emailLoginError.classList.replace("d-block", "d-none");
        passLoginError.classList.replace("d-block", "d-none");
        return;
      } if(loginEmail.value !== usersList[i].email){
        emailLoginError.classList.replace("d-none", "d-block");

      }else{
        emailLoginError.classList.replace("d-block", "d-none");

      }
       if(loginPassword.value !== usersList[i].password){
        passLoginError.classList.replace("d-none", "d-block");

      }else{
        passLoginError.classList.replace("d-block", "d-none");

      }
    }
  } else {
    emailLoginError.classList.replace("d-none", "d-block");
    passLoginError.classList.replace("d-none", "d-block");

  }
}
//Function Save To Local Storage
function saveToLocalStorageLogin() {
  localStorage.setItem("token", token);
}
// Function Clear Inputs After Login
function clearLoginInputs() {
 loginEmail.value = null;
  loginPassword.value = null;
  
}


//Function Login Email Validation
loginEmail.addEventListener("input", function () {
  validEmail();
});
function validEmail() {
  for (let i = 0; i < usersList.length; i++) {
    if (usersList[i].email === loginEmail.value) {
      emailLoginError.classList.replace("d-block", "d-none");
      loginEmptyError[0].classList.replace("d-block", "d-none");
      return;
    } else {
      emailLoginError.classList.replace("d-none", "d-block");
      loginEmptyError[0].classList.replace("d-block", "d-none");
    }
  }
}

//Function Login Password Validation
loginPassword.addEventListener("input", function () {
  validPassword();
});
//Function Login Password Validation
function validPassword() {
  for (let i = 0; i < usersList.length; i++) {
    if (loginPassword.value === usersList[i].password) {
      loginEmptyError[1].classList.replace("d-block", "d-none");
      passLoginError.classList.replace("d-block", "d-none");
      return;
    }
    loginEmptyError[1].classList.replace("d-block", "d-none");
    passLoginError.classList.replace("d-none", "d-block");
    
  }
}

//Function To Check Empty Fields
function emptyErrorLogin() {
  // Check for empty fields together
  if (loginEmail.value.trim() === "" && loginPassword.value.trim() === "") {
    emailLoginError.classList.replace("d-block", "d-none");
    passLoginError.classList.replace("d-block", "d-none");
    for (let i = 0; i < loginEmptyError.length; i++) {
      loginEmptyError[i].classList.replace("d-none", "d-block");
    }
    return false;
  }
    // Check for empty email
  if (loginEmail.value.trim() === "") {
    loginEmptyError[0].classList.replace("d-none", "d-block");
    emailLoginError.classList.replace("d-block", "d-none");
    return false;
  } else {
    loginEmptyError[0].classList.replace("d-block", "d-none"); // Hide email empty error
  }

  // Check for empty password
  if (loginPassword.value.trim() === "") {
    loginEmptyError[1].classList.replace("d-none", "d-block");
    passLoginError.classList.replace("d-block", "d-none");

    return false;
  } else {
    loginEmptyError[1].classList.replace("d-block", "d-none"); // Hide email empty error
  }
  return true;
}

//Function To Show Password
eyeIcon.addEventListener("click", function () {
  showLoginPass();
});

function showLoginPass() {
  let inputType = loginPassword.getAttribute("type");
  if (inputType == "password") {
    loginPassword.setAttribute("type", "text");
    eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    loginPassword.setAttribute("type", "password");
    eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

