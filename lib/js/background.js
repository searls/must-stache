(function(M,$,_) {
  var registeredResponses = {
    localStorage: function(request, sender, sendResponse) {
      sendResponse(localStorage)
    },
    permissionToExecute: function(request, sender, sendResponse) {
      if(!missingApiKeys() && localStorage['mustStacheExtensionStatus'] !== "disabled") {
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

  var missingApiKeys = function() {
    return !localStorage['faceComApiKey'] || !localStorage['faceComApiSecret'];
  };

  var setUpBadges = function() {
    if(missingApiKeys()) {
      chrome.browserAction.setBadgeText({text: "api"});
    } else {
      chrome.browserAction.setBadgeText({text: ""});
    }

    if(localStorage['mustStacheExtensionStatus'] === "disabled" ) {
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
