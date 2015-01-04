angular.module('driver_vehicle.controller', ['vehicle.service', 'driver.service', 'vin_lookup.service'])
    .controller('DriverVehicleController', 
    
    ["$http", "$scope", "VehicleCollection", "DriverCollection", "VehicleService", "DriverService", "VinLookupService", "$timeout", "$location",
    
    function ($http, $scope, VehicleCollection, DriverCollection, VehicleService, DriverService, VinLookupService, $timeout, $location) {
        $scope.collection = VehicleCollection;

        $scope.vehicles = VehicleCollection.items;
        $scope.drivers  = DriverCollection.items;

        $scope.years = [];
        $scope.makes = [];
        $scope.models = [];
        $scope.bodyTypes = [];

        $scope.add_vehicle_message = null;

        $http.get('/api/dropdown/vehicle_year', {
        }).then(
            function(response) {
                $scope.years = response.data;
            }
        );

        $scope.getMakes = function(year) {
            if (year == null) {
                $scope.makes = [];
                $scope.new_vehicle.make = null;
                $scope.new_vehicle.model = null;
                $scope.new_vehicle.bodyType = null;
                return;
            }

            $http.get('/api/dropdown/vehicle_make', {
                params: {'year': year}
            }).then(
                function (response) {
                    $scope.makes = response.data;
                    $scope.models = [];
                    $scope.bodyTypes = [];
                    $scope.new_vehicle.make = null;
                    $scope.new_vehicle.model = null;
                    $scope.new_vehicle.bodyType = null;
                }
            );
        }

        $scope.getModels = function(year, make) {
            if (year == null || make == null) {
                $scope.models = [];
                $scope.new_vehicle.model = null;
                $scope.new_vehicle.bodyType = null;
                return;
            }

            $http.get('/api/dropdown/vehicle_model', {
                params: {'year': year, 'make': make}
            }).then(
                function(response) {
                    $scope.models = response.data;
                    $scope.bodyTypes = [];
                    $scope.new_vehicle.model = null;
                    $scope.new_vehicle.bodyType = null;
                }
            );
        }

        $scope.getBodyTypes = function(year, make, model) {
            if (year == null || make == null || model == null) {
                $scope.bodyTypes = [];
                $scope.new_vehicle.bodyType = null;
                return;
            }

            $http.get('/api/dropdown/vehicle_body', {
                params: {'year': year, 'make': make, 'model': model}
            }).then(
                function(response) {
                    $scope.bodyTypes = response.data;
                    $scope.new_vehicle.bodyType = null;
                }
            );
        }

        $scope.addVehicle = function() {
            var vehicle = {
                'year'    : $scope.new_vehicle.year.value,
                'make'    : $scope.new_vehicle.make.value,
                'model'   : $scope.new_vehicle.model.value,
                'bodyType': $scope.new_vehicle.bodyType.value
            };

            var promise = VehicleService.post(vehicle);
            promise.$promise.then(function(data) {
                $scope.vehicles = data.items;

                $scope.add_vehicle_message = "Added Vehicle - " +
                    $scope.new_vehicle.year.value + " " +
                    $scope.new_vehicle.make.value + " " +
                    $scope.new_vehicle.model.value + " " +
                    $scope.new_vehicle.bodyType.value;

                $timeout(function() { $scope.add_vehicle_message = null; }, 3500);

                $scope.new_vehicle = null;

                $scope.makes = [];
                $scope.models = [];
                $scope.bodyTypes = [];
            });
        }
        
        $scope.addDriver = function() {
        	
        	var d = {
        		'firstName' : $scope.new_driver.firstName,
        		'lastName'  : $scope.new_driver.lastName,
        		'birthdate' : Date.parse($scope.new_driver.birthdate)
        	};
        	
        	var promise = DriverService.post(d);
        	
        	promise.$promise.then(function(data) {
        		$scope.drivers = data.items;        		
        		$scope.new_driver = null;
        	});
        }

        $scope.isValid = function() {
            var isValid = false;
            if($scope.new_vehicle)
            console.log($scope.new_vehicle.bodyType);
            if ($scope.new_vehicle != null && $scope.new_vehicle.bodyType != null) {
                isValid = true;
            }
            console.log('isValid - ' + isValid);
            return isValid;
        }

        $scope.lookupVin = function() {
            var promise = VinLookupService.get({'vin': '112222'}).$promise;
            promise.then(function(veh) {
            
                var vehicle = {
                    year: veh.year,
                    make: veh.make,
                    model: veh.model,
                    bodyType: veh.bodyType
                }

                var p2 = VehicleService.post(vehicle);
                
                p2.$promise.then(function(data) {
                    $scope.vehicles = data.items;

                    $scope.add_vehicle_message = "Added Vehicle - " +
                        veh.year + " " +
                        veh.make + " " +
                        veh.model + " " +
                        veh.bodyType;

                    $timeout(function() { $scope.add_vehicle_message = null; }, 3500);

                    $scope.new_vehicle = null;

                    $scope.makes = [];
                    $scope.models = [];
                    $scope.bodyTypes = [];
                });
            });
        }
        
        $scope.continueClick = function() {
        	$location.path('/vehicle_details/1');
        }
    }]);
