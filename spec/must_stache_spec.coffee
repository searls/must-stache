window.context = window.describe

beforeEach ->
  window.injectImg = (src) ->
    $.jasmine.inject('<img src="'+src+'"/>')

  this.addMatchers
    toStartWith: (string) ->
      _(this.actual).startsWith(string)
    toEndWith: (string) ->
      _(this.actual).endsWith(string)

describe "MustStache", ->
  apiUrl = 'http://must-stache.heroku.com/?src='
  mustStache = null
  beforeEach -> mustStache = MustStache()

  context "on domready", ->
    beforeEach ->
      spyOn($.fn, "ready")
      mustStache = MustStache()
      spyOn(mustStache, "mustachifyImages")
      spyOn(mustStache, "beginPolling")
      domReadyFunction = $.fn.ready.mostRecentCall.args[0]

      domReadyFunction()

    it "binds to document ready", ->
      expect($.fn.ready.mostRecentCall.object).toBe(document)

    it "mustachifies images", ->
      expect(mustStache.mustachifyImages).toHaveBeenCalled()

    it "begin polling for mustaches", ->
      expect(mustStache.beginPolling).toHaveBeenCalled()

  describe "#mustachifyImages", ->
    it "swaps all the images out with mustaches", ->
      spyOn(mustStache, "swapImageSources")
      mustStache.mustachifyImages();
      expect(mustStache.swapImageSources).toHaveBeenCalledWith(mustStache.mustachifyUrl)

  describe '#mustachifyUrl', ->
    it 'prepends the URL with the mustachify API', ->
      url = 'http://partytime.com'
      result = mustStache.mustachifyUrl(url)
      expect(result).toEqual apiUrl+url

  itVerifiesTheMustacheBeforeReplacingIt = (config) ->
    context "upon verifying the image at #{config.actualUrl}", ->
      beforeEach -> config.callback()

      it "verifies the mustachified url", ->
        expect(config.actualUrl).toBe(config.expectedUrl)

      it "replaces the source of an image", ->
        expect(config.img).toHaveAttr('src',config.expectedUrl)

  describe "#swapImageSources", ->
    context "an image has an empty src URL", ->
      $img = null
      beforeEach ->
        $img = injectImg('')
        spyOn($, "get")
        mustStache.swapImageSources()

      it "does no ajax", ->
        expect($.get).not.toHaveBeenCalled()

      it "leaves the empty src as-was", ->
        expect($img).toHaveAttr('src',"")

    context "two images with valid src URLs", ->
      $imgs=null
      suffix='-winning'
      beforeEach ->
        spyOn($, "get")
        $imgs = [injectImg('panda'), injectImg('pants')]
        mustStache.swapImageSources((src) -> src+suffix);

      it "replaces verified images", ->
        _($imgs).each ($img,i) ->
          itVerifiesTheMustacheBeforeReplacingIt
            img: $imgs[i],
            expectedUrl: $imgs[i][0].src+suffix
            actualUrl: $.get.calls[i].args[0],
            callback: $.get.calls[i].args[1]

  describe "#beginPolling", ->
    beforeEach ->
      spyOn(window, "setInterval")
      mustStache.beginPolling();

    it "sets interval", ->
      expect(window.setInterval.mostRecentCall.args[1]).toBe(333)

    describe "~the polling method", ->
      pollingFunction=null
      beforeEach ->
        spyOn($, "get")
        pollingFunction = window.setInterval.mostRecentCall.args[0]

      context "all images start with the mustache URL", ->
        beforeEach ->
          injectImg(apiUrl+"woot-woot")
          pollingFunction()

        it "does not attempt to make an AJAX call", ->
          expect($.get).not.toHaveBeenCalled()

      context "an image starts with some other URL", ->
        $img=null
        beforeEach ->
          $img = injectImg('some-other-url')
          pollingFunction()

        it "replaces the image with the mustache", ->
          itVerifiesTheMustacheBeforeReplacingIt
            img: $img,
            expectedUrl: apiUrl+$img[0].src
            actualUrl: $.get.mostRecentCall.args[0],
            callback: $.get.mostRecentCall.args[1]

      context "multiple polling cycles before ajax return", ->
        $img=null
        beforeEach ->
          $img = injectImg('some-other-url')
          pollingFunction()
          pollingFunction()
          pollingFunction()

        it "only makes one ajax call", ->
          expect($.get.callCount).toBe(1)

