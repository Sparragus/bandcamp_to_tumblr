var trackInfo = {};

var getTags = function() {
  var tags = document.getElementsByClassName('tag'),
      result = [];
  for (var i = 0, tag; tag = tags[i]; i++) {
    result.push(tag.textContent);
  }

  return result;
};

var getInternalVariable = function(data) {
  // JS script injection, so that we can read the JS class 'InternalJSVariable'
  var internalScript;
  
  if(data === "EmbedData") {
    internalScript = function() {
        var textarea = document.getElementById('transfer-dom-area');
        textarea.value = JSON.stringify(window["EmbedData"]);
    };
  }
  else if(data === "BandData") {
    internalScript = function() {
        var textarea = document.getElementById('transfer-dom-area');
        textarea.value = JSON.stringify(window["BandData"]);
    };
  }
  else {
    return "";
  }

  // Create a dummy textarea DOM.
  var textarea = document.createElement('textarea');
  textarea.setAttribute('id', 'transfer-dom-area');
  textarea.style.display = 'none';
  document.body.appendChild(textarea);

  // Start injecting the JS script.
  var script = document.createElement('script');
  script.appendChild(document.createTextNode('(' + internalScript + ')();'));
  document.body.appendChild(script);

  // Return value
  // console.log("TextArea: " + textarea.value);
  var result = textarea.value;

  // Clean up since we no longer need this.
  document.body.removeChild(textarea);

  // Inform our world that we have received the data.
  return result;
};

var embedData = getInternalVariable("EmbedData");
embedData = JSON.parse(embedData);
console.log(embedData);
trackInfo.tags = getTags();
trackInfo.track = embedData["title"];
trackInfo.album = embedData["album_title"];
trackInfo.artist = embedData["artist"];

var bandData = getInternalVariable("BandData");
bandData = JSON.parse(bandData);
trackInfo.bio = bandData["bio"]["bio"];

chrome.extension.sendRequest(trackInfo);
