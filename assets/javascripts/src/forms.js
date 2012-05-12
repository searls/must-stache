(function(M,$,_) {
  M.extend('forms',{
    allInputsOn: function($form) {
      var $inputs = [];
      $form.find(':input').each(function(i,el) {
        $inputs.push($(el));
      });
      return $inputs;
    }
  });
})(MustStache,MustStache.$,MustStache._);
