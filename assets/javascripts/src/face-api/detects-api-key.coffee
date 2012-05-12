((M, $, _) ->
  M.extend "faceApi.DetectsApiKey", ->
    self = {}

    self.detect = ->
      store 'faceComApiKey', ifWeCanFind: 'input[name="apiKey"]'
      store 'faceComApiSecret', ifWeCanFind: 'input[name="apiSecret"]'

    store = (key, options) ->
      $el = $(options.ifWeCanFind)
      if $el.length > 0 and !_($el.val()).isEmpty()
        chrome.extension.sendRequest
          type: 'setLocalStorageKey'
          key: key
          value: $el.val()

    self

  $ ->
    if window.location.host == "developers.face.com"
      M.faceApi.DetectsApiKey().detect()
) MustStache, MustStache.$, MustStache._