;(function() {

  window.NgApp = angular.module('NgBallers', ['ngResource', 'ui.bootstrap', 'ui.highlight', 'ngSanitize']);

  NgApp.config(['$httpProvider', function($httpProvider) {
      $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

      $httpProvider.interceptors.push(['$q', '$rootScope', '$interval', function($q, $rootScope, $interval) {

        function startBar(){
          console.log('startBar');
          $rootScope.barValue = 10;
          $rootScope.barInterval = $interval(function(){$rootScope.barValue += 3}, 20, 28);
        };

        function stopBar(){
                    console.log('stopBar');
          $rootScope.barValue = 0;
        };

        return {
          request: function (data) {
            if(data.method != 'GET') {
              startBar();
            }

            return data;
          },

          requestError: function (rejection) {
            stopBar();

            return $q.reject(rejection);
          },

          response: function (data) {
            stopBar();

            return data;
          },

          responseError: function (rejection) {
            stopBar();

            return $q.reject(rejection);
          }
        }
      }]);
    }
  ]);

  NgApp.run(['$rootScope', function($rootScope){
    $rootScope.barValue = 0;
  }]);

})();
