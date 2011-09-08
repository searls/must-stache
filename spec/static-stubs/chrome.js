(function() {
  window.chrome = {
    extension: {
      getURL: jasmine.createSpy("chrome.extension.getURL"),
      onRequest: {
        addListener: jasmine.createSpy("chrome.extension.onRequest.addListener")
      },
      sendRequest: jasmine.createSpy("chrome.extension.sendRequest")
    },
    browserAction: {
     setBadgeText: jasmine.createSpy("chrome.browserAction.setBadgeText"),
     setIcon: jasmine.createSpy("chrome.browserAction.setIcon")
    }
  };
})();