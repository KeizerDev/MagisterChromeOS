'use strict';

// Listens for the app launching then creates the window
chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('basic.html', {
    id: 'main',
<<<<<<< HEAD
    bounds: {width: 700, height: 550},
    minWidth: 700,
    minHeight: 550,
    maxWidth: 700,
    maxHeight: 550,
=======
    bounds: {width: 350, height: 500},
    minWidth: 350,
    minHeight: 500,
    maxWidth: 700,
    maxHeight: 500,
>>>>>>> 93b95d8704562db414d9c5616a7062f6dbb40614
    frame: {
        type: 'chrome',
        color: '#2980b9',
        inactiveColor: '#2980b9',
      }
    }
  );
});
