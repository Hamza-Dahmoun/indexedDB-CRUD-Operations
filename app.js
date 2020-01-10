
document.addEventListener("DOMContentLoaded", function () {
    //lets check if the browser supports indexedDB
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
    if (!window.indexedDB) {
        //browser does not support indexedDB, lets inform user abt it
        document.getElementById("welcome-screen").innerHTML = "Sorry! Your browser does not support IndexedDB!";
    }
    else {
        displayWelcomeScreen();
    }
});

function displayWelcomeScreen(msg, isError) {
    let welcomeMsg = document.getElementById("welcome-screen").querySelector("#welcome-msg");
    let errorMsg = document.getElementById("welcome-screen").querySelector("#error-msg");
    if(isError){        
        errorMsg.innerHTML = "Sorry! Your browser does not support IndexedDB!";
        errorMsg.style.display = "block";
        welcomeMsg.style.display = "none";
    }
    else{
        errorMsg.style.display = "none";
        welcomeMsg.style.display = "flex";
    }
    let welcomeScreen = document.getElementById("welcome-screen");
    welcomeScreen.style.display = "flex";
    welcomeScreen.addEventListener("click", hideWelcomeScreen);

}
function hideWelcomeScreen() {
    document.getElementById("welcome-screen").style.display = "none"
}