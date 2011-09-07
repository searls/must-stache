(function(M,$,_) {
  var toggleEnabled = function() {
    M.storage.getStorage()['mustStacheExtensionStatus'] = M.storage.extensionEnabled() ? "disabled" : "enabled";
    renderDangerZone();
  };

  var renderDangerZone = function() {
    var templated = _($("#dangerZoneTemplate").html()).template({
      enabled: M.storage.extensionEnabled()
    });
    $('.danger-zone').html(templated);
  };

  var clicker = function(selector, whenClicked){
    $(selector).live('click',function(e) {
      e.preventDefault();
      whenClicked.call($(this),e);
    });
  };

  $(function() {
    var $form = $('#configurationForm');
    M.storage.restoreOptionsOnForm($form);
    renderDangerZone();

    clicker('#saveButton',function() {
      M.storage.saveOptionsOnForm($form);
      window.close();
    });
    clicker('#cancelButton',function() {
      window.close()
    });
    clicker('#toggleEnabledButton',toggleEnabled);
  });
})(MustStache,MustStache.$,MustStache._);
