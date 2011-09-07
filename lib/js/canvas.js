$(function() {

  window.paintCanvas = function(config) {
    var canvas = document.createElement('canvas');
    var canvasContext = canvas.getContext('2d');
    canvas.width = $(config.originalImage).width();//config.originalImage.width;
    canvas.height = $(config.originalImage).height();//config.originalImage.height;
    canvasContext.drawImage(config.localizedImage, 0, 0);
    drawMustachesOnCanvas(canvas,config);
  };

  var drawMustachesOnCanvas = function(canvas,config) {
    mustachio(config.photoData,function(transformParams) {
      var mustacheCanvas = document.createElement('canvas');
      mustacheCanvas.width = canvas.width;
      mustacheCanvas.height = canvas.height;
      mustacheCtx = mustacheCanvas.getContext('2d');
      mustacheCtx.setTransform.apply(mustacheCtx,transformParams)
      mustacheCtx.globalAlpha = .9;

      mustacheCtx.drawImage(config.mustacheImage,0,0);

      canvas.getContext('2d').drawImage(mustacheCanvas, 0, 0);
    }, function() {
      config.onComplete(canvas.toDataURL());
    });
  };
});