(function () {
	'use strict';

	angular
		.module('app.auth.login', [])
		.controller('LoginCtrl', LoginCtrl);

	LoginCtrl.$inject = ['authorization', '$location', '$cookies','$rootScope'];

	function LoginCtrl(authorization, $location, $cookies,$rootScope) {
		var vm = this;

		vm.login = function () {
			var data = {
				username: vm.username,
				password: vm.password
			};
			authorization
				.postForLogin(data)
				.then(function (response) {
					if (response.data.token) {
						var jwtToken = response.data.token;
						$cookies.put("authToken", jwtToken);
						$rootScope.$emit('state:login',true);
						$location.path("/");
					}
				})
				.catch(function (response) {
					if (response.data.message) {
							vm.messages = [];
							vm.messages.push(response.data.message);
					}
				});
		};
		////////////////

	}

})();

