(function () {
	'use strict';

	angular
		.module('app.chat')
		.factory('chatService', chatService);

	chatService.$inject = ['$http'];

	/* @ngInject */
	function chatService($http) {
		return {
			getUserData: getUserData
		};

		////////////////
		//
		function getUserData() {
			return $http
				.get('/app/api/me');
		}
	}

})();

