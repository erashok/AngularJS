angular.module('customer.controller', ['address.service', 'auto_product.service'])
    .controller('CustomerController',
    
    ["$scope", "AddressCollection", "AutoProductCollection", "AddressService", "AutoProductService", "$location", "$q",
    	
    function ($scope, AddressCollection, AutoProductCollection, AddressService, AutoProductService, $location, $q) {

        $scope.errors = {};

        $scope.address_template      = AddressCollection.template;
		$scope.auto_product_template = AutoProductCollection.template;
		
		$scope.address_data          = AddressCollection.items[0].data;
		$scope.auto_product_data     = AutoProductCollection.items[0].data;

        $scope.continueClick = function() {

            if ($scope.customer.$invalid) {
          3      $scope.showFormError = true;
                return;
            }

            $q.all([
            	AddressService.put_residence($scope.address_data).$promise.then(function(collection) {
            		if (collection.error) {
            			$scope.errors = collection.error;
            		}
            	}),
            	AutoProductService.put($scope.auto_product_data).$promise.then(function(collection) {
            		if (collection.error) {
            			$scope.errors = collection.error;
            		}
            	})
            ]).then(function(a) {
				$location.path('/driver_vehicle');
            });
        }
        
        $scope.removeError = function(id) {
            delete $scope.errors[id];

            if ($scope.customer.$valid) {
                $scope.showFormError = false;
            }
        }
    }]);
