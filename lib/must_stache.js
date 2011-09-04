(function($) {
  var M = window.mustStache = {};
  M.mustachifyUrl = function(url){
    return 'http://mustachify.me/?src='+url;
  };
  
  M.swapImageSources = function(imgSrcResolver) {
    $('img').each(function(i,el) {    
      var oldSrc = $(el).attr('src');
      var newSrc = imgSrcResolver(oldSrc);
      $(el).attr('src',newSrc);
    });
  };
  
  M.mustachifyImages = function() {
    M.swapImageSources(M.mustachifyUrl);
  };
  
  $(function() {
    M.mustachifyImages();
  });
  
  // chrome.extension.sendRequest({}, function(response) {});
})(jQuery);