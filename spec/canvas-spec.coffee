describe "MustStache.canvas", ->

  describe "#createCanvas", ->
    result=SIZE=IMAGE=TRANSFORMER=null
    beforeEach ->
      SIZE = { width: 3, height: 5 }
      IMAGE = new Image()
      IMAGE.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAEklEQVR42mP4z8DwH4YZyOAAAMufHeNmMS0JAAAAAElFTkSuQmCC"

    expectedCanvasDataUrl = ->
      canvas = document.createElement('canvas')
      canvasContext = canvas.getContext('2d')
      canvas.width = SIZE.width;
      canvas.height = SIZE.height;
      canvasContext.drawImage(IMAGE, 0, 0);
      canvas.toDataURL()

    context "without a transformer defined", ->
      beforeEach ->
        result = M.canvas.createCanvas(SIZE,IMAGE,TRANSFORMER)

      it "applies the width", ->
        expect(result.width).toBe(SIZE.width)

      it "applies the height", ->
        expect(result.height).toBe(SIZE.height)

      it "draws the image", ->
        expect(result.toDataURL()).toEqual(expectedCanvasDataUrl())

    context "with a transformer function passed", ->
      beforeEach ->
        TRANSFORMER = jasmine.createSpy("transformer")
        result = M.canvas.createCanvas(SIZE,IMAGE,TRANSFORMER)

      it "passes the context to the transformer", ->
        expect(TRANSFORMER).toHaveBeenCalledWith(result.getContext('2d'))

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
        toDataURL: jasmine.createSpy('canvas#toDataURL'),
        height: 123,
        width: 456
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

    it "alters the height of the photo data to match the canvas", ->
      expect(faceApiConfig().photoData.height).toEqual(CANVAS.height)

    it "alters the width of the photo data to match the canvas", ->
      expect(faceApiConfig().photoData.width).toEqual(CANVAS.width)

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

