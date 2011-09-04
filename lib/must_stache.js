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
        var newImgSrc = urlTranslator(el.src);
        $.get(newImgSrc,function() {
          el.src = newImgSrc;
        });
      });
    };

    $(document).ready(function() {
      self.mustachifyImages();
    });

    return self;
  };
  
  MustStache();
})(jQuery);