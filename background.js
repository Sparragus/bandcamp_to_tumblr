var trackInfo = {};

var onRequest = function(req, sender) {
  if (sender.tab) {
    trackInfo = req;
  }
  chrome.pageAction.show(sender.tab.id);
};

chrome.extension.onRequest.addListener(onRequest);
