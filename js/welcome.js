var user = document.getElementById("user");
var logoutBtn = document.getElementById("logoutBtn");

var userToken;
if (localStorage.getItem("token")) {
  userToken = localStorage.getItem("token");
} else {
  userToken = "unKnown";
}
function getUserName() {
  user.innerHTML += userToken;
}
getUserName();
logoutBtn.addEventListener("click",function(){
    localStorage.removeItem("token");
    window.open("../index.html","_self");
    
})

