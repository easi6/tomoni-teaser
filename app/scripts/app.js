'use strict';

angular.module('homepageApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'pascalprecht.translate',
  'ui.bootstrap.dropdownToggle'
])
  .config(function ($routeProvider, $translateProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      $translateProvider.useStaticFilesLoader({
        prefix: 'scripts/l10n/',
        suffix: '.json'
      });
      $translateProvider.preferredLanguage("en_US");
  });
