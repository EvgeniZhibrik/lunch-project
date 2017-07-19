(function(){
	function lunchService ($http, $q){

		var menuString;

		this.chosenMenu = null;
		this.chosenUser = '';

		this.getMenus = function () {
			var d = $q.defer();
			menuString = menuString || sessionStorage.getItem('menuString');
			if (menuString) {
				d.resolve(JSON.parse(menuString));
			} else {
				$http.get('/menu').then(function (response) {
					menuString = JSON.stringify(response.data);
					sessionStorage.setItem('menuString', menuString);
					d.resolve(response.data);
				});
			}
			return d.promise;

		};

		this.getUsers =  function getUsers () {
			return $http.get('/users');
		};

		this.makeOrder = function makeOrder (lunch, user){
			return $http.post('/order', {
				user: user,
				lunch: lunch
			});
		};
	}

	angular.module('lunch').service('lunchService', ['$http', '$q', lunchService]);
})();
