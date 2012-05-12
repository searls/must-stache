(function(M,$,_) {
  M.extend('options',{
    init: function() {
      $(function() {
        renderDangerZone();

        clicker('.disable-must-stache', disableMustStache);
        clicker('.enable-must-stache', enableMustStache);
      });
    }
  });

  var disableMustStache = function() {
    M.storage.set('mustStacheExtensionStatus', "disabled");
    renderDangerZone();
  };

  var enableMustStache = function() {
    M.storage.set('mustStacheExtensionStatus', "enabled");
    renderDangerZone();
  };

  var renderDangerZone = function() {
    $('.options-form').html(JST['templates/popover']({
      enabled: M.storage.extensionEnabled(),
      apiHappy: !M.storage.missingApiKeys(),
      apiKey: M.storage.get('faceComApiKey'),
      apiSecret: M.storage.get('faceComApiSecret')
    }));
  };

  var clicker = function(selector, whenClicked){
    $(selector).live('click',function(e) {
      e.preventDefault();
      whenClicked.call($(this),e);
    });
  };

  M.options.init();

})(MustStache,MustStache.$,MustStache._);
