(function($) {
  var $source, $exit, $originals, doc;
  
  var init = function() {
    doc = document.documentElement;
    var sourceHtml = renderLinks($('<div/>').text(doc.outerHTML).html().replace(/(\t|  )/g,"&nbsp;&nbsp;").split('\n').join('<br/>'));
    console.log(sourceHtml);
    $originals = $(doc).children().hide();
    $source = $('<div class="absolute source"><div>').html(sourceHtml).appendTo(doc);
  }
  
  var renderExitButton = function() {
    var url = chrome.extension.getURL("x.png");
    $exit = $('<a href="#" class="absolute exit"><img src="'+url+'"/></a>').insertBefore($source);    
  };
  
  var renderLinks = function(source) {
    var p = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s"()<>]+|\(([^\s"()<>]+|(\([^\s"()<>]+\)))*\))+(?:\(([^\s"()<>]+|(\([^\s"()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;
    return source.replace(p, "<a href=\"$&\">$&</a>");
  };
  
  var restorePage = function(e) {
    e.preventDefault();
    $source.remove();
    $exit.remove();
    $originals.css('display','');
  };

  $(function() {
    init();
    renderExitButton();
    $('.exit').live('click',restorePage);    
    $(document.documentElement).keyup(function(e) {
      if(e.keyCode === 27) {
        restorePage(e);
      }
    });    
  });

  chrome.extension.sendRequest({}, function(response) {});
})(jQuery);