(function () {
	'use strict';

	angular
		.module('chatApp')
		.directive('myNav', myNav);

	myNav.$inject = [];

	/* @ngInject */
	function myNav() {
		var directive = {
			bindToController: true,
			controller: navCtrl,
			controllerAs: 'vm',
			templateUrl:'/myNav.html',
			link: link,
			// restrict: 'A',
			scope: {
				isLoggedIn:'@',
				isChatOpen:'@'
			}
		};
		return directive;

		function link(scope, element, attrs) {
			console.log(attrs);
		}
	}

	navCtrl.$inject = [];

	/* @ngInject */
	function navCtrl() {
		var vm = this;
	}

})();

