((M, $, _) ->
  M.extend "background",
    registeredRequestTypes:
      localStorage: (request, sender, sendResponse) ->
        sendResponse M.storage.getStorage()

      setLocalStorageKey: (request, sender, sendResponse) ->
        M.storage.set(request.key, request.value)

      permissionToExecute: (request, sender, sendResponse) ->
        if not M.storage.missingApiKeys() and M.storage.extensionEnabled()
          sendResponse true
        else
          sendResponse false

      image: (request, sender, sendResponse) ->
        url = (if request.url is "img/mustache.png" then chrome.extension.getURL("img/mustache.png") else request.url)
        img = new Image()
        img.onload = ->
          canvas = document.createElement("canvas")
          canvas.width = img.width
          canvas.height = img.height
          canvas.getContext("2d").drawImage img, 0, 0
          sendResponse canvas.toDataURL()

        img.src = url

    applyBadges: ->
      if M.storage.missingApiKeys()
        chrome.browserAction.setBadgeText text: "api"
      else
        chrome.browserAction.setBadgeText text: ""
      unless M.storage.extensionEnabled()
        chrome.browserAction.setIcon path: "../icon/stache-19-disabled.png"
      else
        chrome.browserAction.setIcon path: "../icon/stache-19.png"

    listenToExtensionRequests: ->
      chrome.extension.onRequest.addListener (request, sender, sendResponse) ->
        M.background.registeredRequestTypes[request.type].apply this, arguments

  $ ->
    if $("body").hasClass("must-stache-background-script")
      setInterval M.background.applyBadges, 1000
      M.background.listenToExtensionRequests()
) MustStache, MustStache.$, MustStache._