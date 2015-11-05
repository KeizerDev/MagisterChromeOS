'use strict';

// Listens for the app launching then creates the window
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('basic.html', {
    id: 'main',
    bounds: {width: 700, height: 500},
    minWidth: 350,
    minHeight: 500,
    maxWidth: 700,
    maxHeight: 500,
    frame: {
        type: 'chrome',
        color: '#2980b9',
        inactiveColor: '#2980b9',
      }
    }
  );
});
