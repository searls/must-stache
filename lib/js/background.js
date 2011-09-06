function mustacheImage(sendResponse) {
  var img = new Image();
  img.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0);
    // chrome.tabs.sendRequest(tab.id, {cmd: "replace", data: canvas.toDataURL()});
    sendResponse(canvas.toDataURL());
  };
  img.src = chrome.extension.getURL("img/mustache.png");
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request === "localStorage") {
    sendResponse(localStorage);
  } else if(request === "mustacheImage"){
    mustacheImage(sendResponse);
  }

});