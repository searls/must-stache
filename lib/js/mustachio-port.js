(function($) {
  var FACE_POS_ATTRS = ['center', 'eye_left', 'eye_right', 'mouth_left', 'mouth_center', 'mouth_right', 'nose'];

  var MUSTACHE = {
    filename: '../img/mustache.png',
    width: 491,
    height: 105,
    topOffset: -5.0, // from nose
    bottomOffset: -15.0 // from center of mouth
  };

  var photoToPx = function(photo) {
    FACE_POS_ATTRS.forEach(function(attr){
      photo.tags.forEach(function(faceData, i){
        if (photo.tags[i][attr]){
          photo.tags[i][attr].x *= ( photo.width / 100.0 );
          photo.tags[i][attr].y *= ( photo.height / 100.0 );
        } else {
          console.warn("WARN: missing position attribute " + attr);
        }
      });
    });
    return photo;
  };

  window.mustachio = function(photo, renderFunction) {
    convertedPhoto = photoToPx(photo);

    convertedPhoto.tags.forEach(function(face){
      // perform affine transform, such that the top-center
      // of the mustache is mapped to the nose, and the bottom-center
      // of the stache is mapped to the center of the mouth
      var affineParams = [
        [ MUSTACHE.width / 2.0, MUSTACHE.topOffset ], // top-center of stache
        [ face.nose.x, face.nose.y  ], // nose

        [ MUSTACHE.width / 2.0, MUSTACHE.height + MUSTACHE.bottomOffset ], // bottom-center of stache
        [ face.mouth_center.x, face.mouth_center.y ] // center of mouth
      ];

      renderFunction(affineParams)
    });
  };

})(jQuery);