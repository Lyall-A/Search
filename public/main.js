const inputElement = document.getElementById("input");
const bookmarksElement = document.getElementById("bookmarks");

inputElement.placeholder = `Search ${config.searchEngine.name} or enter URL...`;

for (const bookmark of bookmarks) {
    const bookmarkElement = document.createElement("div");
    bookmarkElement.id = `bookmark-${bookmark.id}`;
    bookmarkElement.classList.add("bookmark");

    if (bookmark.type === "folder") {
        bookmarkElement.classList.add("folder");
        bookmarkElement.innerHTML = bookmark.name;

        const bookmarkFolderContentsElement = document.createElement("div");
        bookmarkFolderContentsElement.classList.add("folder-contents");

        bookmarkElement.appendChild(bookmarkFolderContentsElement);
    } else if (bookmark.type === "link") {
        bookmarkElement.classList.add("link");
        bookmarkElement.innerHTML = bookmark.name;

        const bookmarkLinkElement = document.createElement("a");
        bookmarkLinkElement.href = bookmark.url;

        const bookmarkLinkImgElement = document.createElement("img");
        bookmarkLinkImgElement.src = bookmark.icon || "/assets/default-icon.png";
        bookmarkLinkImgElement.classList.add("icon");

        bookmarkLinkElement.appendChild(bookmarkLinkImgElement);

        bookmarkElement.appendChild(bookmarkLinkElement);
    }

    (typeof bookmark.parent === "number" ? document.getElementById(`bookmark-${bookmark.parent}`).getElementsByClassName("folder-contents").item(0) : bookmarksElement).appendChild(bookmarkElement);
}

function search() {
    const input = inputElement.value;
    if (!input.trim()) return;
    if (input.match(/https?:\/\/.+/)) {
        location.href = input;
    } else {
        location.href = `${config.searchEngine.urlPrefix || ""}${input.split("").map(i => config.searchEngine.querySubstitues[i] || encodeURIComponent(i)).join("")}${config.searchEngine.urlSuffix || ""}`;
    }
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}