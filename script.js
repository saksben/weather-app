// Initial hard-coded database
let dublinDB = [
["Dublin, IE", 11, "Rainy", 83, 11, 17], 
["Dublin, California, US", 12, "Clear", 84, 12, 18], 
["Dublin, Georgia, US", 13, "Snowy", 85, 13, 19], 
["Dublin, Texas, US", 14, "Cloudy", 86, 14, 20], 
["Dublin, Ohio, US", 15, "Stormy", 87, 15, 21]
]

let selected = null; // Keeps track of whether a suggestion has been selected

// Import HTML elements
const search = document.getElementById("search");
const searchSuggest = document.getElementById("searchSuggest");
const searchGroup = document.getElementById("search-group");
const profileBox = document.getElementById("profileBox");
const mainBox = document.getElementById("mainBox");
const mainIcon = document.getElementById("mainIcon");
const mainStats = document.getElementById("mainStats");
const nameBox = document.getElementById("nameBox");
const nameIcon = document.getElementById("nameIcon");
const nameText = document.getElementById("nameText");
const statsBox = document.getElementById("statsBox");
const humidBox = document.getElementById("humidBox");
const humidIcon = document.getElementById("humidIcon");
const humidStats = document.getElementById("humidStats");
const feelsBox = document.getElementById("feelsBox");
const feelsIcon = document.getElementById("feelsIcon");
const feelsStats = document.getElementById("feelsStats");
const windBox = document.getElementById("windBox");
const windIcon = document.getElementById("windIcon");
const windStats = document.getElementById("windStats");

// Responsive autosuggestions
search.addEventListener("input", (e) => {
    removeElements(); // Cleans suggestions every new query
    removeInvalid(); // Removes invalid message once typing again
    removeProfile(); // Removes profile
    let boxHeight = 40; // Initial height for responsive box

    // Creates a new suggested <li> matching what is typed
    for (let city of dublinDB) {
        if (city[0].toLowerCase().startsWith(search.value.toLowerCase()) && search.value != "") {
            let listItem = document.createElement("li");
            listItem.classList.add("list-items");
            listItem.style.cursor = "pointer";
            listItem.setAttribute("onclick", "displayNames('" + city[0] + "')");
            listItem.innerHTML = city[0];
            searchSuggest.appendChild(listItem);

            boxHeight += 42; // Responsive box height per <li>
        }
    }
    searchGroup.style.height = boxHeight + "px";
});

// If Enter is pressed, validate typed and reset
search.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        if (selected) {
            search.value = selected;
            selected = null;
        }
        validateCity(search.value);
        search.value = "";
        search.focus();
    }
})

// When a suggestion is clicked, selects only it and calls profile generation
function displayNames(value) {
    selected = value; // Track the clicked suggestion
    search.value = "";
    search.focus();
    removeElements();
    searchGroup.style.height = "40px";

    for (let city of dublinDB) {
        if (city[0].toLowerCase() === value.toLowerCase()) {
            profile(city)
            break;
        }
    }
}

// Validate that entered input is in database, else make warning
function validateCity(entry) {
    let isValid = false;
    for (let city of dublinDB) {
        if (entry.toLowerCase() === city[0].toLowerCase()) {
            isValid = true;
            profile(city);
            break;
        }
    }

    // Warning message
    if (isValid === false) {
        let message = document.createElement("li");
        message.classList.add("invalid");
        message.innerHTML = "Invalid city name. Please, try again!"
        message.style.color = "red";
        removeElements();
        
        searchSuggest.appendChild(message);
        searchGroup.style.height = "80px";
    }
}

// Remove invalid message and reset
function removeInvalid() {
    let invalidList = document.querySelectorAll(".invalid");
    invalidList.forEach((invalid) => {
        invalid.remove();
    });
    searchGroup.style.height = "40px";
    search.removeEventListener("input", removeInvalid);
}

// Removes autosuggestions
function removeElements() {
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
        item.remove();
    })
}

// Removes profile
function removeProfile() {
    // Removes nodes
    let profiles = document.querySelectorAll(".weather-icon, .mainTemp, .mainWeather, .location-icon, .humidIconElement, .humidChance, .humidText, .feelsIconElement, .feelsTemp, .feelsText, .windIconElement, .windSpeed, .windText");
    nameText.innerHTML = "";
    profiles.forEach((profile) => {
        profile.remove();
    })

    // Sets all built-in nodes as classless; if these are removed like previous, they will not show up on subsequent searches
    profileBox.classList = "";
    mainStats.classList = "";
    mainIcon.classList = "";
    nameBox.classList = "";
    nameText.classList = "";
    statsBox.classList = "";
    humidBox.classList = "";
    humidStats.classList = "";
    humidIcon.classList = "";
    feelsBox.classList = "";
    feelsStats.classList = "";
    feelsIcon.classList = "";
    windBox.classList = "";
    windStats.classList = "";
    windIcon.classList = "";
}

// Creates city profile when selected
function profile(city) {
    searchGroup.style.height = "425px";
    profileBox.classList = "profileBox";

    // Main box
    mainBox.classList = "mainBox";
    mainStats.classList = "mainStats";
    mainIcon.classList = "mainIcon";

    let weatherIcon = document.createElement("div");
    weatherIcon.className = "weather-icon " + getWeatherIcon(city[2]);
    weatherIcon.style.backgroundImage = "url('./Weather App - Images/icons.png')";
    mainIcon.appendChild(weatherIcon);
    
    let mainTemp = document.createElement("h2");
    mainTemp.innerHTML = city[1] + "\u00B0" + "C";
    mainTemp.classList = "mainTemp";
    mainStats.appendChild(mainTemp);

    let mainWeather = document.createElement("h3");
    mainWeather.innerHTML = city[2];
    mainWeather.classList = "mainWeather";
    mainStats.appendChild(mainWeather);

    // Name box
    nameBox.classList = "nameBox";
    
    let locationIcon = document.createElement("img");
    locationIcon.src = "./Weather App - Images/location.png";
    locationIcon.className = "location-icon";
    nameIcon.appendChild(locationIcon);

    nameText.innerHTML = city[0];
    nameText.classList = "nameText"

    // Stats box
    statsBox.classList = "statsBox"
    // Humid box
    humidBox.classList = "stat";
    humidStats.classList = "statMini";

    let humidIconElement = document.createElement("img");
    humidIconElement.src = "./Weather App - Images/humidity.png"
    humidIconElement.classList = "humidIconElement";
    humidIcon.appendChild(humidIconElement);
    humidIcon.classList = "statIcon"

    let humidChance = document.createElement("h3");
    humidChance.innerHTML = city[3] + "%";
    humidStats.appendChild(humidChance);
    humidChance.classList = "statStat humidChance"

    let humidText = document.createElement("h4");
    humidText.innerHTML = "Humidity";
    humidStats.appendChild(humidText);
    humidText.classList = "statText humidText"

    // Feels Box
    feelsBox.classList = "stat";
    feelsStats.classList = "statMini";

    let feelsIconElement = document.createElement("img");
    feelsIconElement.src = "./Weather App - Images/temperature.png";
    feelsIconElement.classList = "feelsIconElement"
    feelsIcon.appendChild(feelsIconElement);
    feelsIcon.classList = "statIcon"

    let feelsTemp = document.createElement("h3");
    feelsTemp.innerHTML = city[4] + "\u00B0" + "C";
    feelsStats.appendChild(feelsTemp);
    feelsTemp.classList = "statStat feelsTemp"

    let feelsText = document.createElement("h4");
    feelsText.innerHTML = "Feels like";
    feelsStats.appendChild(feelsText);
    feelsText.classList = "statText feelsText"

    // Wind box
    windBox.classList = "stat";
    windStats.classList = "statMini";
    
    let windIconElement = document.createElement("img");
    windIconElement.src = "./Weather App - Images/wind.png";
    windIconElement.classList = "windIconElement"
    windIcon.appendChild(windIconElement);
    windIcon.classList = "statIcon"

    let windSpeed = document.createElement("h3");
    windSpeed.innerHTML = city[5] + " km/h";
    windStats.appendChild(windSpeed);
    windSpeed.classList = "statStat windSpeed"

    let windText = document.createElement("h4");
    windText.innerHTML = "Wind speed";
    windStats.appendChild(windText);
    windText.classList = "statText windText"
}

// Determines which weather icon to use per database
function getWeatherIcon(weather) {
    switch(weather.toLowerCase()) {
        case "clear":
            return "clear";
        case "cloudy":
            return "cloudy";
        case "snowy":
            return "snowy";
        case "rainy":
            return "rainy";
        case "stormy":
            return "stormy";
        default:
            return "stormy"
    }
}