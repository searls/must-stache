(function($) {
  window.MustStache = function() {
    var apiUrl = 'http://mustachify.me/?src=';
    var self = {};

    self.mustachifyImages = function() {
      self.swapImageSources(self.mustachifyUrl);
    };

    self.mustachifyUrl = function(url) {
      return apiUrl + url;
    };

    self.swapImageSources = function(urlTranslator) {
      $('img').each(function(i,el) {
        replaceImageWithValidMustache(el,urlTranslator);
      });
    };

    var replaceImageWithValidMustache = function(el,urlTranslator) {
      if($(el).attr('src')) {
        var mustacheUrl = urlTranslator(el.src);
        $.get(mustacheUrl,function() {
          el.src = mustacheUrl;
        });
      }
    };

    self.beginPolling = function() {
      setInterval(function() {
        $('img').each(function(i,el) {
          if(!_($(el).attr('src')).startsWith(apiUrl)) {
            replaceImageWithValidMustache(el,self.mustachifyUrl);
          }
        });
      },1000);
    };

    $(document).ready(function() {
      self.mustachifyImages();
      self.beginPolling();
    });

    return self;
  };

  MustStache();
})(jQuery);