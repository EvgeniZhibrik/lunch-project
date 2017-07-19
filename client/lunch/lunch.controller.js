(function () {
	function lunchController($scope, $location, $q, lunchService, superService) {

		function init() {
			$scope.menu = [];
			$scope.users = [];

			$scope.chosenMenu = lunchService.chosenMenu;
			$scope.chosenUser = lunchService.chosenUser;

			var promises = {
				menu: lunchService.getMenus(),
				users: lunchService.getUsers()
			};

			$q.all(promises).then(function(data){
				$scope.menu = data.menu;
				$scope.users = data.users.data;
			}).catch(function(data){
				console.log('ups');
			});
		}

		init();

		$scope.chooseMenu = function (lunch) {
			$scope.chosenMenu = lunchService.chosenMenu = {
				name: lunch.name,
				price: superService.getTotalPrice(lunch)
			};
			$location.path('/userlist');
		};

		$scope.chooseUser = function(userName){
			$scope.chosenUser = lunchService.chosenUser = userName;
		};

		$scope.getTotalPrice = lunchService.getTotalPrice;

		$scope.makeOrder = function (lunch, user) {
			lunchService.makeOrder(lunch, user).then(function(response){
				alert('Hello ' + response.data.order.user + '! You ordered ' + response.data.order.lunch.name + '. Your order numder: ' + response.data.number);
				$location.path('/');
			}).catch(function(resp){
				console.log(resp.data);
			});
		}

		$scope.emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	}


	angular.module('lunch').controller('lunchController', ['$scope', '$location', '$q', 'lunchService', 'superService', lunchController]);
})();