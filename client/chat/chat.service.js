(function () {
	'use strict';

	angular
		.module('app.chat')
		.factory('chatService', chatService);

	chatService.$inject = ['$cookies','$http'];

	/* @ngInject */
	function chatService($cookies,$http) {
		return {
			getChatDetails: getChatDetails
		};

		////////////////

		function getChatDetails() {
			console.log($cookies.get('authToken'));
			return $http
				.get('/app/chat',{
					headers:{
						"Authorization":"Bearer "+$cookies.get('authToken')
					}
				})
				.then(function(response){
					console.log(response.status,response.data);
				});
		}
	}

})();

