(function(M,$,_) {
  M.extend('options',{
    init: function() {
      $(document).ready(function() {
        var $form = $('#configurationForm');
        M.storage.restoreOptionsOnForm($form);
        renderDangerZone();
      });

      // $(function() {
      //   var $form = $('#configurationForm');
      //   M.storage.restoreOptionsOnForm($form);
      //   renderDangerZone();

      //   clicker('#saveButton',function() {
      //     M.storage.saveOptionsOnForm($form);
      //     window.close();
      //   });
      //   clicker('#cancelButton',function() {
      //     window.close()
      //   });
      //   clicker('#toggleEnabledButton',toggleEnabled);
      // });
    }
  });

  var toggleEnabled = function() {
    M.storage.getStorage()['mustStacheExtensionStatus'] = M.storage.extensionEnabled() ? "disabled" : "enabled";
    renderDangerZone();
  };

  var renderDangerZone = function() {
    var templated = _.template($("#dangerZoneTemplate").html() || "", {
      // enabled: M.storage.extensionEnabled()
    });
    $('.danger-zone').html(templated);
  };

  var clicker = function(selector, whenClicked){
    $(selector).live('click',function(e) {
      e.preventDefault();
      whenClicked.call($(this),e);
    });
  };

  M.options.init();

})(MustStache,MustStache.$,MustStache._);
