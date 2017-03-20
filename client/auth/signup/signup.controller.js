(function(){
	angular
		.module('app.auth.signup',['ngCookies'])
		.controller('SignupCtrl',SignupCtrl);
	SignupCtrl.$inject = ['authorization','$location'];
	function SignupCtrl(authorization,$location){
		var vm = this;
		vm.signup = signupHandler; /* signup request made using data*/

		/////////////

		function signupHandler(){
			var data = {
				email:vm.email,
				username:vm.username,
				password:vm.password
			};
			authorization
				.postForSignup(data)
				.then(function(response){
					if(response.token){
						authorization.saveJwt(response);
						$location.path("/login");
					}
				})
				.catch(function(response){
					if(response.data.message){
						vm.messages = [];
						vm.messages.push(response.data.message);
					}
				});
		}
	}
})();