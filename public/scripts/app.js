(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  // Sets app default base URL
  app.baseUrl = '/';

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  // app.addEventListener('dom-change', function() {
  //   console.log('Our app is ready to rock!');
  // });

  window.addEventListener('WebComponentsReady', function() {
      console.log('Our app is ready to rock!');
    // imports are loaded and elements have been registered
  });

  // app.closeDrawer = function() {
  //   app.$.paperDrawerPanel.closeDrawer();
  // };

})(document);
