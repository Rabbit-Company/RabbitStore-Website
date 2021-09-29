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
                        html += "<li><a id='download-version-" + versionKeys[j].replace(" ", "-") + "' href='#' class='block hover:bg-gray-500'><div class='flex items-center px-4 py-4 sm:px-6'><div class='min-w-0 flex-1 flex items-center'><p>" + versionKeys[j] + "</p></div><div>";

                        if(osKeys[i] == "Windows"){
                            html += "<svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/>  <path d='M17.8 20l-12 -1.5c-1 -.1 -1.8 -.9 -1.8 -1.9v-9.2c0 -1 .8 -1.8 1.8 -1.9l12 -1.5c1.2 -.1 2.2 .8 2.2 1.9v12.1c0 1.2 -1.1 2.1 -2.2 1.9z' />  <line x1='12' y1='5' x2='12' y2='19' />  <line x1='4' y1='12' x2='20' y2='12' /></svg>";
                        }else if(osKeys[i] == "Linux"){
                            html += "<svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path d='M12.503 0c-.155 0-.315.008-.479.021-4.227.333-3.106 4.807-3.17 6.298-.077 1.093-.3 1.954-1.051 3.021-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489-.039.034-.076.068-.111.135-.26.268-.449.601-.662.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.681-.09.188-.136.393-.132.601 0 .199.027.401.055.536.058.399.116.729.039.97-.248.68-.279 1.146-.105 1.485.174.334.535.469.939.601.811.2 1.91.135 2.775.599.926.467 1.866.671 2.616.47.526-.115.97-.463 1.208-.945.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.578.199.025.135.063.199.114.334l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.199-.812-.714-1.377v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135-.056-.038-.121-.062-.19-.064.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.561-3.369.027-2.152.237-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.191.135.33.332.439.533.105.259.158.459.166.724 0-.02.006-.04.006-.059v.104c-.002-.007-.004-.015-.004-.021l-.004-.024c-.002.243-.053.483-.15.706-.047.125-.119.24-.213.335-.029-.016-.057-.03-.088-.042-.105-.045-.199-.064-.285-.133-.071-.028-.145-.051-.219-.066.049-.059.145-.133.182-.198.053-.128.082-.264.088-.402v-.019c.002-.135-.018-.271-.061-.4-.045-.135-.101-.201-.183-.334-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132-.095.094-.166.207-.205.334-.053.127-.084.264-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202-.01-.065-.016-.132-.018-.199v-.02c-.008-.264.043-.526.15-.769.082-.219.232-.406.43-.533.171-.129.379-.199.594-.199zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.141.401.153.667v.004c.007.134.006.201-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.089.013-.179.003-.267v-.015c-.012-.133-.039-.199-.082-.333-.031-.102-.088-.193-.166-.267-.049-.045-.115-.068-.183-.064h-.021c-.071.006-.13.041-.186.132-.064.077-.105.171-.12.27-.027.108-.035.219-.023.331v.014c.012.135.037.201.081.334.045.134.097.2.165.268.011.009.021.018.034.024-.07.057-.117.07-.176.136-.037.028-.08.06-.131.068-.104-.125-.196-.26-.275-.402-.096-.21-.146-.438-.155-.667-.017-.226.011-.452.08-.668.055-.197.152-.379.283-.535.128-.133.26-.2.418-.2zm1.371 1.706c.331 0 .732.065 1.215.399.293.2.523.269 1.053.468h.003c.255.136.405.266.478.399v-.131c.073.147.078.318.016.47-.123.311-.516.644-1.064.843v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267-.152.008-.305-.015-.448-.067-.11-.06-.218-.126-.322-.198-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.711-.069-.268-.005-.469.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.469.839-.601.139-.036.294-.065.466-.065zm2.799 2.143c.359 1.417 1.197 3.475 1.736 4.473.286.534.855 1.659 1.102 3.024.156-.005.329.018.513.064.646-1.671-.546-3.467-1.089-3.966-.221-.201-.232-.335-.123-.335.589.534 1.365 1.572 1.646 2.757.129.535.159 1.104.021 1.67.067.028.135.061.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.061-.003-.12 0-.181 0h-.015c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.771.465-.007.043-.012.066-.017.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.021.334-.171.838-.319 1.351-1.5 1.072-3.58 1.538-5.349.334-.111-.193-.246-.374-.402-.533-.074-.125-.168-.237-.275-.334.182 0 .338-.029.465-.067.145-.067.257-.188.314-.334.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.399-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.141 2.497-.122 3.854.038-.989.258-1.965.647-2.876.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.211.201.477.335.876.335.039.003.075.006.111.006.411 0 .729-.134.996-.268.29-.134.521-.334.74-.4h.005c.467-.135.836-.402 1.045-.7zm2.186 8.958c.037.601.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.009c.315-.008.577.01.847.267l.003.003c.208.199.305.531.391.876.085.401.154.78.409 1.066.486.527.645.906.636 1.14l.003-.006v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.57-.618.737-1.371 1.139-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.401-.12-1.025.056-1.69.176-.668.428-1.345.463-1.898.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022zm-10.815.049h.01c.053 0 .105.005.157.014.376.055.706.333 1.023.752l.91 1.664.003.003c.243.533.754 1.064 1.189 1.638.434.598.77 1.131.729 1.57v.006c-.057.744-.479 1.148-1.125 1.294-.645.135-1.52.002-2.395-.464-.968-.536-2.118-.469-2.857-.602-.369-.066-.611-.201-.723-.401-.111-.199-.113-.601.123-1.23v-.003l.002-.003c.117-.334.03-.753-.027-1.119-.055-.401-.083-.709.043-.94.16-.334.396-.399.689-.533.295-.135.641-.202.916-.469h.002v-.003c.256-.268.445-.601.668-.838.19-.201.38-.336.663-.336zm7.159-9.074c-.435.201-.945.535-1.488.535-.542 0-.97-.267-1.279-.466-.155-.134-.28-.268-.374-.335-.164-.134-.144-.334-.074-.334.109.016.129.135.199.201.096.066.215.199.361.333.291.2.68.467 1.166.467.485 0 1.053-.267 1.398-.466.195-.135.445-.334.648-.467.156-.137.149-.268.279-.268.129.016.034.134-.147.333-.181.135-.461.335-.69.468v-.001zm-1.082-1.584V5.64c-.006-.019.013-.042.029-.05.074-.043.18-.027.26.004.063 0 .16.067.15.135-.006.049-.085.066-.135.066-.055 0-.092-.043-.141-.068-.052-.018-.146-.008-.163-.065zm-.551 0c-.02.058-.113.049-.166.066-.047.025-.086.068-.139.068-.051 0-.131-.019-.137-.068-.009-.066.088-.133.15-.133.081-.031.184-.047.259-.005.019.009.036.03.03.05v.021h.003z'/></svg>"
                        }else if(osKeys[i] == "Android"){
                            html += "<svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><line x1='4' y1='10' x2='4' y2='16' /><line x1='20' y1='10' x2='20' y2='16' /><path d='M7 9h10v8a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-8a5 5 0 0 1 10 0' /><line x1='8' y1='3' x2='9' y2='5' /><line x1='16' y1='3' x2='15' y2='5' /><line x1='9' y1='18' x2='9' y2='21' /><line x1='15' y1='18' x2='15' y2='21' /></svg>"
                        }else if(osKeys[i] == "Browser Extension"){
                            html += "<svg id='download-" + osKeys[i].replace(" ", "-") + "-version-" + versionKeys[j].replace(" ", "-") + "' xmlns='http://www.w3.org/2000/svg' class='text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md' width='44' height='44' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='12' cy='12' r='9' /><circle cx='12' cy='12' r='3' /><line x1='12' y1='9' x2='20.4' y2='9' /><line x1='12' y1='9' x2='20.4' y2='9' transform='rotate(120 12 12)' /><line x1='12' y1='9' x2='20.4' y2='9' transform='rotate(240 12 12)' /></svg>"
                        }

                        html += "</div></div></a></li>";
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
                            if(osKeys[i] == "Windows"){
                                window.open(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].exe,'_blank');
                            }else if(osKeys[i] == "Linux"){
                                
                            }else if(osKeys[i] == "Android"){
                                window.open(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].apk,'_blank');
                            }else if(osKeys[i] == "Browser Extension"){
                                window.open(json[data[1]].os[osKeys[i]].versions[versionKeys[j]].chromium,'_blank');
                            }
                        });
                    }
                }
                break;
            }
        }
    }

}

document.getElementById("open-main-menu-btn").addEventListener('click', () => {
    toggleMenu();
});

document.getElementById("close-main-menu-btn").addEventListener('click', () => {
    toggleMenu();
});