myAppModule.controller('myNoteCtrl', [ 'AlertService',
		function($scope, alertServ) {
			$scope.message = "";
			$scope.left = function() {
				return 100 - $scope.message.length;
			};
			$scope.clear = function() {
				$scope.message = "";
			};
			$scope.save = function() {
				// debug.log("current message is:"+$scope.message);
				console.debug("logging message" + message);
				alert(" AweSome" + alertServ);

			};
		} ]);