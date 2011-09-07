(function($) {
  var storage,mustacheImage;

  window.MustStache = function() {
    var apiUrl = 'http://api.face.com/faces/detect.json?',
        self = {};

    self.mustachifyImages = function() {
      var images = collectImageTags();
      if(images.length > 0) {
        var params = buildFaceRequestParams(_(images).pluck('src'));
        makeRequestToFaceService(images,params);
      }
    };

    var collectImageTags = function() {
      return _($('img').map(function(i,el) {
        var $img = $(el);
        if($img.attr('src')
            && !_($img.attr).startsWith('data:')
            && $img.data('mustacheStatus') === undefined
            && i < 30) { //This last bit is required by the API.. max of 30 urls per request.
          $img.data('mustacheStatus','pending')
          return el;
        }
      })).compact();
    };

    var buildFaceRequestParams = function(urls) {
      return {
        api_key: storage['faceComApiKey'],
        api_secret: storage['faceComApiSecret'],
        urls: urls.join(',')
      };
    };

    var makeRequestToFaceService = function(images,params) {
      $.post(apiUrl,params,function(data) {
        _(data.photos).each(function(photo,i) {
          var image = _(images).detect(function(image) { return image.src === photo.url;});
          if(image && photo.tags && photo.tags.length > 0) {
            applyMustache(image,photo);
          }
        });
      });
    };

    var applyMustache = function(originalImage,photoData) {
      whenImageIsReady(originalImage.src, function(localizedImage) {
        try {
          originalImage.src = paintCanvas({
            originalImage: originalImage,
            localizedImage: localizedImage,
            photoData: photoData,
            mustacheImage: mustacheImage
          });
          $(originalImage).data('mustacheStatus','complete');
        } catch(e) {
          console.warn('Failed to mustachify image at url: '+originalImage.src);
          console.warn(e);
        }
      });
    };

    self.beginPolling = function() {
      setInterval(self.mustachifyImages,333);
    };

    var whenImageIsReady = function(url,onceImageIsReady) {
      chrome.extension.sendRequest({type: 'image', url: url}, function(imageDataUrl) {
        var image = new Image();
        image.src = imageDataUrl;
        image.onload = function() {
          onceImageIsReady(image);
        };
      });
    };

    $(document).ready(function() {
      chrome.extension.sendRequest('localStorage', function(backgroundLocalStorage) {
        storage = backgroundLocalStorage;
        whenImageIsReady("img/mustache.png",function(image) {
          mustacheImage = image;
          self.mustachifyImages();
          self.beginPolling();
        });
      });
    });

    return self;
  };


  MustStache();
})(jQuery);