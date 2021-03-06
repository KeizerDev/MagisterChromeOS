'use strict';

// Listens for the app launching then creates the window
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    id: 'main',
    bounds: {width: 700, height: 520},
    minWidth: 350,
    minHeight: 500,
    maxWidth: 700,
    maxHeight: 520,
    frame: {
        type: 'chrome',
        color: '#2980b9',
        inactiveColor: '#2980b9',
      }
    }
  );
});
