// Initial hard-coded database
let dublinDB = [
"Dublin, IE", 
"Dublin, California, US", 
"Dublin, Georgia, US", 
"Dublin, Texas, US", 
"Dublin, Ohio, US"
]

let selected = null; // Keeps track of whether a suggestion has been selected

// Import HTML elements
const search = document.getElementById("search");
const searchSuggest = document.getElementById("searchSuggest");
const searchGroup = document.getElementById("search-group")

// Responsive autosuggestions
search.addEventListener("input", (e) => {
    removeElements(); // Cleans suggestions every new query
    removeInvalid(); // Removes invalid message once typing again
    let boxHeight = 40; // Initial height for responsive box

    // Creates a new suggested <li> matching what is typed
    for (let city of dublinDB) {
        if (city.toLowerCase().startsWith(search.value.toLowerCase()) && search.value != "") {
            let listItem = document.createElement("li");
            listItem.classList.add("list-items");
            listItem.style.cursor = "pointer";
            listItem.setAttribute("onclick", "displayNames('" + city + "')");
            listItem.innerHTML = city;
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

// When a suggestion is clicked, selects only it
function displayNames(value) {
    selected = value; // Track the clicked suggestion
    search.value = value;
    removeElements();
    searchGroup.style.height = "40px";
}

// Validate that entered input is in database, else make warning
function validateCity(entry) {
    let isValid = false;
    for (let city of dublinDB) {
        if (entry.toLowerCase() === city.toLowerCase()) {
            isValid = true;
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