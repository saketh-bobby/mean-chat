(function () {
	'use strict';

	angular
		.module('chatApp')
		.factory('socket', socket);

	socket.$inject = ['$rootScope'];

	/* @ngInject */
	function socket($rootScope) {

		var socket = io.connect();

		return {
			on: function (eventName, callback) {
				socket.on(eventName, function () {
					console.log(eventName);
					var args = arguments;
					$rootScope.$apply(function () {
						callback.apply(socket, args);
					});
				});
			},
			emit: function (eventName, data, callback) {
				socket.emit(eventName, data, function () {
					var args = arguments;
					$rootScope.$apply(function () {
						if (callback) {
							callback.apply(socket, args);
						}
					});
				})
			}
		};

		// return {
		// 	on:onSocketWrapper,
		// 	emit:emitSocketWrapper
		// };

		////////////////

		// function onSocketWrapper(event,callback) {
		// 	socket.on(event,function(){
		//
		// 	});
		// }
		//
		// function emitSocketWrapper(emit,data){
		// 	socket.emit(event,data);
		// }
	}

})();

