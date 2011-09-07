(function(M,$,_) {
  var registeredResponses = {
    localStorage: function(request, sender, sendResponse) {
      sendResponse(M.storage.getStorage());
    },
    permissionToExecute: function(request, sender, sendResponse) {
      if(!M.storage.missingApiKeys() && M.storage.extensionEnabled()) {
        sendResponse(true);
      } else {
        sendResponse(false);
      }
    },
    image: function(request, sender, sendResponse) {
      var url = request.url === "img/mustache.png" ? chrome.extension.getURL("img/mustache.png") : request.url;
      loadDataForImage(sendResponse,url);
    }
  };

  var loadDataForImage = function(sendResponse,url) {
    var img = new Image();
    img.onload = function() {
      var canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext('2d').drawImage(img, 0, 0);
      sendResponse(canvas.toDataURL());
    };
    img.src = url;
  };

  var setUpBadges = function() {
    if(M.storage.missingApiKeys()) {
      chrome.browserAction.setBadgeText({text: "api"});
    } else {
      chrome.browserAction.setBadgeText({text: ""});
    }

    if(!M.storage.extensionEnabled()) {
      chrome.browserAction.setIcon({path: "../stache-19-disabled.png"});
    } else {
      chrome.browserAction.setIcon({path: "../stache-19.png"});
    }
  }
  setInterval(setUpBadges,1000);

  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    registeredResponses[request.type].apply(this,arguments)
  });
})(MustStache,MustStache.$,MustStache._);
