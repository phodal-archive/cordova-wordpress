angular.module('cordpress.controllers', ['cordpress.services'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $sce, DataLoader, $rootScope) {

    $rootScope.url = 'http://www.leanjs.net';

    $rootScope.callback = '_jsonp=JSON_CALLBACK';

    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.src = $sce.trustAsResourceUrl( $rootScope.url + '/?appp=login' );
    });

    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    $scope.login = function() {
      $scope.modal.show();
    };

    $scope.logUserIn = function( username, password ) {

      console.log('Logging in...');

      $scope.spinner = true;
      $scope.loginMessage = null;

      targetFrame = window.frames['login-iframe'];
      targetFrame.postMessage( {
        message: 'login',
        username: username,
        password: password

      }, '*');

    }

    window.addEventListener('message', function(event) {
      if( event.data.loggedin === true ) {
        $scope.spinner = false;
        console.log(event.data);
        $scope.loggedin();
        $scope.closeLogin();
        localStorage.setItem('reactorUser', JSON.stringify( event.data ) );
      }

      if( event.data.loggedin === false )  {
        $scope.spinner = false;
        console.log(event.data.message);
        $scope.loginMessage = event.data.message;
        $scope.$apply();
      }

    });

    $scope.loggedin = function() {
      $scope.isUserLoggedIn = true;
    }

    $scope.logUserOut = function() {
      $scope.$broadcast('logout');
    }

    $scope.$on('logout', function(event, msg) {
      console.log('doing logout');
      localStorage.removeItem('reactorUser');
      $scope.isUserLoggedIn = false;
      $scope.closeLogin();
    });
})

.controller('PostCtrl', function ($scope, $stateParams, DataLoader, $ionicLoading, $rootScope, $sce) {
	$rootScope.url = 'http://www.leanjs.net';

	$rootScope.callback = '_jsonp=JSON_CALLBACK';

	$ionicLoading.show({
		noBackdrop: true
	});

	var singlePostApi = $rootScope.url + '/wp-json/posts/' + $stateParams.postId + '?' + $rootScope.callback;

	DataLoader.get(singlePostApi).success(function (data, status, headers, config) {
		$scope.post = data;
		$scope.content = $sce.trustAsHtml(data.content);
		$ionicLoading.hide();
	}).error(function (data, status, headers, config) {
		console.log('error');
	});

})

.controller('PostsCtrl', function ($scope, $stateParams, DataLoader, $ionicLoading, $rootScope, $sce) {
	$rootScope.url = 'http://www.leanjs.net';

	$rootScope.callback = '_jsonp=JSON_CALLBACK';

	$ionicLoading.show({
		noBackdrop: true
	});

	var singlePostApi = $rootScope.url + '/wp-json/posts/' + '?' + $rootScope.callback;

	DataLoader.get(singlePostApi).success(function (data, status, headers, config) {
		$scope.posts = data;
		$ionicLoading.hide();
	}).error(function (data, status, headers, config) {
		console.log('error');
	});
});
