'use strict';

// Listens for the app launching then creates the window
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('basic.html', {
    id: 'main',
    bounds: {width: 700, height: 525},
    minWidth: 350,
    minHeight: 525,
    maxWidth: 700,
    maxHeight: 525,
    frame: {
        type: 'chrome',
        color: '#2980b9',
        inactiveColor: '#2980b9',
      }
    }
  );
});
