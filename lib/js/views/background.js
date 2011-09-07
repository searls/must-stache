(function(M,$,_) {
  M.extend('background',{
    registeredRequestTypes: {
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
        var img = new Image();
        img.onload = function() {
          var canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext('2d').drawImage(img, 0, 0);
          sendResponse(canvas.toDataURL());
        };
        img.src = url;
      }
    },
    applyBadges: function() {
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
    },
    listenToExtensionRequests: function() {
      chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
        M.background.registeredRequestTypes[request.type].apply(this,arguments)
      });
    }
  });

  setInterval(M.background.applyBadges,1000);
  M.background.listenToExtensionRequests();
})(MustStache,MustStache.$,MustStache._);
