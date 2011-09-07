(function($) {
  var storage,mustacheImage,
      imageUrlMap = {},
      apiUrl = 'http://api.face.com/faces/detect.json?',
      API_LIMIT = 30;

  window.MustStache = function() {
    var self = {};

    self.mustachifyImages = function() {
      var imageUrls = collectImageTags();
      if(imageUrls.length > 0) {
        makeRequestToFaceService(buildFaceRequestParams(imageUrls));
      }
    };

    var collectImageTags = function() {
      return _($('img').map(function(i,el) {
        var $img = $(el);
        if($img.attr('src')
            && !_($img.attr('src')).startsWith('data:')
            && $img.data('mustachified') !== true) {
          var cachedPhotoData = imageUrlMap[el.src];
          if(cachedPhotoData && cachedPhotoData.tags) {
            mustachifyImagesOfPhoto(cachedPhotoData)
          } else if(!cachedPhotoData) {
            imageUrlMap[el.src] = 'pending';
            return el.src;
          }
        }
      })).chain().unique().compact().first(API_LIMIT).value();
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
        _(data.photos).each(mustachifyImagesOfPhoto);
      });
    };

    var mustachifyImagesOfPhoto = function(photo) {
      if(photo.tags && photo.tags.length > 0) {
        $('img').filter(function(i) {
          return  this.src === photo.url && $(this).data('mustachified') !== true;
        }).each(function(i,image) {
          applyMustacheToImage(image,photo);
          $(image).data('mustachified', true);
        });
      }
    };

    var applyMustacheToImage = function(originalImage,photoData) {
      imageUrlMap[originalImage.src] = photoData;
      whenImageIsReady(originalImage.src, function(localizedImage) {
        try {
          paintCanvas({
            originalImage: originalImage,
            localizedImage: localizedImage,
            photoData: photoData,
            mustacheImage: mustacheImage,
            onComplete: function(dataUrl) {
              originalImage.src = dataUrl;
            }
          });
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