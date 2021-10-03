document.getElementById("main-menu-mobile").style.visibility = 'hidden';

for(let i = 0; i < get.length; i++){
    let data = get[i].split("=");
    if(data[0] == "category"){
        if(!categories.includes(decodeURIComponent(data[1]))) window.location = "?category=internet";
        document.getElementById("category").innerHTML = decodeURIComponent(data[1].toUpperCase());
        document.getElementById("desktop-menu-" + data[1]).className = "bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md";
        document.getElementById("mobile-menu-" + data[1]).className = "bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md";

        let json = JSON.parse(localStorage.getItem(decodeURIComponent(data[1])));
        let html = "";
        for(let i = 0; i < Object.keys(json).length; i++){
            let id = Object.keys(json)[i];
            html += "<li class='col-span-1 text-gray-300 rounded-lg shadow divide-y divide-gray-200 bg-gray-800'>";
            html += "<a href='?app=" + id + "'>";
            html += "<div class='w-full text-center justify-between p-6'>";
            html += "<img class='w-24 h-24 bg-gray-700 rounded-full mx-auto' src='" + json[id].icon + "' alt='" + json[id].name + "'>"
            html += "<h1 class='text-2xl mt-2'>" + json[id].name + "</h1>";
            html += "<span class='text-gray-500'>" + json[id].description.short + "</span></div></a></li>";
        }
        document.getElementById("app-list").innerHTML = html;
    }else if(data[0] == "app"){
        for(let i = 0; i < categories.length; i++){
            let json = JSON.parse(localStorage.getItem(categories[i]));
            if(Object.keys(json).includes(data[1])){
                document.getElementById("category").innerHTML = json[data[1]].name + " <span class='inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800'>" + json[data[1]].license + "</span>";

                let html = "";
                html += "<p class='text-gray-400'>" + json[data[1]].description.short + "</p>";
                html += "<ul role='list' class='mt-3 space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8'>";
                for(let i = 0; i < json[data[1]].images.length; i++){
                    html += "<li><div class='space-y-4'><div class='aspect-w-3 aspect-h-2'>";
                    html += "<img class='object-cover shadow-lg rounded-lg' wight='550' src='" + json[data[1]].images[i] + "' />";
                    html += "</div></div></li>";
                }
                html += "</ul>";

                //Download
                html += "<h2 class='mt-3 mb-3 text-2xl font-semibold text-gray-300'>Download</h2>";
                html += "<div class='bg-gray-600 shadow overflow-hidden sm:rounded-md'><ul role='list' class='divide-y divide-gray-500'>";
                let osKeys = Object.keys(json[data[1]].os);
                for(let i = 0; i < osKeys.length; i++){
                    html += "<li><a id='download-" + osKeys[i].replace(" ", "-") + "' href='#' class='block hover:bg-gray-500'><div class='flex items-center px-4 py-4 sm:px-6'><div class='min-w-0 flex-1 flex items-center'><p>" + osKeys[i] + "</p></div><div><svg class='h-5 w-5 text-gray-400' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'><path fill-rule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' clip-rule='evenodd' /></svg></div></div></a></li>";
                    html += "<li id='download-versions-" + osKeys[i].replace(" ", "-") + "' class='hidden'><div class='px-4 py-4 sm:px-6'><div class=''>";

                    html += "<div class='bg-gray-500 shadow overflow-hidden sm:rounded-md'><ul role='list' class='divide-y divide-gray-500'>";
                    let versionKeys = Object.keys(json[data[1]].os[osKeys[i]].versions);
                    for(let j = 0; j < versionKeys.length; j++){
                        html += "<li><a id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "' href='#' class='block hover:bg-gray-500'><div class='flex items-center px-4 py-4 sm:px-6'><div class='min-w-0 flex-1 flex items-center'><p class='text-gray-200'>" + versionKeys[j] + "</p></div>";

                        
                        if(typeof(json[data[1]].os[osKeys[i]].microsoftstore) == 'string') html += "<div><svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-microsoftstore" + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><title>Microsoft Store</title><path d='M17.8 20l-12 -1.5c-1 -.1 -1.8 -.9 -1.8 -1.9v-9.2c0 -1 .8 -1.8 1.8 -1.9l12 -1.5c1.2 -.1 2.2 .8 2.2 1.9v12.1c0 1.2 -1.1 2.1 -2.2 1.9z' />  <line x1='12' y1='5' x2='12' y2='19' />  <line x1='4' y1='12' x2='20' y2='12' /></svg></div>";
                        
                        if(typeof(json[data[1]].os[osKeys[i]].googleplay) == 'string') html += "<div><svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-googleplay" + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><title>Google Play</title><path d='M4 3.71v16.58a0.7 .7 0 0 0 1.05 .606l14.622 -8.42a0.55 .55 0 0 0 0 -.953l-14.622 -8.419a0.7 .7 0 0 0 -1.05 .607z' /><line x1='15' y1='9' x2='4.5' y2='20.5' /><line x1='4.5' y1='3.5' x2='15' y2='15' /></svg></div>";
                        
                        if(typeof(json[data[1]].os[osKeys[i]].chromewebstore) == 'string') html += "<div><svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-chromewebstore" + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><title>Chrome Web Store</title><circle cx='12' cy='12' r='9' /><circle cx='12' cy='12' r='3' /><line x1='12' y1='9' x2='20.4' y2='9' /><line x1='12' y1='9' x2='20.4' y2='9' transform='rotate(120 12 12)' /><line x1='12' y1='9' x2='20.4' y2='9' transform='rotate(240 12 12)' /></svg></div>";
                        if(typeof(json[data[1]].os[osKeys[i]].firefoxaddons) == 'string') html += "<div><svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-firefoxaddons" + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><title>Firefox Add-ons</title><path d='M4.028 7.82a9 9 0 1 0 12.823 -3.4c-1.636 -1.02 -3.064 -1.02 -4.851 -1.02h-1.647' /><path d='M4.914 9.485c-1.756 -1.569 -.805 -5.38 .109 -6.17c.086 .896 .585 1.208 1.111 1.685c.88 -.275 1.313 -.282 1.867 0c.82 -.91 1.694 -2.354 2.628 -2.093c-1.082 1.741 -.07 3.733 1.371 4.173c-.17 .975 -1.484 1.913 -2.76 2.686c-1.296 .938 -.722 1.85 0 2.234c.949 .506 3.611 -.995 4.545 .354c-1.698 .102 -1.536 3.107 -3.983 2.727c2.523 .957 4.345 .462 5.458 -.34c1.965 -1.52 2.879 -3.542 2.879 -5.557c-.014 -1.398 .194 -2.695 -1.26 -4.75' /></svg></div>";

                        if(typeof(json[data[1]].os[osKeys[i]].snapcraft) == 'string') html += "<div><svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-snapcraft" + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><title>SnapCraft</title><path d='M13.804 13.367V5.69l5.292 2.362-5.292 5.315zM3.701 23.514l6.49-12.22 2.847 2.843L3.7 23.514zM0 .486l13.355 4.848v8.484L0 .486zM21.803 5.334H14.11L24 9.748z'/></svg></div>";

                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].download) == 'string') html += "<div><svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-download" + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><title>Download</title><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2' /><polyline points='7 11 12 16 17 11' /><line x1='12' y1='4' x2='12' y2='16' /></svg></div>";
                        if(typeof(json[data[1]].os[osKeys[i]].sourcecode) == 'string') html += "<div><svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-sourcecode" + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><title>Source Code</title><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path stroke='none' d='M0 0h24v24H0z' fill='none'/><polyline points='7 8 3 12 7 16' /><polyline points='17 8 21 12 17 16' /><line x1='14' y1='4' x2='10' y2='20' /></svg></div>";
                        if(typeof(json[data[1]].os[osKeys[i]].issuetracker) == 'string') html += "<div><svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-issuetracker" + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><title>Issue Tracker</title><path d='M9 9v-1a3 3 0 0 1 6 0v1' /><path d='M8 9h8a6 6 0 0 1 1 3v3a5 5 0 0 1 -10 0v-3a6 6 0 0 1 1 -3' /><line x1='3' y1='13' x2='7' y2='13' /><line x1='17' y1='13' x2='21' y2='13' /><line x1='12' y1='20' x2='12' y2='14' /><line x1='4' y1='19' x2='7.35' y2='17' /><line x1='20' y1='19' x2='16.65' y2='17' /><line x1='4' y1='7' x2='7.75' y2='9.4' /><line x1='20' y1='7' x2='16.25' y2='9.4' /></svg></div>";


                        html += "</div><div id='changelog-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "' class='hidden changelog p-4 text-gray-200 border-t-2'>" + json[data[1]].os[osKeys[i]].versions[versionKeys[j]].changelog + "</div></a></li>";
                    }
                    html += "</ul></div>";


                    html += "</div></li>";
                }
                html += "</ul></div>";

                //Description
                html += "<h2 class='mt-3 mb-3 text-2xl font-semibold text-gray-300'>Description</h2>";
                html += "<p class='text-gray-400'>" + json[data[1]].description.long + "</p>";

                //Donations
                html += "<h2 class='mt-3 mb-3 text-2xl font-semibold text-gray-300'>Donation</h2>";
                html += "<p class='text-gray-400'><ul>";
                let donationKeys = Object.keys(json[data[1]].donations);
                for(let i = 0; i < donationKeys.length; i++){
                    let value = json[data[1]].donations[donationKeys[i]];
                    if(typeof(value) != 'string') continue;
                    if(value.startsWith("https://")){
                        html += "<li>" + donationKeys[i] + ": <a class='text-blue-400' target='_blank' href='" + value + "'>" + value + "</a>";
                        continue;
                    }
                    html += "<li>" + donationKeys[i] + ": " + value;
                }
                html += "</ul></p>";

                //Contact
                html += "<h2 class='mt-3 mb-3 text-2xl font-semibold text-gray-300'>Contact</h2>";
                html += "<p class='text-gray-400'><ul>";

                if(typeof(json[data[1]].developer) != 'undefined') html += "<li class='mb-3'>" + json[data[1]].developer;
                if(typeof(json[data[1]].website) != 'undefined') html += "<li>Website: <a class='text-blue-400' target='_blank' href='" + json[data[1]].website + "'>" + json[data[1]].website + "</a>";

                let contactKeys = Object.keys(json[data[1]].contacts);
                for(let i = 0; i < contactKeys.length; i++){
                    let value = json[data[1]].contacts[contactKeys[i]];
                    if(typeof(value) != 'string') continue;
                    if(value.startsWith("https://")){
                        html += "<li>" + contactKeys[i] + ": <a class='text-blue-400' target='_blank' href='" + value + "'>" + value + "</a>";
                        continue;
                    }
                    if(isEmailValid(value)){
                        html += "<li>" + contactKeys[i] + ": <a class='text-blue-400' target='_blank' href='mailto:" + value + "'>" + value + "</a>";
                        continue;
                    }
                    html += "<li>" + contactKeys[i] + ": " + value;
                }
                html += "</ul></p>";

                document.getElementById("main-page").innerHTML = html;

                for(let i = 0; i < osKeys.length; i++){
                    document.getElementById("download-" + osKeys[i].replace(" ", "-")).addEventListener('click', () => {
                        if(document.getElementById("download-versions-" + osKeys[i].replace(" ", "-")).className == "hidden"){
                            document.getElementById("download-versions-" + osKeys[i].replace(" ", "-")).className = "";
                        }else{
                            document.getElementById("download-versions-" + osKeys[i].replace(" ", "-")).className = "hidden";
                        }
                    });

                    let versionKeys = Object.keys(json[data[1]].os[osKeys[i]].versions);
                    for(let j = 0; j < versionKeys.length; j++){

                        document.getElementById("download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-")).addEventListener('click', () => {
                            if(document.getElementById("changelog-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-")).className == "hidden changelog p-4 text-gray-200 border-t-2"){
                                document.getElementById("changelog-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-")).className = "changelog p-4 text-gray-200 border-t-2";
                            }else{
                                document.getElementById("changelog-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-")).className = "hidden changelog p-4 text-gray-200 border-t-2";
                            }
                        });

                        if(typeof(json[data[1]].os[osKeys[i]].microsoftstore) == 'string'){
                            document.getElementById("download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-microsoftstore").addEventListener('click', () => {
                                window.open(json[data[1]].os[osKeys[i]].microsoftstore,'_blank');
                            });
                        }
                        if(typeof(json[data[1]].os[osKeys[i]].googleplay) == 'string'){
                            document.getElementById("download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-googleplay").addEventListener('click', () => {
                                window.open(json[data[1]].os[osKeys[i]].googleplay,'_blank');
                            });
                        }
                        if(typeof(json[data[1]].os[osKeys[i]].chromewebstore) == 'string'){
                            document.getElementById("download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-chromewebstore").addEventListener('click', () => {
                                window.open(json[data[1]].os[osKeys[i]].chromewebstore,'_blank');
                            });
                        }
                        if(typeof(json[data[1]].os[osKeys[i]].firefoxaddons) == 'string'){
                            document.getElementById("download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-firefoxaddons").addEventListener('click', () => {
                                window.open(json[data[1]].os[osKeys[i]].firefoxaddons,'_blank');
                            });
                        }
                        if(typeof(json[data[1]].os[osKeys[i]].snapcraft) == 'string'){
                            document.getElementById("download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-snapcraft").addEventListener('click', () => {
                                window.open(json[data[1]].os[osKeys[i]].snapcraft,'_blank');
                            });
                        }
                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].download) == 'string'){
                            document.getElementById("download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-download").addEventListener('click', () => {
                                window.open(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].download,'_blank');
                            });
                        }
                        if(typeof(json[data[1]].os[osKeys[i]].sourcecode) == 'string'){
                            document.getElementById("download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-sourcecode").addEventListener('click', () => {
                                window.open(json[data[1]].os[osKeys[i]].sourcecode,'_blank');
                            });
                        }
                        if(typeof(json[data[1]].os[osKeys[i]].issuetracker) == 'string'){
                            document.getElementById("download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-issuetracker").addEventListener('click', () => {
                                window.open(json[data[1]].os[osKeys[i]].issuetracker,'_blank');
                            });
                        }
                    }
                }
                break;
            }
        }
    }else if(data[0] == "search"){
        document.getElementById("category").innerHTML = decodeURIComponent(data[1].toUpperCase());
        let html = "";
        for(let i = 0; i < categories.length; i++){
            let json = JSON.parse(localStorage.getItem(categories[i]));
            for(let i = 0; i < Object.keys(json).length; i++){
                let id = Object.keys(json)[i];

                if(json[id].name.toLowerCase().startsWith(data[1].toLowerCase()) || id.toLowerCase().startsWith(data[1].toLowerCase())){
                    html += "<li class='col-span-1 text-gray-300 rounded-lg shadow divide-y divide-gray-200 bg-gray-800'>";
                    html += "<a href='?app=" + id + "'>";
                    html += "<div class='w-full text-center justify-between p-6'>";
                    html += "<img class='w-24 h-24 bg-gray-700 rounded-full mx-auto' src='" + json[id].icon + "' alt='" + json[id].name + "'>"
                    html += "<h1 class='text-2xl mt-2'>" + json[id].name + "</h1>";
                    html += "<span class='text-gray-500'>" + json[id].description.short + "</span></div></a></li>";
                }
            }
        }
        document.getElementById("app-list").innerHTML = html;
    }else{
        document.getElementById("category").innerHTML = "APPLICATIONS";
        let html = "";
        for(let i = 0; i < categories.length; i++){
            let json = JSON.parse(localStorage.getItem(categories[i]));
            for(let i = 0; i < Object.keys(json).length; i++){
                let id = Object.keys(json)[i];
                html += "<li class='col-span-1 text-gray-300 rounded-lg shadow divide-y divide-gray-200 bg-gray-800'>";
                html += "<a href='?app=" + id + "'>";
                html += "<div class='w-full text-center justify-between p-6'>";
                html += "<img class='w-24 h-24 bg-gray-700 rounded-full mx-auto' src='" + json[id].icon + "' alt='" + json[id].name + "'>"
                html += "<h1 class='text-2xl mt-2'>" + json[id].name + "</h1>";
                html += "<span class='text-gray-500'>" + json[id].description.short + "</span></div></a></li>";
            }
        }
        document.getElementById("app-list").innerHTML = html;
    }

}

document.getElementById("open-main-menu-btn").addEventListener('click', () => {
    toggleMenu();
});

document.getElementById("close-main-menu-btn").addEventListener('click', () => {
    toggleMenu();
});

document.getElementById("logo-desktop").addEventListener('click', () => {
    window.location = window.location.origin;
});

document.getElementById("logo-phone").addEventListener('click', () => {
    window.location = window.location.origin;
});

document.getElementById("submit-application-btn").addEventListener('click', () => {
    window.open("https://github.com/Rabbit-Company/RabbitStore-Server/issues/new?assignees=zigazajc007&labels=application+request&template=application-request.md&title=%5BApplication+Request%5D", "_blank");
});