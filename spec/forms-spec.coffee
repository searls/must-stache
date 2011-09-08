describe "MustStache.forms", ->
  describe "#allInputsOn", ->
    $form=result=null
    beforeEach ->
      $form = $.jasmine.inject '<div></div>'
      $form.append '<input/>' for i in [1..10]
      result = M.forms.allInputsOn($form)

    it "finds 10 inputs under the form that has 10 inputs", ->
      expect(result.length).toBe(10)

    for i in [0..9]
      ((i) -> it "finds the right ##{i} of them", ->
        expect(result[i][0]).toEqual($form.find(':input')[i]))(i)

