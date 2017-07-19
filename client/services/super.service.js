(function () {
	angular.module('services')
		.service('superService', ['$http', function ($http) {

			this.getTotalPrice = function (lunch) {
				return lunch.food.reduce(function (prev, cur){
					return prev + cur.price;
				}, 0);
			};
		}]);
})();