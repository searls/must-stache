(function(M,$,_) {
  var storage = localStorage;
  M.extend('storage',{
    getStorage: function() {
      return storage;
    },
    setStorage: function(override) {
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
    },
    missingApiKeys: function() {
      return !storage['faceComApiKey'] || !storage['faceComApiSecret'];
    }
  });
})(MustStache,MustStache.$,MustStache._);
