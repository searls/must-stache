(function(M,$,_) {
  M.extend('canvas',{
    paintCanvas: function(config) {
      var canvas = M.canvas.createCanvas(config.originalImage,config.localizedImage);
      drawMustachesOnCanvas(canvas,config);
    },
    createCanvas: function(sizeOf,image,transformer) {
      var canvas = document.createElement('canvas');
      var canvasContext = canvas.getContext('2d');
      canvas.width = sizeOf.width;
      canvas.height = sizeOf.height;
      if(transformer) {
        transformer(canvasContext);
      }
      canvasContext.drawImage(image, 0, 0);
      return canvas;
    }
  });

  var drawMustachesOnCanvas = function(canvas,config) {
    M.faceApi.processMustaches({
      photoData: config.photoData,
      onRenderMustache: function(transformParams) {
        var mustacheCanvas = M.canvas.createCanvas(canvas,config.mustacheImage,function(ctx) {
          ctx.setTransform.apply(ctx,transformParams)
          ctx.globalAlpha = .9;
        });
        canvas.getContext('2d').drawImage(mustacheCanvas, 0, 0);
      },
      onComplete: function() {
        config.onComplete(canvas.toDataURL());
      }
    });
  };
})(MustStache,MustStache.$,MustStache._);