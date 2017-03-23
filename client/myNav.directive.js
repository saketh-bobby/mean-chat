(function () {
	'use strict';

	angular
		.module('chatApp')
		.directive('myNav', myNav);

	myNav.$inject = [];

	/* @ngInject */
	function myNav() {
		return {
			bindToController: true,
			controller: navCtrl,
			controllerAs: 'vm',
			templateUrl: '/myNav.html',
			link: link,
			// restrict: 'A',
			scope: {}
		};

		function link(scope, element, attrs) {
		}
	}

	navCtrl.$inject = ['$rootScope'];

	/* @ngInject */
	function navCtrl($rootScope) {
		var vm = this;
		$rootScope.$on('state:login',function(event,isLoggedIn){
			vm.isLoggedIn = isLoggedIn;
		});
		$rootScope.$on('state:chatopen',function(event,isChatOpen){
			vm.isChatOpen = isChatOpen;
		});

	}

})();

