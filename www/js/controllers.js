angular.module('cordpress.controllers', ['cordpress.services'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
	$scope.loginData = {};

	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
	}).then(function (modal) {
		$scope.modal = modal;
	});

	$scope.closeLogin = function () {
		$scope.modal.hide();
	};

	$scope.login = function () {
		$scope.modal.show();
	};

	$scope.doLogin = function () {
		console.log('Doing login', $scope.loginData);

		$timeout(function () {
			$scope.closeLogin();
		}, 1000);
	};
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
