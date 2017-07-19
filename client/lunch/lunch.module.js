(function () {
	angular.module('lunch', ['ngRoute'])
		.config(function ($routeProvider) {
			$routeProvider.when('/', {
				controller: 'lunchController',
				templateUrl: 'lunch/menuTemplate.html'
			}).when('/userlist', {
				controller: 'lunchController',
				templateUrl: 'lunch/usersTemplate.html'
			}).otherwise('/');
		});

})();