angular.module('session.controller', ['auto_product.service'])
    .controller('SessionController',
    
    ["Collection", "AutoProductService", "Storage", "$location", "$timeout",
    	
    function (Collection, AutoProductService, Storage, $location, $timeout) {

        // Store Session Key Info
        Storage.setSessionId(Collection.items[0].data.sessionId);
        Storage.setPrivateKey(Collection.items[0].data.privateKey);

        // Navigate to Landing Page
        if (Collection.links.auto) {
            $timeout(function() {
            	var promise = AutoProductService.post({"platform" : "R"}).$promise;
            	
            	promise.then(function() {
	            	$location.path('/auto_landing');
            	});
            }, 100);
        }
        else if (Collection.links.home) {
            $timeout(function() { $location.path('/home_landing'); }, 3500);
        }

    }]);
