$(function() {

  window.paintCanvas = function(photoImage,photoData,mustacheImage) {
    var canvas = document.createElement('canvas');
    var canvasContext = canvas.getContext('2d');
    canvas.width = $(photoImage).width();
    canvas.height = $(photoImage).height();
    canvasContext.drawImage(photoImage, 0, 0);
    drawMustacheOnCanvas(canvas,photoData,mustacheImage);
    return canvas.toDataURL();
  };

  var drawMustacheOnCanvas = function(canvas,photoData,mustacheImage) {
    mustachio(photoData,function(affineParams) {
      console.log('drawing a mustache with affine params: '+affineParams);
      var mustacheCanvas = document.createElement('canvas');
      mustacheCanvas.width = canvas.width;
      mustacheCanvas.height = canvas.height;

      mustacheCanvas.getContext('2d').drawImage(mustacheImage,0,0);
      canvas.getContext('2d').drawImage(mustacheCanvas, 0, 0);
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