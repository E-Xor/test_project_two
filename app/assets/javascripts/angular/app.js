;(function() {

  window.NgApp = angular.module('NgBallers', ['ngResource', 'ui.bootstrap', 'ui.highlight', 'ngSanitize']);

  NgApp.config([
    '$httpProvider', function($httpProvider) {
      $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

      $httpProvider.interceptors.push(['$q', '$rootScope', '$interval', function($q, $rootScope, $interval) {
        return {
          request: function (data) {
            if(data.method != 'GET') {
              $rootScope.barValue = 3;
              $rootScope.barInterval = $interval(function(){$rootScope.barValue += 3}, 100, 30);
            }

            return data;
          },

          requestError: function (rejection) {
            $interval.cancel($rootScope.barInterval);
            $rootScope.barValue = 0;

            return $q.reject(rejection);
          },

          response: function (data) {
            $interval.cancel($rootScope.barInterval);
            $rootScope.barValue = 0;

            return data;
          },

          responseError: function (rejection) {
            $interval.cancel($rootScope.barInterval);
            $rootScope.barValue = 0;

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
