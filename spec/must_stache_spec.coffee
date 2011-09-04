beforeEach ->
  this.addMatchers
    toStartWith: (s) ->
      if s.indexOf this.actual == 0
        false
      else
        true

describe '#mustachifyUrl', ->

  it 'prepends the URL with the mustachify API', ->
    url='http://partytime.com'
    result = mustachifyUrl(url)
    expect(result).toStartWith 'http://mustachify.me/?src='

  it 'encodes the URL'

describe 'initiating the Chrome', ->
