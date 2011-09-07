(function() {
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


  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request === "localStorage") {
      sendResponse(localStorage);
    } else if(request.type === "image"){
      var url = request.url === "img/mustache.png" ? chrome.extension.getURL("img/mustache.png") : request.url;
      loadDataForImage(sendResponse,url);
    }
  });
})();
