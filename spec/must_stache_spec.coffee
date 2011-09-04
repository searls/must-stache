beforeEach ->  
  this.addMatchers
    toStartWith: (string) ->
      _(this.actual).startsWith(string)
    toEndWith: (string) ->
      _(this.actual).endsWith(string)

describe '#mustachifyUrl', ->

  it 'prepends the URL with the mustachify API', ->
    url = 'http://partytime.com'
    result = mustStache.mustachifyUrl(url)
    expect(result).toEqual 'http://mustachify.me/?src='+url
    
describe "#swapImageSources", ->
  $img1=img1Src=$img2=img2Src=null
  beforeEach ->
    $img1 = $.jasmine.inject('<img src="panda"/>')
    $img2 = $.jasmine.inject('<img src="pants"/>')  
    img1Src = $img1[0].src
    img2Src = $img2[0].src
   
    mustStache.swapImageSources((src) -> src+'-winning');
    
  it "replaces the source of an image", ->
    expect($img1).toHaveAttr('src',img1Src+'-winning')
    
  it "replaces the source of a second image", ->
    expect($img2).toHaveAttr('src',img2Src+'-winning')
    
describe "#mustachifyImages", ->
  it "swaps all the images out with mustaches", ->
    spyOn(mustStache, "swapImageSources")    
    mustStache.mustachifyImages();    
    expect(mustStache.swapImageSources).toHaveBeenCalledWith(mustStache.mustachifyUrl)
      
xdescribe 'initiating the Chrome', ->
