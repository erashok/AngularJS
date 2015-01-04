angular.module('auto_landing.controller', ['auto_product.service', 'address.service', 'googlemaps.address.service'])
    .controller('AutoLandingController',
    
    ["$scope", "Collection", "AutoProductService", "AddressService", "GoogleMapsAddressService", "Storage", "$location",
    	
    function ($scope, Collection, AutoProductService, AddressService, GoogleMapsAddressService, Storage, $location) {

        // Dynamic Request Payload
        $scope.request = {};

        // Errors from REST Controller
        $scope.errors = {};

        // Field Information to Build the Template
        $scope.template = Collection.template;

        // Address Information from Google Maps API
        $scope.addressLookup = {};

        // Button Click
        $scope.getStarted = function () {

            // Check Form Validation Status
            if ($scope.landing.$invalid) {
                $scope.showFormError = true;
                return;
            }

            // Save Template Data
            var promise = AddressService.put_residence($scope.request);
            promise.$promise.then(
                function(collection) {
                    var errors = collection.error;
                    if (errors) {
                        $scope.errors = errors;
                        return;
                    }

                    // Store Auto Product Id
                    getProductId(collection.href);

                    // Save City and State to Customer
                    var promise2 = AddressService.put_residence({'city' : $scope.addressLookup.city, 'state': $scope.addressLookup.state});
                    promise2.$promise.then(
                        function(data) {
                        	$location.path('/customer');
                        }
                    );
                }
            );
        }

        // Get City and State from Google Maps API
        $scope.getLocation = function(obj) {
            if (obj.$modelValue == undefined || obj.$modelValue.length != 5) {
                $scope.addressLookup = {};
                return;
            }
            var promise = GoogleMapsAddressService.getLocationPromise(obj.$modelValue, 5);

            promise.then(function(response) {
                var location = response.data.results[0].formatted_address;
                if (location.indexOf(", USA") != -1) {
                    location = location.substr(0, location.indexOf(", USA") - 6);
                }
                $scope.addressLookup.location = location;
                parseLocation(location);
            })
        }

        // Remove Error from Form Element
        $scope.removeError = function(id) {
            delete $scope.errors[id];

            // Check Form Valid State
            if ($scope.landing.$valid) {
                $scope.showFormError = false;
            }
        }

        function getProductId(url) {
            var index = url.indexOf('/auto/');
            var id = url.substr(index + 6);
            Storage.setAutoProductId(id);
        }

        function parseLocation(location) {
            var array = location.split(", ");
            if (array.length == 2) {
                $scope.addressLookup.city = array[0];
                $scope.addressLookup.state = array[1];
            }
            else {
                delete $scope.addressLookup.city;
                delete $scope.addressLookup.state;
            }
        }
    }]);
