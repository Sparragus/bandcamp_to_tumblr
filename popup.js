var bg = chrome.extension.getBackgroundPage();
var div = document.createElement("div");
div.textContent = JSON.stringify(bg.trackInfo);
document.body.appendChild(div);
