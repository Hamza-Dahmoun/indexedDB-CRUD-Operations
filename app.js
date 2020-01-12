
document.addEventListener("DOMContentLoaded", function () {
    //lets check if the browser supports indexedDB
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
    if (!window.indexedDB) {
        //browser does not support indexedDB, lets inform user abt it
        //document.getElementById("welcome-screen").innerHTML = "Sorry! Your browser does not support IndexedDB!";
        displayWelcomeScreen("Sorry! Your browser does not support IndexedDB!", true);
    }
    else {
        //lets create the DB with 2 tables and add 1 author object and 2 articles objects to it
        storeSampleData();
    }
});

function storeSampleData(){

}
function fetchGuidPromis(guidNumber) {
    // Return a new promise.
    return new Promise(function (resolve, reject) {
        let url = "https://helloacm.com/api/guid-generator/?n=" + guidNumber + "&braces&nohyphens&uppercase";
        fetch(url, {
            method: 'GET',
        }).then(result => {
            console.log(result);
            return result.json();
            //the return statements will return an object that we're going to use in the next 'then' ... so this current 'then' will return a promess
        }).then((ourJsonData) => {
            console.log(ourJsonData);
            console.log(ourJsonData.guid[0]);
            console.log(ourJsonData.guid[0].slice(1, ourJsonData.guid[0].length - 1));
            resolve(ourJsonData.guid[0].slice(1, ourJsonData.guid[0].length - 1));
        }).catch((response) => {
            reject(Error(response));
        });
    });
}

function displayWelcomeScreen(msg, isError) {
    let welcomeMsg = document.getElementById("welcome-screen").querySelector("#welcome-msg");
    let errorMsg = document.getElementById("welcome-screen").querySelector("#error-msg");
    if (isError) {
        errorMsg.innerHTML = msg;
        errorMsg.style.display = "block";
        welcomeMsg.style.display = "none";
    }
    else {
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