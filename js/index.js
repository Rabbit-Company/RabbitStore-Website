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