(function () {
	angular
		.module('chatApp', ['ngRoute', 'app.landing', 'app.auth.signup', 'app.auth.login','app.chat'])
		.run(runFunction)
		.config(configFunction);

	runFunction.$inject    = ['$rootScope', '$location', 'authorization'];
	configFunction.$inject = ['$routeProvider', '$locationProvider'];

	////////////
	function runFunction($rootScope, $location, authorization) {
		$rootScope
			.$on('$routeChangeStart', function (event, next) {
				if (authorization.isLoggedIn()) {
					//	todo: for buttons visibility
					$rootScope.isLoggedIn = true;
				}
				if ($location.path() == '/users' && !authorization.isLoggedIn()) {
					$location.path('/');
				}
			});
	}

	function configFunction($routeProvider, $locationProvider) {

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
				templateUrl: '/partials/chat.html',
				controller: 'ChatCtrl',
				controllerAs: 'vm'
			})
			.otherwise('/');
	}
})();




