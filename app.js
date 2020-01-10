
document.addEventListener("DOMContentLoaded", function () {
    //lets check if the browser supports indexedDB
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
    if (!window.indexedDB) {
        //browser does not support indexedDB, lets inform user abt it
        //document.getElementById("welcome-screen").innerHTML = "Sorry! Your browser does not support IndexedDB!";
        displayWelcomeScreen("Sorry! Your browser does not support IndexedDB!", true);
    }
    else {
        //lets create the DB with 2 tables and add 2 authors objects and 6 articles objects to it
        createSampleData();
    }
});
function createSampleData(){
    //this function creates and connect to the database, and stores 2 authors objects and 6 articles objects to the database
    var db; //db is going to be linked to the indexedDB we use
    let openRequest = indexedDB.open("myDatabase");
    openRequest.onsuccess = function(event){
        //assignation of myDatabase to 'db' variable
        db = event.target.result;
        displayWelcomeScreen();
    };
    openRequest.onerror = function(event){
        displayWelcomeScreen("Something went wrong when trying to open the database... error code: " + event.target.errorCode, true);
    }
}
function displayWelcomeScreen(msg, isError) {
    let welcomeMsg = document.getElementById("welcome-screen").querySelector("#welcome-msg");
    let errorMsg = document.getElementById("welcome-screen").querySelector("#error-msg");
    if(isError){        
        errorMsg.innerHTML = msg;
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