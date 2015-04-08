angular.module('cordpress', ['ionic', 'cordpress.controllers', 'cordpress.services'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
      })

      .state('app.posts', {
        url: "/posts",
        views: {
          'menuContent': {
            templateUrl: "templates/posts.html",
            controller: 'PostsCtrl'
          }
        }
      })

      .state('app.single', {
        url: "/posts/:postId",
        views: {
          'menuContent': {
            templateUrl: "templates/post_detail.html",
            controller: 'PostCtrl'
          }
        }
      });
    $urlRouterProvider.otherwise('/app/posts');
  });
