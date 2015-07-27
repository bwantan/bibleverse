// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app.controllers', []);
angular.module('app.services', []);
angular.module('app.directives', []);
angular.module('app.filters', []);

angular.module('app', ['ionic', 'ngResource', 'ngCordova', 'app.controllers', 'app.services', 'app.directives', 'app.filters']);

angular.module('app').run(function($ionicPlatform, $rootScope) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

angular.module('app').config(['$ionicConfigProvider', function($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top
    $ionicConfigProvider.views.transition('ios');
    $ionicConfigProvider.tabs.style("standard");
    $ionicConfigProvider.navBar.alignTitle('center').positionPrimaryButtons('left');

}]);

angular.module('app').constant('$ionicLoadingConfig', {
  template: '<ion-spinner></ion-spinner>',
  delay: 0,
  noBackdrop: true,
  duration: 15000
});

angular.module('app').config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html'
      })

      .state('app.help', {
        url: '/help',
        views: {
          'menuContent': {
            templateUrl: 'templates/help.html'
          }
        }
      })


      .state('app.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'templates/about.html'
          }
        }
      })

      .state('app.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'templates/settings.html'
          }
        }
      })
      .state('app.account', {
        url: '/account',
        views: {
          'menuContent': {
            templateUrl: 'templates/account.html'
          }
        }
      })
      .state('app.verses', {
        url: '/verses',
        views: {
          'menuContent': {
            templateUrl: 'templates/verseList.html'
          }
        }
      })

      .state('app.friends', {
        url: '/friends',
        views: {
          'menuContent': {
            templateUrl: 'templates/friends.html'
          }
        }
      })

      .state('app.new', {
          url: '/new',
          views: {
              'menuContent': {
                  templateUrl: 'templates/addnew.html'
              }
          }
      })

      .state('app.verse', {
        url: '/verse/:verseid',
        views: {
          'menuContent': {
            templateUrl: 'templates/verse.html'
          }
        }
      });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/verses');

});
