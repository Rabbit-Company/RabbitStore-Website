document.getElementById("main-menu-mobile").style.visibility = 'hidden';

for(let i = 0; i < get.length; i++){
    let data = get[i].split("=");
    if(data[0] == "category"){
        if(!categories.includes(decodeURIComponent(data[1]))) window.location = "?category=internet";
        document.getElementById("category").innerHTML = decodeURIComponent(data[1].toUpperCase());
        document.getElementById("desktop-menu-" + data[1]).className = "bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md";
        document.getElementById("mobile-menu-" + data[1]).className = "bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md";

        let json = JSON.parse(localStorage.getItem(data[1]));
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

                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].exe) == 'string') html += "<div><svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-exe" + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/>  <path d='M17.8 20l-12 -1.5c-1 -.1 -1.8 -.9 -1.8 -1.9v-9.2c0 -1 .8 -1.8 1.8 -1.9l12 -1.5c1.2 -.1 2.2 .8 2.2 1.9v12.1c0 1.2 -1.1 2.1 -2.2 1.9z' />  <line x1='12' y1='5' x2='12' y2='19' />  <line x1='4' y1='12' x2='20' y2='12' /></svg></div>";
                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].apk) == 'string') html += "<div><svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-apk" + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><line x1='4' y1='10' x2='4' y2='16' /><line x1='20' y1='10' x2='20' y2='16' /><path d='M7 9h10v8a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-8a5 5 0 0 1 10 0' /><line x1='8' y1='3' x2='9' y2='5' /><line x1='16' y1='3' x2='15' y2='5' /><line x1='9' y1='18' x2='9' y2='21' /><line x1='15' y1='18' x2='15' y2='21' /></svg></div>";
                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].chromium) == 'string') html += "<div><svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-chromium" + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='12' cy='12' r='9' /><circle cx='12' cy='12' r='3' /><line x1='12' y1='9' x2='20.4' y2='9' /><line x1='12' y1='9' x2='20.4' y2='9' transform='rotate(120 12 12)' /><line x1='12' y1='9' x2='20.4' y2='9' transform='rotate(240 12 12)' /></svg></div>";
                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].firefox) == 'string') html += "<div><svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-firefox" + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M4.028 7.82a9 9 0 1 0 12.823 -3.4c-1.636 -1.02 -3.064 -1.02 -4.851 -1.02h-1.647' /><path d='M4.914 9.485c-1.756 -1.569 -.805 -5.38 .109 -6.17c.086 .896 .585 1.208 1.111 1.685c.88 -.275 1.313 -.282 1.867 0c.82 -.91 1.694 -2.354 2.628 -2.093c-1.082 1.741 -.07 3.733 1.371 4.173c-.17 .975 -1.484 1.913 -2.76 2.686c-1.296 .938 -.722 1.85 0 2.234c.949 .506 3.611 -.995 4.545 .354c-1.698 .102 -1.536 3.107 -3.983 2.727c2.523 .957 4.345 .462 5.458 -.34c1.965 -1.52 2.879 -3.542 2.879 -5.557c-.014 -1.398 .194 -2.695 -1.26 -4.75' /></svg></div>";

                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].deb) == 'string') html += "<div><svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-deb" + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2' /><polyline points='7 11 12 16 17 11' /><line x1='12' y1='4' x2='12' y2='16' /></svg></div>";
                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].rpm) == 'string') html += "<div><svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-rpm" + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2' /><polyline points='7 11 12 16 17 11' /><line x1='12' y1='4' x2='12' y2='16' /></svg></div>";
                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].snap) == 'string') html += "<div><svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-snap" + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2' /><polyline points='7 11 12 16 17 11' /><line x1='12' y1='4' x2='12' y2='16' /></svg></div>";
                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].appimage) == 'string') html += "<div><svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-appimage" + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2' /><polyline points='7 11 12 16 17 11' /><line x1='12' y1='4' x2='12' y2='16' /></svg></div>";
                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].ebuild) == 'string') html += "<div><svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-ebuild" + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2' /><polyline points='7 11 12 16 17 11' /><line x1='12' y1='4' x2='12' y2='16' /></svg></div>";


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
                            console.log("Clicked");
                            if(document.getElementById("changelog-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-")).className == "hidden changelog p-4 text-gray-200 border-t-2"){
                                document.getElementById("changelog-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-")).className = "changelog p-4 text-gray-200 border-t-2";
                            }else{
                                document.getElementById("changelog-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-")).className = "hidden changelog p-4 text-gray-200 border-t-2";
                            }
                        });

                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].exe) == 'string'){
                            document.getElementById("download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-exe").addEventListener('click', () => {
                                window.open(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].exe,'_blank');
                            });
                        }
                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].apk) == 'string'){
                            document.getElementById("download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-apk").addEventListener('click', () => {
                                window.open(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].apk,'_blank');
                            });
                        }
                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].chromium) == 'string'){
                            document.getElementById("download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-chromium").addEventListener('click', () => {
                                window.open(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].chromium,'_blank');
                            });
                        }
                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].firefox) == 'string'){
                            document.getElementById("download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-firefox").addEventListener('click', () => {
                                window.open(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].firefox,'_blank');
                            });
                        }
                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].deb) == 'string'){
                            document.getElementById("download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-deb").addEventListener('click', () => {
                                window.open(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].deb,'_blank');
                            });
                        }
                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].rpm) == 'string'){
                            document.getElementById("download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-rpm").addEventListener('click', () => {
                                window.open(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].rpm,'_blank');
                            });
                        }
                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].snap) == 'string'){
                            document.getElementById("download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-snap").addEventListener('click', () => {
                                window.open(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].snap,'_blank');
                            });
                        }
                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].appimage) == 'string'){
                            document.getElementById("download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-appimage").addEventListener('click', () => {
                                window.open(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].appimage,'_blank');
                            });
                        }
                        if(typeof(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].ebuild) == 'string'){
                            document.getElementById("download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "-file-ebuild").addEventListener('click', () => {
                                window.open(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].ebuild,'_blank');
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
    }

}

document.getElementById("open-main-menu-btn").addEventListener('click', () => {
    toggleMenu();
});

document.getElementById("close-main-menu-btn").addEventListener('click', () => {
    toggleMenu();
});