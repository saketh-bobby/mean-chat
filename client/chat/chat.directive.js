(function () {
	'use strict';

	angular
		.module('app.chat',[])
		.directive('myChatDirective',myChatDirective);

	myChatDirective.$inject = [];

	/* @ngInject */
	function myChatDirective() {
		return {
			bindToController: true,
			controller: ControllerName,
			controllerAs: 'vm',
			templateUrl:'/partials/chat-app.html',
			link: link,
			scope: {}
		};

		function link(scope, element, attrs) {

		}
	}

	ControllerName.$inject = [];

	/* @ngInject */
	function ControllerName() {
		var vm = this;
		console.log('here');
		vm.sendText = function(){

		};
	}

})();

