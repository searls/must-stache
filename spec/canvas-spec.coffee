describe "MustStache.canvas", ->

  describe "#createCanvas", ->


  describe "#paintCanvas", ->
    CANVAS=CTX=CONFIG=null
    beforeEach ->
      CONFIG = {
        photoData: jasmine.createSpy('photo data'),
        originalImage: jasmine.createSpy('original image'),
        localizedImage: jasmine.createSpy('localized image'),
        mustacheImage: jasmine.createSpy('mustache image'),
        onComplete: jasmine.createSpy('onComplete function')
      }
      CTX = {
        drawImage: jasmine.createSpy('canvas.getContext.drawImage'),
        setTransform: jasmine.createSpy('canvas.getContext.setTransform')
      }
      CANVAS = {
        getContext: jasmine.createSpy('canvas#getContext').andCallFake((type) -> if type == '2d' then CTX),
        toDataURL: jasmine.createSpy('canvas#toDataURL')
      }
      spyOn(M.canvas, "createCanvas").andReturn(CANVAS)
      spyOn(M.faceApi, "processMustaches")

      M.canvas.paintCanvas(CONFIG)

    it "creates a canvas from the original image's size -- FIXME: this is apparently problematic when the size is altered by CSS", ->
      expect(M.canvas.createCanvas.mostRecentCall.args[0]).toBe(CONFIG.originalImage)

    it "creates a canvas painting the local-ified image's pixels", ->
      expect(M.canvas.createCanvas.mostRecentCall.args[1]).toBe(CONFIG.localizedImage)

    it "passes configured photo data to the MustStache.faceApi", ->
      expect(faceApiConfig().photoData).toBe(CONFIG.photoData)

    describe "~onRenderMustache", ->
      TRANSFORM_PARAMS = [0,1,2,4]
      MUSTACHE_CANVAS = jasmine.createSpy 'mustache canvas'
      beforeEach ->
        M.canvas.createCanvas.andReturn(MUSTACHE_CANVAS)
        faceApiConfig().onRenderMustache(TRANSFORM_PARAMS)

      it "creates a mustache canvas from source image's size", ->
        expect(M.canvas.createCanvas.mostRecentCall.args[0]).toBe(CANVAS)

      it "creates a mustache canvas from the mustache image's pixels", ->
        expect(M.canvas.createCanvas.mostRecentCall.args[1]).toBe(CONFIG.mustacheImage)

      describe "~canvas transformer", ->
        beforeEach ->
          canvasTransformer = M.canvas.createCanvas.mostRecentCall.args[2]
          canvasTransformer(CTX)

        it "sets the mustache's opacity to 90%", ->
          expect(CTX.globalAlpha).toBe(.9)

        it "applies the transformation params", ->
          expect(CTX.setTransform.mostRecentCall.args).toEqual(TRANSFORM_PARAMS)

      it "draws the mustache canvas onto the broader canvas's context", ->
        expect(CTX.drawImage).toHaveBeenCalledWith(MUSTACHE_CANVAS,0,0)


    describe "~onComplete", ->
      beforeEach ->
        CANVAS.toDataURL.andReturn("panda")
        faceApiConfig().onComplete()

      it "passes the canvas url to the onComplete callback", ->
        expect(CONFIG.onComplete.mostRecentCall.args[0]).toBe("panda")


    faceApiConfig = -> M.faceApi.processMustaches.mostRecentCall.args[0]

