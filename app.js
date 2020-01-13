
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
        createMyDB();
        //now lets insert a spinner before ul tag and after p tag
        injectSpinner(document.getElementById("welcome-msg"), "p");
        //deleteDB();
    }
    document.getElementById("welcome-screen").addEventListener("click", hideWelcomeScreen);;
});
function deleteDB() {
    //this function deletes the articlesDB if it already exists
    //we'll open the connection, then close it, then delete the database
    var request = window.indexedDB.open("articlesDB");
    request.onerror = function (event) {
        //createMyDB();
    };
    request.onsuccess = function (event) {
        //create db object    
        var db = request.result;
        db.close();
        //console.log(window.indexedDB.deleteDatabase("articlesDB"));
        window.indexedDB.deleteDatabase("articlesDB");
        //createMyDB();
    };
}
function createMyDB() {
    //this function creates our indexedDB database 'articlesDB'
    var db;

    // Request version 1 of the database.
    var request = window.indexedDB.open("articlesDB", 1);

    // This event handles the event whereby a new version of the
    // database needs to be created. Either one has not been created
    // before, or a new version number has been submitted via the
    // window.indexedDB.open line above.
    request.onupgradeneeded = function (event) {
        db = request.result;

        db.onerror = function (errorEvent) {
            //document.body.innerHTML += '<li>Error loading database.</li>';
            document.getElementById("welcome-msg").querySelector("UL").innerHTML += '<li>Error loading database.</li>';
        };

        var articlesStore = db.createObjectStore("articles", { keyPath: "id" });
        var authorsStore = db.createObjectStore("authors", { keyPath: "id" });
        //our DB will have two tables, in each table the key in this table will be incrementing automatically
        //var articlesStore = db.createObjectStore("articles", { autoIncrement: true });
        //var authorsStore = db.createObjectStore("authors", { autoIncrement: true });
    };

    request.onerror = function (event) {
        //document.body.innerHTML += '<li>Error loading database.' + event.target.errorCode + '</li>';
        document.getElementById("welcome-msg").querySelector("UL").innerHTML += '<li>Error loading database.' + event.target.errorCode + '</li>';
    };

    request.onsuccess = function (event) {
        //document.body.innerHTML += '<li>articlesDB Database initialised successfully.</li>';
        document.getElementById("welcome-msg").querySelector("UL").innerHTML += '<li>articlesDB Database initialised successfully.</li>';
        //db = request.result;
        storeSampleData();
    };
}
function storeSampleData() {
    //this function stores sample data: 1 author and two articles
    let authorName = "Hamza";
    let authorCountry = "Algeria";
    let authorId = "";
    //lets use the api call in fetchGuidPromis() to bring 3 guids from the internet
    fetchGuidPromis(3).then(
        function (response) {
            //var guidsArray = [...response];
            //each guid we get from the api is srrounded by brackets {}, lets get rid of them
            var guidsArray = response.map(elt => elt.slice(1, elt.length - 1));
            console.log("here are the 3 guids i got:");
            console.log(guidsArray);
            authorId = guidsArray[0];
            let author = {
                id: authorId,
                name: authorName,
                country: authorCountry
            };

            var request = window.indexedDB.open("articlesDB", 1);
            request.onsuccess = function (event) {
                //create db object    
                var db = request.result;
                //create 'transaction' object
                var myTransaction = db.transaction("authors", "readwrite");
                //link to the table named 'authors'
                var authorsStore = myTransaction.objectStore('authors');
                //create Request Object to add 'author' object to the 'authors' table
                var addRequest = authorsStore.add(author);

                addRequest.onsuccess = function (event) {
                    //document.body.innerHTML += '<li>one author inserted to indexedDB successfully.</li>';
                    document.getElementById("welcome-msg").querySelector("UL").innerHTML += '<li>One author inserted to indexedDB successfully.</li>';
                    //lets now store two articles written by the previous author
                    let article1 = {
                        id: guidsArray[1],
                        authorID: guidsArray[0],
                        title: "indexedDB CRUD Operations",
                        date: "01/13/2020",
                        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    };
                    var myArticlesTransaction = db.transaction("articles", "readwrite");
                    //link to the table named 'authors'
                    var articlesStore = myArticlesTransaction.objectStore('articles');
                    //create Request Object to add 'article' object to the 'articles' table
                    var addRequest_article1 = articlesStore.add(article1);
                    addRequest_article1.onsuccess = function () {
                        //document.body.innerHTML += '<li>first article inserted to indexedDB successfully.</li>';                        
                        document.getElementById("welcome-msg").querySelector("UL").innerHTML += '<li>First article inserted to indexedDB successfully.</li>';
                    }
                    addRequest_article1.onerror = function (event) {
                        document.getElementById("welcome-msg").querySelector("UL").innerHTML += '<li>Error: first article not inserted: ' + event.target.errorCode + ' </li>';
                        //document.body.innerHTML += '<li>Error: first article not inserted: ' + event.target.errorCode + ' </li>';
                    }
                    let article2 = {
                        id: guidsArray[2],
                        authorID: guidsArray[0],
                        title: "How To Make a Popup?",
                        date: "01/17/2020",
                        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    };
                    //create Request Object to add 'article' object to the 'articles' table
                    addRequest_article2 = articlesStore.add(article2);
                    addRequest_article2.onsuccess = function () {
                        removeSpinner(document.getElementById("welcome-msg"));
                        //document.body.innerHTML += '<li>second article inserted to indexedDB successfully.</li>';
                        document.getElementById("welcome-msg").querySelector("UL").innerHTML += '<li>Second article inserted to indexedDB successfully.</li>';
                    }
                    addRequest_article2.onerror = function (event) {
                        removeSpinner(document.getElementById("welcome-msg"));
                        //document.body.innerHTML += '<li>Error: second article not inserted: ' + event.target.errorCode + ' </li>';
                        document.getElementById("welcome-msg").querySelector("UL").innerHTML += '<li>Error: second article not inserted: ' + event.target.errorCode + ' </li>';
                    }
                }
                addRequest.onerror = function (event) {
                    removeSpinner(document.getElementById("welcome-msg"));
                    //document.body.innerHTML += '<li>Error: New Author Not Inserted.' + event.target.errorCode + '</li>';
                    document.getElementById("welcome-msg").querySelector("UL").innerHTML += '<li>Error: New Author Not Inserted.' + event.target.errorCode + '</li>';
                }
            };
            request.onerror = function (event) {
                removeSpinner(document.getElementById("welcome-msg"));
                //document.body.innerHTML += '<li>Error when opening DB: ' + event.target.errorCode + '</li>';
                document.getElementById("welcome-msg").querySelector("UL").innerHTML += '<li>Error when opening DB: ' + event.target.errorCode + '</li>';
            }
        }
    ).catch((err) => { document.getElementById("welcome-msg").querySelector("UL").innerHTML += '<li>Error: Cannot bring Guid from helloacm.com/api! ' + err + '.</li>'; }
    );
};
function getAuthorByID(authorID) {
    var request = window.indexedDB.open("articlesDB", 1);
    request.onsuccess = function (event) {
        //create db object    
        var db = request.result;
        //create 'transaction' object
        var myTransaction = db.transaction("authors", "readwrite");
        //link to the table named 'authors'
        var authorsStore = myTransaction.objectStore('authors');
        //create Request Object to get 'author' object from the 'authors' table
        //var getRequest = authorsStore.get(parseInt(authorID));//this functions returns the author object without the key
        var getRequest = authorsStore.get(authorID);

        getRequest.onsuccess = function (event) {
            if (event.target.result === undefined) {
                //author not found
                return undefined;
                //document.body.innerHTML += '<li>author not found</li>';
            }
            else {
                //return author object we've got
                return event.target.result;
                //document.body.innerHTML += '<li> Author Name: ' + event.target.result.name + " - Author Country: " + event.target.result.country + /*' - Author ID: ' + event.target.result.id +*/ '</li>';
                //alert("his key is: " + event.target.result.getKey());
            }
        }
        getRequest.onerror = function (event) {
            document.body.innerHTML += '<li>Error: Author Not Fetched. ' + event.target.errorCode + '</li>';
        }
    };
    request.onerror = function (event) {
        document.body.innerHTML += '<li>Error when opening DB: ' + event.target.errorCode + '</li>';
    }
}

function fetchGuidPromis(guidNumber) {
    //this function returns an array of guids
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
            //console.log(ourJsonData.guid[0]);
            //console.log(ourJsonData.guid[0].slice(1, ourJsonData.guid[0].length - 1));
            //resolve(ourJsonData.guid[0].slice(1, ourJsonData.guid[0].length - 1));
            resolve(ourJsonData.guid);
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
    //this function is fired when user clicks to hide the welcome msg
    //it will:
    //1- hide welcome msg
    //2- inject a spinner
    //3- bring all articles from indexedDB
    //4- fill data brought from indexedDB in article-container elements and append them to .main-content element
    //5- remove spinner

    //1-
    document.getElementById("welcome-screen").style.display = "none";
    //2-
    injectSpinner(document.getElementsByClassName("main-content")[0], "br");
    //3-4-5-
    bringAllArticles().then(function(response){
        console.log(response);
        //writeArticles(response);
    });//.then(removeSpinner(document.getElementsByClassName("main-content")[0]));
}
function removeSpinner(elt){    
    elt.removeChild(elt.querySelector(".spinner"));
}
function injectSpinner(elt, before){
    let spinner = document.createElement("div");
    spinner.classList.add("spinner");
    elt.insertBefore(spinner, elt.querySelector(before).nextSibling);
}

function bringAllArticles(){
    //this function returns a promiss
    //it will bring all articles from indexedDB
    return new Promise(function (resolve, reject){
        var request = window.indexedDB.open("articlesDB", 1);
        request.onsuccess = function (event) {
            var db = request.result;
            var myTransaction = db.transaction("articles", "readwrite");
            var articlesStore = myTransaction.objectStore('articles');
            var getRequest = articlesStore.getAll();
    
            getRequest.onsuccess = function (event) {
                if (event.target.result === undefined) {
                    reject(undefined);
                }
                else {
                    //return articles object we've got
                    resolve(event.target.result);
                }
            }
            getRequest.onerror = function (event) {
                reject(event.target.errorCode);
            }
        };
        request.onerror = function (event) {
            reject(event.target.errorCode);
        }
    });
}

