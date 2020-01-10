
document.addEventListener("DOMContentLoaded", function () {
    //lets check if the browser supports indexedDB
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
    if (!window.indexedDB) {
        //browser does not support indexedDB, lets inform user abt it
        document.getElementById("welcome-screen").innerHTML = "Sorry! Your browser does not support IndexedDB!";
    }
    else {
        //lets create the DB with 2 tables and add 2 authors objects and 6 articles objects to it
        displayWelcomeScreen();
    }
});
function displayWelcomeScreen() {
    let welcomeScreen = document.getElementById("welcome-screen");
    welcomeScreen.style.display = "flex";
}