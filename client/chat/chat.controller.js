(function () {
	'use strict';

	angular
		.module('app.chat',[])
		.controller('ChatCtrl', ChatCtrl);

	ChatCtrl.$inject = ['chatService'];

	/* @ngInject */
	function ChatCtrl(chatService) {
		chatService.getChatDetails();
		// var socket = io();
		// console.log(socket);
		////////////////


	}

})();

