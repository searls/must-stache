(function($) {
  window.MustStache = function() {
    var apiUrl = 'http://must-stache.heroku.com/?src=';
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
      var $img = $(el)
      if($img.attr('src') && $img.data('pendingMustache') !== true) {
        var mustacheUrl = urlTranslator(el.src);
        $img.data('pendingMustache',true);
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
      },333);
    };

    $(document).ready(function() {
      self.mustachifyImages();
      self.beginPolling();
    });

    return self;
  };

  MustStache();
})(jQuery);