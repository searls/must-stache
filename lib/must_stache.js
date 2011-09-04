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
  
  // chrome.extension.sendRequest({}, function(response) {});
})(jQuery);