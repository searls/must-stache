(function($,_,extend){
  window.MustStache = window.MustStache || {};
  extend.myNamespace(MustStache);
  MustStache.$ = jQuery.noConflict();
  MustStache._ = _.noConflict()
  extend.noConflict();
})(jQuery,_,extend);