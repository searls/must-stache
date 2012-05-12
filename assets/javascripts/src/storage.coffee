((M, $, _) ->
  storage = localStorage
  M.extend "storage",
    get: (key) -> storage[key]
    set: (key, value) -> storage[key] = value

    getStorage: -> storage
    setStorage: (override) -> storage = override

    saveOptionsOnForm: ($form) ->
      _(M.forms.allInputsOn($form)).each ($input) ->
        storage[$input.attr("id")] = $input.val()

    restoreOptionsOnForm: ($form) ->
      _(M.forms.allInputsOn($form)).each ($input) ->
        $input.val storage[$input.attr("id")]

    extensionEnabled: ->
      storage["mustStacheExtensionStatus"] isnt "disabled"

    missingApiKeys: ->
      not storage["faceComApiKey"] or not storage["faceComApiSecret"]
) MustStache, MustStache.$, MustStache._