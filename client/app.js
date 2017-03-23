(function () {
	angular
		.module('chatApp', ['ngRoute', 'app.landing', 'app.auth.signup', 'app.auth.login','app.chat'])
		.run(runFunction)
		.config(configFunction)
		.factory('authInterceptorFactory',authInterceptorFactory);

	runFunction.$inject    = ['$rootScope','$location','authorization'];
	configFunction.$inject = ['$routeProvider', '$locationProvider','$httpProvider'];
	authInterceptorFactory.$inject = ['$cookies'];
	////////////
	function runFunction($rootScope,$location,authorization) {
		$rootScope.$on('$routeChangeStart',function(event,next){
			//	if protected routes
			if ($location.path() == '/app/chat') {
				if (!authorization.isLoggedIn()) {
					$location.path('/login');
				} else{
					$rootScope.$emit('state:chatopen',true);
				}
			} else{
				$rootScope.$emit('state:chatopen',false);
			}

			if($location.path() == '/logout'){
				authorization.dropAuthCookie();
				$rootScope.$emit('state:login',false);
				$location.path('/');
			}
		});
	}

	function configFunction($routeProvider, $locationProvider,$httpProvider) {

		$locationProvider.html5Mode(true);

		$routeProvider
			.when('/', {
				templateUrl: '/partials/landing.html',
				controller: 'LandingCtrl',
				controllerAs: 'vm'
			})
			.when('/signup', {
				templateUrl: '/partials/signup.html',
				controller: 'SignupCtrl',
				controllerAs: 'vm'
			})
			.when('/login', {
				templateUrl: '/partials/login.html',
				controller: 'LoginCtrl',
				controllerAs: 'vm'
			})
			.when('/app/chat', {
				template: '<my-chat-directive></my-chat-directive>',
				// resolve:{
				// 	userData:['chatService','$location',function(chatService,$location){
				// 		return chatService
				// 						.getUserData()
				// 						.then(function(response){
				// 							return response.data.user;
				// 						},function(error){
				// 							$location.path('/');
				// 						});
				// 	}]
				// }
			})
			.otherwise('/');

			$httpProvider.interceptors.push('authInterceptorFactory');
	}

//	interceptor factory function
function authInterceptorFactory($cookies){
	return {
		request:function(config){
			if(config.url.indexOf('/app/') > -1){
				config.headers['Authorization'] = 'Bearer '+$cookies.get('authToken');
			}
			return config;
		},
		requestError:function(err){
			return err;
		}
	}
}

})();




//	// global var yuck
// if(authorization.isLoggedIn()){
// 	$rootScope.isLoggedIn = true;
// }
// if($location.path() == '/app/chat'){
// 	if(!authorization.isLoggedIn()){
// 		$location.path('/login');
// 	}
// 	$rootScope.isChatOpen = true;
// } else{
// 	$rootScope.isChatOpen = false;
// }
// if($location.path() == '/logout'){
// 	authorization.dropAuthCookie();
// 	$rootScope.isLoggedIn = false;
// 	$location.path('/login');
// }
