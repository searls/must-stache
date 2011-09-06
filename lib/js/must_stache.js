(function($) {
  var storage;

  window.MustStache = function() {
    var apiUrl = 'http://api.face.com/faces/detect.json?',
        self = {};

    self.mustachifyImages = function() {
      var images = collectImageTags();
      if(images.length > 0) {
        var requestUrl = buildFaceRequestUrl(_(images).pluck('src'));
        makeRequestToFaceService(images,requestUrl);
      }
    };

    var collectImageTags = function() {
      return _($('img').map(function(i,el) {
        var $img = $(el);
        if($img.attr('src')
            && !_($img.attr).startsWith('data:')
            && $img.data('mustacheStatus') === undefined) {
          $img.data('mustacheStatus','pending');
          return el;
        }
      })).compact();
    };

    var buildFaceRequestUrl = function(urls) {
      return apiUrl + $.param({
        api_key: storage['faceComApiKey'],
        api_secret: storage['faceComApiSecret'],
        urls: ''
      }) + urls.join(',');
    };

    var makeRequestToFaceService = function(images,faceRequestUrl) {
      //FIXME - just stubbing the response for now.
      /*$.get*/(/*faceRequestUrl,*/function(data) {
        _(data.photos).each(function(photo,i) {
          var image = _(images).detect(function(image) { return image.src === photo.url;});
          if(photo.tags && photo.tags.length > 0) {
            applyMustache(image,photo);
          }
        });
      })({"photos":[{"url":"http:\/\/a3.twimg.com\/profile_images\/28727752\/jkottke-headshot3.jpg","pid":"F@f1a639e13ea84b3623634772015150cb_4b4958928f1205bd5b7f2a6914467454","width":500,"height":656,"tags":[{"tid":"TEMP_F@f1a639e13ea84b3623634772015150cb_4b4958928f1205bd5b7f2a6914467454_52.50_35.29_0_0","recognizable":true,"threshold":null,"uids":[],"gid":null,"label":"","confirmed":false,"manual":false,"tagger_id":null,"width":34.6,"height":26.37,"center":{"x":52.5,"y":35.29},"eye_left":{"x":42.25,"y":29.6},"eye_right":{"x":57.56,"y":28.42},"mouth_left":{"x":44.85,"y":42.22},"mouth_center":{"x":49.6,"y":41.56},"mouth_right":{"x":55.47,"y":41.05},"nose":{"x":47.33,"y":36.14},"ear_left":null,"ear_right":null,"chin":null,"yaw":-23.27,"roll":-5.75,"pitch":3.95,"attributes":{"face":{"value":"true","confidence":92},"gender":{"value":"male","confidence":78},"glasses":{"value":"false","confidence":55},"smiling":{"value":"false","confidence":89}}}]}],"status":"success","usage":{"used":63,"remaining":4937,"limit":5000,"reset_time_text":"Tue, 06 Sep 2011 17:14:38 +0000","reset_time":1315329278}});
    };

    var applyMustache = function(image,photo) {
      image.src = paintCanvas(image,photo);
      $(image).data('mustacheStatus','complete');
    };

    self.beginPolling = function() {
      setInterval(self.mustachifyImages,333);
    };

    $(document).ready(function() {
      chrome.extension.sendRequest({}, function(response) {
        storage = response;
        self.mustachifyImages();
        self.beginPolling();
      });
    });

    return self;
  };


  MustStache();
})(jQuery);