var get = window.location.search.substr(1).split("&");
var categories = ["internet", "system", "multimedia", "games", "science & education", "navigation", "connectivity", "reading", "writing", "time", "security", "theming", "development", "sports & health", "money", "phone & sms", "graphics"];

for(let i = 0; i < categories.length; i++){
    let jsonApp = localStorage.getItem(categories[i]);
    let jsonTime = localStorage.getItem(categories[i] + "-time");

    if(typeof(jsonApp) == 'undefined' || jsonApp == null){
        fetchAppData(categories[i]);
        continue;
    }
    if(typeof(jsonTime) == 'undefined' || jsonTime == null){
        fetchAppData(categories[i]);
        continue;
    }
   
    try{
        JSON.parse(jsonApp);
    }catch (e){
        localStorage.setItem(category, "{}");
        localStorage.setItem(category + "-time", 0);
        fetchAppData(categories[i]);
        continue;
    }

    if(Number(jsonTime) + 3600000 < Date.now()){
        fetchAppData(categories[i]);
        continue;
    }
}

function hide(element){
    document.getElementById(element).style.visibility = 'hidden';
}

function show(element){
    document.getElementById(element).style.visibility = 'visible';
}

function isHidden(element){
    return (document.getElementById(element).style.visibility == 'hidden');
}

function setText(element, text){
    document.getElementById(element).innerText = text;
}

function isEmailValid(mail){
    return new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(mail);
}

function toggleMenu(){
    if(document.getElementById("main-menu-mobile").style.visibility == 'hidden'){
        document.getElementById("main-menu-mobile").style.visibility = 'visible';
    }else{
        document.getElementById("main-menu-mobile").style.visibility = 'hidden';
    }
}

function fetchAppData(category){

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://raw.githubusercontent.com/Rabbit-Company/RabbitStore-Server/main/categories/" + category + "/apps.json");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200) return;
            try {
                JSON.parse(xhr.responseText);
                localStorage.setItem(category, xhr.responseText);
                localStorage.setItem(category + "-time", Date.now());
                location.reload();
            } catch (e) {
                localStorage.setItem(category, "{}");
                localStorage.setItem(category + "-time", 0);
            }
        }

    };
    xhr.send();
}