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

  $(function() {
    var $form = $('#configurationForm');
    restoreOptions($form);
    $('#saveConfiguration').live('click',function(e) {
      e.preventDefault();
      saveOptions($form);
    });
  });
})(jQuery);
