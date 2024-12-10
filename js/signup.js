var signUpName = document.getElementById("signUpName");
var signUpEmail = document.getElementById("signUpEmail");
var signUpPassword = document.getElementById("signUpPassword");
var signUpConfirmPass = document.getElementById("signUpConfirmPass");
var emptyErrorMessage = document.querySelectorAll(".empty-error");
var shortNameError = document.getElementById("shortNameError");
var startNameError = document.getElementById("startNameError");
var nameRules = document.getElementById("nameRules");
var duplicateNameError = document.getElementById("duplicateNameError");
var emailRules = document.getElementById("emailRules");
var duplicateEmailError = document.getElementById("duplicateEmailError");
var passwordRules = document.getElementById("passwordRules");
var confirmPassError = document.getElementById("confirmPassError");
var passEyeIcon = document.querySelector("#passEyeIcon");
var confirmPassEyeIcon = document.querySelector("#confirmPassEyeIcon");
var signUpBtn = document.getElementById("signUpBtn");
var myAlert = document.getElementById("myAlert");
var okBtn = document.getElementById("okBtn");
var alertLoginBtn = document.getElementById("alertLoginBtn");

var usersList;
if (localStorage.getItem("usersList")) {
  usersList = JSON.parse(localStorage.getItem("usersList"));
} else {
  usersList = [];
}

//Function Sign Up
signUpBtn.addEventListener("click", function () {
  if (emptyError()) {
    if (
      nameValidation() &&
      emailValidation() &&
      passValidation() &&
      confirmPassValidation()
    ) {
      signUp();
    }
  }
});
function signUp() {
  var users = {
    name: signUpName.value,
    email: signUpEmail.value,
    password: signUpPassword.value,
    confirmPass: signUpConfirmPass.value,
  };
  usersList.push(users);
  saveToLocalStorage();
  clearInputs();
  myAlert.style.display = "block";
  setTimeout(() => {
    myAlert.classList.add("active");
  }, 10);
}

//Function Save To Local Storage
function saveToLocalStorage() {
  localStorage.setItem("usersList", JSON.stringify(usersList));
}

// Function Clear Inputs After Registeration
function clearInputs() {
  signUpName.value = null;
  signUpEmail.value = null;
  signUpPassword.value = null;
  signUpConfirmPass.value = null;
}

//Function Close Alert
okBtn.addEventListener("click", function () {
  closeAlert();
});
function closeAlert() {
  myAlert.classList.remove("active");
  setTimeout(() => {
    myAlert.style.display = "none";
  }, 300);
}

//Function Go To Login Page
alertLoginBtn.addEventListener("click", function () {
  goToLogin();
});
function goToLogin() {
  window.open("../index.html", "_self");
}

//Function Sign Up Name Validation
signUpName.addEventListener("input", function () {
  nameValidation();
});
function nameValidation() {
  var userName = signUpName.value.trim();
  let regex = /^[A-Za-z][A-Za-z0-9._\s-]{2,}$/;

  //Check UserName Length
  if (userName.length < 3) {
    shortNameError.classList.replace("d-none", "d-block");
    emptyErrorMessage[0].classList.replace("d-block", "d-none");
    startNameError.classList.replace("d-block", "d-none");
    nameRules.classList.replace("d-block", "d-none");
    duplicateNameError.classList.replace("d-block", "d-none");

    return false;
  }
  //Check UserName Rules
  if (!regex.test(userName)) {
    if (!/^[A-Za-z]/.test(userName)) {
      startNameError.classList.replace("d-none", "d-block");
      shortNameError.classList.replace("d-block", "d-none");
      nameRules.classList.replace("d-block", "d-none");
      duplicateNameError.classList.replace("d-block", "d-none");
    } else {
      nameRules.classList.replace("d-none", "d-block");
      shortNameError.classList.replace("d-block", "d-none");
      startNameError.classList.replace("d-block", "d-none");
      duplicateNameError.classList.replace("d-block", "d-none");
    }
    return false;
  }
  // Check for duplicate names
  for (let i = 0; i < usersList.length; i++) {
    if (usersList[i].name.toLowerCase() == signUpName.value.toLowerCase()) {
      duplicateNameError.classList.replace("d-none", "d-block");
      emptyErrorMessage[0].classList.replace("d-block", "d-none");
      shortNameError.classList.replace("d-block", "d-none");
      startNameError.classList.replace("d-block", "d-none");
      nameRules.classList.replace("d-block", "d-none");
      return false;
    }
  }

  emptyErrorMessage[0].classList.replace("d-block", "d-none");
  shortNameError.classList.replace("d-block", "d-none");
  startNameError.classList.replace("d-block", "d-none");
  nameRules.classList.replace("d-block", "d-none");
  duplicateNameError.classList.replace("d-block", "d-none");

  return true;
}

//Function Sign Up Email Validation
signUpEmail.addEventListener("input", function () {
  emailValidation();
});
function emailValidation() {
  let regex = /^[\w]+@([\w]+\.)+[\w]{2,}$/;

  //Check Email Rules
  if (!regex.test(signUpEmail.value)) {
    emailRules.classList.replace("d-none", "d-block");
    emptyErrorMessage[1].classList.replace("d-block", "d-none");
    return false;
  }

  // Check for duplicate emails
  for (let i = 0; i < usersList.length; i++) {
    if (usersList[i].email === signUpEmail.value) {
      duplicateEmailError.classList.replace("d-none", "d-block");
      emptyErrorMessage[1].classList.replace("d-block", "d-none");
      emailRules.classList.replace("d-block", "d-none");
      return false;
    }
  }
  emptyErrorMessage[1].classList.replace("d-block", "d-none");
  emailRules.classList.replace("d-block", "d-none");
  duplicateEmailError.classList.replace("d-block", "d-none");

  return true;
}

//Function Sign Up Password Validation
signUpPassword.addEventListener("input", function () {
  passValidation();
});
function passValidation() {
  let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  //Check Password Rules
  if (!regex.test(signUpPassword.value)) {
    passwordRules.classList.replace("d-none", "d-block");
    emptyErrorMessage[2].classList.replace("d-block", "d-none");

    return false;
  }
  emptyErrorMessage[2].classList.replace("d-block", "d-none");

  passwordRules.classList.replace("d-block", "d-none");

  return true;
}

//Function Sign Up Confirm Password Validation
signUpConfirmPass.addEventListener("input", function () {
  confirmPassValidation();
});
function confirmPassValidation() {
  if (signUpPassword.value !== signUpConfirmPass.value) {
    confirmPassError.classList.replace("d-none", "d-block");
    emptyErrorMessage[3].classList.replace("d-block", "d-none");
    return false;
  }
  emptyErrorMessage[3].classList.replace("d-block", "d-none");
  confirmPassError.classList.replace("d-block", "d-none");
  return true;
}

//Function Sign Up Empty Inputs
function emptyError() {
  // Check for empty fields together
  if (
    signUpName.value.trim() === "" &&
    signUpEmail.value.trim() === "" &&
    signUpPassword.value.trim() === "" &&
    signUpConfirmPass.value.trim() === ""
  ) {
    shortNameError.classList.replace("d-block", "d-none");
    emailRules.classList.replace("d-block", "d-none");
    passwordRules.classList.replace("d-block", "d-none");
    confirmPassError.classList.replace("d-block", "d-none");

    for (let i = 0; i < emptyErrorMessage.length; i++) {
      emptyErrorMessage[i].classList.replace("d-none", "d-block");
    }
    return false;
  }

  // Check for empty name
  if (signUpName.value.trim() === "") {
    emptyErrorMessage[0].classList.replace("d-none", "d-block");
    shortNameError.classList.replace("d-block", "d-none");
    return false;
  } else {
    emptyErrorMessage[0].classList.replace("d-block", "d-none");
  }

  // Check for empty email
  if (signUpEmail.value.trim() === "") {
    emptyErrorMessage[1].classList.replace("d-none", "d-block");
    emailRules.classList.replace("d-block", "d-none");
    return false;
  } else {
    emptyErrorMessage[1].classList.replace("d-block", "d-none");
  }

  // Check for empty password
  if (signUpPassword.value.trim() === "") {
    emptyErrorMessage[2].classList.replace("d-none", "d-block");
    passwordRules.classList.replace("d-block", "d-none");
    return false;
  } else {
    emptyErrorMessage[2].classList.replace("d-block", "d-none");
  }

  // Check for empty confirm password
  if (signUpConfirmPass.value.trim() === "") {
    emptyErrorMessage[3].classList.replace("d-none", "d-block");
    confirmPassError.classList.replace("d-block", "d-none");
    return false;
  } else {
    emptyErrorMessage[3].classList.replace("d-block", "d-none");
  }

  return true;
}

//Function To Show Password
passEyeIcon.addEventListener("click", function () {
  showPass();
});
function showPass() {
  let inputType = signUpPassword.getAttribute("type");
  if (inputType == "password") {
    signUpPassword.setAttribute("type", "text");
    passEyeIcon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    signUpPassword.setAttribute("type", "password");
    passEyeIcon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

//Function To Show Confirm Password
confirmPassEyeIcon.addEventListener("click", function () {
  showConfirmPass();
});
function showConfirmPass() {
  let inputType = signUpConfirmPass.getAttribute("type");
  if (inputType == "password") {
    signUpConfirmPass.setAttribute("type", "text");
    confirmPassEyeIcon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    signUpConfirmPass.setAttribute("type", "password");
    confirmPassEyeIcon.classList.replace("fa-eye-slash", "fa-eye");
  }
}
