describe "Mustache options panel", ->
  describe "init", ->
    $form = $dz = null

    beforeEach ->
      # Arrange
      $dz = $.jasmine.inject("<div class='danger-zone' />")
      $form = $.jasmine.inject("<div id=configurationForm />")
      spyOn(M.storage, "restoreOptionsOnForm")
      spyOn($.fn, "ready")
      spyOn(M._, "template").andReturn("panda")

      # Act
      M.options.init()
      domready = $.fn.ready.mostRecentCall.args[0]
      domready()

    it "restores the saved options to the form", ->
      meth = M.storage.restoreOptionsOnForm
      expect(meth.mostRecentCall.args[0]).toBe($form)

    it "displays a button to enable/disable", ->
      expect($dz).toHaveHtml("panda")

    it "saves the options in the form"
    it "closes the options panel when Cancel is clicked"
    it "closes the options panel when Save is clicked"
