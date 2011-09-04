window.context = window.describe
beforeEach ->
  this.addMatchers
    toStartWith: (string) ->
      _(this.actual).startsWith(string)
    toEndWith: (string) ->
      _(this.actual).endsWith(string)

describe "MustStache", ->
  mustStache = null
  beforeEach -> mustStache = MustStache()
  
  context "on domready", ->
    beforeEach ->
      spyOn($.fn, "ready")
      mustStache = MustStache()
      spyOn(mustStache, "mustachifyImages")
      domReadyFunction = $.fn.ready.mostRecentCall.args[0]

      domReadyFunction()

    it "binds to document ready", ->
      expect($.fn.ready.mostRecentCall.object).toBe(document)    
    
    it "mustachifies images", ->      
      expect(mustStache.mustachifyImages).toHaveBeenCalled()
  
  describe '#mustachifyUrl', ->
    it 'prepends the URL with the mustachify API', ->
      url = 'http://partytime.com'
      result = mustStache.mustachifyUrl(url)
      expect(result).toEqual 'http://mustachify.me/?src='+url
    
  describe "#swapImageSources", ->
    $img1=img1Src=$img2=img2Src=null
    suffix='-winning'
    beforeEach ->
      spyOn($, "get")
      $img1 = $.jasmine.inject('<img src="panda"/>')
      $img2 = $.jasmine.inject('<img src="pants"/>')  
      img1Src = $img1[0].src
      img2Src = $img2[0].src
   
      mustStache.swapImageSources((src) -> src+suffix);
    
    context "upon verifying the first image", ->
      beforeEach -> $.get.calls[0].args[1]()
      
      it "verifies the mustachified url", ->
        expect($.get.calls[0].args[0]).toBe(img1Src+suffix)

      it "replaces the source of an image", ->
        expect($img1).toHaveAttr('src',img1Src+suffix)
    
    context "upon verifying the second image", ->
      beforeEach -> $.get.calls[1].args[1]()

      it "verifies the mustachified url", ->
        expect($.get.calls[1].args[0]).toBe(img2Src+suffix)
      
      it "replaces the source of a second image", ->
        expect($img2).toHaveAttr('src',img2Src+suffix)
    
  describe "#mustachifyImages", ->
    it "swaps all the images out with mustaches", ->
      spyOn(mustStache, "swapImageSources")    
      mustStache.mustachifyImages();    
      expect(mustStache.swapImageSources).toHaveBeenCalledWith(mustStache.mustachifyUrl)
      
    it "aborts the ajax if `src` is blank"
    