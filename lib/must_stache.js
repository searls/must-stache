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

    $(document).ready(function() {
      self.mustachifyImages();
    });

    return self;
  };

  MustStache();
})(jQuery);