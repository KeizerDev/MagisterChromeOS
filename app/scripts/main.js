'use strict';

// Listens for the app launching then creates the window
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    id: 'main',
    bounds: {width: 350, height: 450},
    minWidth: 350,
    minHeight: 450,
    maxWidth: 350,
    maxHeight: 450,
    frame: {
        type: 'chrome',
        color: '#2980b9',
        inactiveColor: '#2980b9',
      }
    }
  );
});