(function($) {
  var storage,mustacheImage,imageUrlMap = {};

  window.MustStache = function() {
    var apiUrl = 'http://api.face.com/faces/detect.json?',
        self = {};

    self.mustachifyImages = function() {
      var imageUrls = collectImageTags();
      if(imageUrls.length > 0) {
        var params = buildFaceRequestParams(imageUrls);
        makeRequestToFaceService(params);
      }
    };

    var collectImageTags = function() {
      return _(_(_($('img').map(function(i,el) {
        var $img = $(el);
        if($img.attr('src')
            && !_($img.attr).startsWith('data:')
            && $img.data('mustacheStatus') === undefined
            && !imageUrlMap[el.src]) {
          imageUrlMap[el.src] = 'pending';
          return el.src;
        }
      })).unique()).compact()).first(30); //This last bit is required by the API.. max of 30 urls per request.
    };

    var buildFaceRequestParams = function(urls) {
      return {
        api_key: storage['faceComApiKey'],
        api_secret: storage['faceComApiSecret'],
        urls: urls.join(',')
      };
    };

    var makeRequestToFaceService = function(params) {
      $.post(apiUrl,params,function(data) {
        _(data.photos).each(function(photo) {
          if(photo.tags && photo.tags.length > 0) {
            $('img').filter(function(i) {
              return  this.src === photo.url;
            }).each(function(i,image) {
              applyMustache(image,photo);
            });
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
          imageUrlMap[el.src] = photoData;
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