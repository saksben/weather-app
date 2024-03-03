// Initial hard-coded database
let dublinDB = [
"Dublin, IE", 
"Dublin, California, US", 
"Dublin, Georgia, US", 
"Dublin, Texas, US", 
"Dublin, Ohio, US"
]

// Import HTML elements
const search = document.getElementById("search");
const searchSuggest = document.getElementById("searchSuggest");
const searchGroup = document.getElementById("search-group")

// Responsive autosuggestions
search.addEventListener("keyup", (e) => {
    removeElements(); // Cleans suggestions every new query
    let boxHeight = 40; // Initial height for responsive box

    // Creates a new suggested <li> matching what is typed
    for (let i of dublinDB) {
        if (i.toLowerCase().startsWith(search.value.toLowerCase()) && search.value != "") {
            let listItem = document.createElement("li");
            listItem.classList.add("list-items");
            listItem.style.cursor = "pointer";
            listItem.setAttribute("onclick", "displayNames('" + i + "')");
            listItem.innerHTML = i;
            searchSuggest.appendChild(listItem);

            boxHeight += 42; // Responsive box height per <li>
        }
    }

    searchGroup.style.height = boxHeight + "px";
});

// Cleans input when Enter is pressed and puts cursor in field
search.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        search.value = "";
        search.focus();
    }
})

// When a suggestion is clicked, selects only it
function displayNames(value) {
    search.value = value;
    removeElements();
    searchGroup.style.height = "40px";
}

// Removes autosuggestions
function removeElements() {
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
        item.remove();
    })
}