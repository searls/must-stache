describe "faceApi", ->
  describe "processMustaches", ->
    PERCENTAGE_BASED_PHOTO_DATA = "original photo data from face.com"
    onComplete=onRenderMustache=PHOTOS=null
    beforeEach ->
      PHOTOS =
        tags: [{
            mouth_left: {x: 5}
            mouth_center: {y: 8}
            mouth_right: {x: 10}
            nose: {y: 12}},
          {
            mouth_left: {x: 11}
            mouth_center: {y: 30}
            mouth_right: {x: 50}
            nose: {y: 24}
          }]
      spyOn(M.faceApi, "photoToPx").andCallFake (data) ->
        PHOTOS if data == PERCENTAGE_BASED_PHOTO_DATA

      M.faceApi.processMustaches
        photoData: PERCENTAGE_BASED_PHOTO_DATA
        onComplete: onComplete = jasmine.createSpy "on complete"
        onRenderMustache: onRenderMustache = jasmine.createSpy 'on render mustache'

    it 'calculates transforms for each tag', ->
      _(PHOTOS.tags).each (tag,i) ->
        context "tag ##{i+1}", ->
          face=result=null
          MUSTACHE=M.faceApi.MUSTACHE
          beforeEach ->
            face = PHOTOS.tags[i]
            result = onRenderMustache.calls[i].args[0]

          expectedWidth = (face) ->
            MUSTACHE.extraWidthFactor * (face.mouth_right.x - face.mouth_left.x)

          expectedHeight = (face) ->
            Math.abs(face.nose.y - face.mouth_center.y)

          it "calculates the width scaling", ->
            expect(result[0]).toEqual(expectedWidth(face) / MUSTACHE.width)

          it "calculates the height scaling", ->
            expect(result[3]).toEqual(expectedHeight(face) / MUSTACHE.height)

          it "calculates the leftmost x coordinate", ->
            expect(result[4]).toEqual(face.mouth_left.x - (expectedWidth(face) - expectedWidth(face) / MUSTACHE.extraWidthFactor)/2)

          it "calculates the topmost y coordinate", ->
            expect(result[5]).toEqual(face.nose.y + expectedHeight(face) / 6)


    it "invokes the caller's onComplete", ->
      expect(onComplete).toHaveBeenCalled()

  describe "photoToPx", ->
    photo=null
    beforeEach ->
      photo = {
        width: 50,
        height: 75
        tags: []
      }
      for i in [0..9]
        tag = {}
        _(M.faceApi.FACE_POS_ATTRS).each (attr) ->
          tag[attr] = { x: .34, y: .83 }
        photo.tags.push tag

      M.faceApi.photoToPx(photo)

    it "multiplies each point by 100", ->
      _(photo.tags).each (tag) ->
        _(M.faceApi.FACE_POS_ATTRS).each (attr) ->
          expect(tag[attr].x).toPrettyMuchEqual(.34 * photo.width / 100.0)
          expect(tag[attr].y).toPrettyMuchEqual(.83 * photo.height / 100.0)


    context "data has already been converted to pixels", ->
      noseAttr=null
      beforeEach ->
        noseAttr = _(photo.tags[0].nose).clone()

        M.faceApi.photoToPx(photo)


      it "does not change the nose attribute further", ->
        expect(photo.tags[0].nose).toEqual(noseAttr)



