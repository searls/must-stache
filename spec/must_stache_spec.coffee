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

  xit 'encodes the URL', ->
    url = 'http://partytime.com?ask=yes&party=pants'
    result = mustStache.mustachifyUrl(url)
    expect(result).toEndWith $.URLEncode(url)
    
describe "#swapImageSources", ->
  $img1=$img2=actor=null
  beforeEach ->
    $img1 = $.jasmine.inject('<img src="panda"/>')
    $img2 = $.jasmine.inject('<img src="pants"/>')
    actor = (src) -> src+' winning' 
    
    mustStache.swapImageSources(actor);
    
  it "replaces the source of an image", ->
    expect($img1).toHaveAttr('src','panda winning')
    
  it "replaces the source of a second image", ->
    expect($img2).toHaveAttr('src','pants winning')
    
xdescribe "#mustachifyImages", ->
  
    
xdescribe 'initiating the Chrome', ->
