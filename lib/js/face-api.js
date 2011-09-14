(function(M,$,_) {
  M.extend('faceApi',{
    processMustaches: function(config) {
      convertedPhoto = M.faceApi.photoToPx(config.photoData);

      _(convertedPhoto.tags).each(function(face){
        var width = Math.abs(M.faceApi.MUSTACHE.extraWidthFactor * (face.mouth_right.x - face.mouth_left.x));
        var widthFactor = width / M.faceApi.MUSTACHE.width;
        var height = Math.abs(face.nose.y - face.mouth_center.y);
        var heightFactor = height / M.faceApi.MUSTACHE.height;

        var transformParams = [
          widthFactor,
          0,//face.roll / 360,
          0,//face.yaw / 360,
          heightFactor,
          face.mouth_left.x - ((width - width/M.faceApi.MUSTACHE.extraWidthFactor) / 2), //x coordinate
          face.nose.y + height/6 //y coordinate
        ];

        config.onRenderMustache(transformParams);
      });

      config.onComplete();
    },
    photoToPx: function(photo) {
      if(photo.convertedToPixels !== true) {
        _(M.faceApi.FACE_POS_ATTRS).each(function(attr){
          _(photo.tags).each(function(faceData, i){
            if (photo.tags[i][attr]){
              photo.tags[i][attr].x *= ( photo.width / 100.0 );
              photo.tags[i][attr].y *= ( photo.height / 100.0 );
            } else {
              console.warn("WARN: missing position attribute " + attr);
            }
          });
        });
        photo.convertedToPixels = true;
      }
      return photo;
    },
    MUSTACHE: {
      width: 491,
      height: 105,
      extraWidthFactor: 2.5
    },
    FACE_POS_ATTRS: ['center', 'eye_left', 'eye_right', 'mouth_left', 'mouth_center', 'mouth_right', 'nose']
  });
})(MustStache,MustStache.$,MustStache._);