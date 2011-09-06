$(function() {

  var mustacheImage = new Image()
  mustacheImage.src = chrome.extension.getURL("img/mustache.png");

  window.paintCanvas = function(photoImage,photoData) {
    var canvas = document.createElement('canvas');
    var canvasContext = canvas.getContext('2d');
    var imgW = photoImage.width;
    var imgH = photoImage.height;
    canvas.width = imgW;
    canvas.height = imgH;
    canvasContext.drawImage(photoImage, 0, 0);
    drawMustacheOnCanvas(canvas,photoData);
    return canvas.toDataURL();
  };

  var drawMustacheOnCanvas = function(canvas,photoData) {
    mustachio(photoData,function(affineParams) {
      console.log('drawing a mustache with affine params: '+affineParams);
      var mustache = document.createElement('canvas');
      mustache.width = canvas.width;
      mustache.height = canvas.height;
      canvas.getContext('2d').drawImage(mustacheImage, 0, 0);
    });
  };

  // var $img = $('img');
  // var mustache = new Image();
  // mustache.src = '../img/mustache.png';
  // $img[0].onload = function() {
  //   if($img.data('mustached') !== true) {
  //     $img.data('mustached',true);
  //     var img = $img[0];
  //     img.src = paintCanvas(img);
  //   }
  // };
});