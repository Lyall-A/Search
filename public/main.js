const queryElement = document.getElementById("query");

function search() {
    location.href = `https://www.google.com/search?q=${encodeURIComponent(queryElement.value)}`;
}