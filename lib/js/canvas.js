$(function() {

  window.paintCanvas = function(config) {
    var canvas = document.createElement('canvas');
    var canvasContext = canvas.getContext('2d');
    canvas.width = $(config.originalImage).width();
    canvas.height = $(config.originalImage).height();
    canvasContext.drawImage(config.localizedImage, 0, 0);
    drawMustacheOnCanvas(canvas,config.photoData,config.mustacheImage);
    return canvas.toDataURL();
  };

  var drawMustacheOnCanvas = function(canvas,photoData,mustacheImage) {
    mustachio(photoData,function(affineParams) {
      var mustacheCanvas = document.createElement('canvas');
      mustacheCanvas.width = canvas.width;
      mustacheCanvas.height = canvas.height;
      mustacheCtx = mustacheCanvas.getContext('2d');
      mustacheCtx.setTransform.apply(mustacheCtx,affineParams)
      mustacheCtx.globalAlpha = .9;

      mustacheCtx.drawImage(mustacheImage,0,0);

      canvas.getContext('2d').drawImage(mustacheCanvas, 0, 0);
    });
  };
});