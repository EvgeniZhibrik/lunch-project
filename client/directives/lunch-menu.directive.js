(function () {
	angular.module('directives').directive('lunchMenu', function () {
		return {
			restrict: 'E',
			templateUrl: 'directives/lunch-menu.tmpl.html',
			scope: {
				lunch: '=',
				onSelect: '&'
			},
			controller: ['$scope', 'superService', function ($scope, superService) {
				$scope.getTotalPrice = superService.getTotalPrice;
			}]
		};
	});
})();