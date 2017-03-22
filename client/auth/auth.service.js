(function () {

	angular
		.module('app.auth.signup')
		.factory('authorization', authorization);

	authorization.$inject = ['$http', '$cookies', '$location','$window'];
	function authorization($http, $cookies, $location,$window) {
		return {
			getJwt:getJwt, /* retrieve jwt from cookie store*/
			saveJwt: saveJwt,     //save jwt after login
			postForSignup: postForSignup, //request for signup
			postForLogin: postForLogin,    //request for login
			isLoggedIn:isLoggedIn,
			dropAuthCookie:dropAuthCookie
		};

		///////////
		/**
		 *      Signup services here
		 */
		function postForSignup(data) {
			return $http
				.post('/auth/signup', data)
				.then(handler);
			/* get result of signup */

			function handler(response) {
				if (response.data) {
					if (response.data.message === 'existing') {
						$location.path('/login?existing=true');
					} else if (response.data.message === 'success') {
						$location.path('/users');
						/*todo:decode jwt and construct url*/
					}
				}
			}
		}

		/**
		 *      Login Services  here
		 */
		function postForLogin(data) {

			return $http
				.post('/auth/login', data);
		}

		function saveJwt(jwtToken) {
			if (jwtToken) {
				$cookies.put('authToken', jwtToken);
			}
		}

		function getJwt(){
			return $cookies.get('authToken') || '';
		}

		function isLoggedIn(){
			var jwtToken = getJwt();
			if(jwtToken != ''){
				var array = jwtToken.split('.');
				var payload = array[1];
				payload = $window.atob(payload);
				payload = JSON.parse(payload);
				return payload.exp > Date.now() / 1000;
			}
			return false;
		}

		function dropAuthCookie(){
			if($cookies.get('authToken')){
				$cookies.remove('authToken');
			}
		}


	}/* end of service*/

})();