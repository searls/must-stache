(function(M,$,_) {
  var storage = localStorage;
  M.extend('storage',{
    overrideStorage: function(override) {
      storage = override;
    },
    saveOptionsOnForm: function($form) {
      _(M.forms.allInputsOn($form)).each(function($input) {
        storage[$input.attr('id')] = $input.val();
      });
    },
    restoreOptionsOnForm: function($form) {
      _(M.forms.allInputsOn($form)).each(function($input) {
        $input.val(storage[$input.attr('id')]);
      });
    },
    extensionEnabled: function() {
      return storage['mustStacheExtensionStatus'] !== "disabled";
    }
  });
})(MustStache,MustStache.$,MustStache._);
