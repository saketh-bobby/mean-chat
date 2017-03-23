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

	ControllerName.$inject = ['socket','$timeout'];

	/* @ngInject */
	function ControllerName(socket,$timeout) {
		var vm = this;
		vm.sendText = function(){

		};

		socket.on('connected', function (data) {
			console.log(data);
		});

		socket.emit('client-connected','success from client');
		
	}

})();

