(function(M,$,_) {
  M.extend('faceApi',{
    processMustaches: function(config) {
      convertedPhoto = photoToPx(config.photoData);

      _(convertedPhoto.tags).each(function(face){
        var extraWidthFactor = 2.5
        var width = Math.abs(extraWidthFactor * (face.mouth_right.x - face.mouth_left.x));
        var widthFactor = width / MUSTACHE.width;
        var height = Math.abs(face.nose.y - face.mouth_center.y);
        var heightFactor = height / MUSTACHE.height;

        var transformParams = [
          widthFactor,
          0,//face.roll / 360,
          0,//face.yaw / 360,
          heightFactor,
          face.mouth_left.x - ((width - width/extraWidthFactor) / 2), //x coordinate
          face.nose.y + height/6 //y coordinate
        ];

        config.onRenderMustache(transformParams);
      });

      config.onComplete();
    }
  });

  var FACE_POS_ATTRS = ['center', 'eye_left', 'eye_right', 'mouth_left', 'mouth_center', 'mouth_right', 'nose'];

  var MUSTACHE = {
    filename: '../img/mustache.png',
    width: 491,
    height: 105
  };

  var photoToPx = function(photo) {
    if(photo.convertedToPixels !== true) {
      _(FACE_POS_ATTRS).each(function(attr){
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
  };
})(MustStache,MustStache.$,MustStache._);