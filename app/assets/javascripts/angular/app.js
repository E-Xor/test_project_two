;(function() {

  window.NgApp = angular.module('NgBallers', ['ngResource', 'ui.bootstrap']);
  NgApp.config([
    "$httpProvider", function($httpProvider) {
      $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }
  ]);

})();
