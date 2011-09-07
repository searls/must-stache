(function() {
  var saveOptions = function($form) {
    _(allInputsOn($form)).each(function($input) {
      localStorage[$input.attr('id')] = $input.val();
    });
    $form.find('.save-alert').show('slow').hide('slow');
  };

  var restoreOptions = function($form) {
    _(allInputsOn($form)).each(function($input) {
      $input.val(localStorage[$input.attr('id')]);
    });
  };

  var allInputsOn = function($form) {
    var $inputs = [];
    $form.find(':input').each(function(i,el) {
      $inputs.push($(el));
    });
    return $inputs;
  };

  var currentlyEnabled = function() {
    return localStorage['disabled'] !== "disabled";
  };

  var toggleEnabled = function() {
    localStorage['disabled'] = currentlyEnabled() ? "disabled" : "enabled";
    renderDangerZone();
  };

  var renderDangerZone = function() {
    var templated = _($("#dangerZoneTemplate").html()).template({
      enabled: currentlyEnabled()
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
    restoreOptions($form);
    renderDangerZone();

    clicker('#saveButton',function() {
      saveOptions($form);
      window.close();
    });
    clicker('#cancelButton',function() {
      window.close()
    });
    clicker('#toggleEnabledButton',toggleEnabled);
  });
})(jQuery);
