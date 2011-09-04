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
    $imgs=null
    suffix='-winning'
    beforeEach ->
      spyOn($, "get")
      $imgs = [$.jasmine.inject('<img src="panda"/>'), $.jasmine.inject('<img src="pants"/>')]
      mustStache.swapImageSources((src) -> src+suffix);
    
    itVerifiesTheMustacheBeforeReplacingIt = (config) ->
      context "upon verifying the image at #{config.actualUrl}", ->
        beforeEach -> config.callback()

        it "verifies the mustachified url", ->
          expect(config.actualUrl).toBe(config.expectedUrl)

        it "replaces the source of an image", ->
          expect(config.img).toHaveAttr('src',config.expectedUrl)

    it "replaces verified images", ->
      _($imgs).each ($img,i) ->
        itVerifiesTheMustacheBeforeReplacingIt
          img: $imgs[i],
          expectedUrl: $imgs[i][0].src+suffix
          actualUrl: $.get.calls[i].args[0],
          callback: $.get.calls[i].args[1],
    
  describe "#mustachifyImages", ->
    it "swaps all the images out with mustaches", ->
      spyOn(mustStache, "swapImageSources")    
      mustStache.mustachifyImages();    
      expect(mustStache.swapImageSources).toHaveBeenCalledWith(mustStache.mustachifyUrl)
      
    it "aborts the ajax if `src` is blank"
    