var autosite = angular.module('auto_site',
    [
        'ui.bootstrap',
        'ngRoute',
        'ngResource',
        'LocalStorageModule',

        'session.controller',
        'session.service',

        'auto_landing.controller',
        'auto_product.service',
        'address.service',

        'customer.controller',

        'driver_vehicle.controller',
        'vehicle.service',
		'driver.service',

        'vehicle_details.service',

        'auth.interceptor',

        'ui.keypress',
        'ui.mask'
    ]
);

autosite.config(function ($routeProvider, $httpProvider) {//, localStorageServiceProvider
    $routeProvider
        .when('/', {
            title: 'Building your experience...',
            templateUrl: 'public/html/session.html',
            controller: 'SessionController',
            resolve: {
                Collection: function(SessionService) {
                    return SessionService.post().$promise;
                }
            }
        })
        .when('/auto_landing', {
            title: 'Welcome to MetLife Auto & Home',
            templateUrl: 'public/html/auto_landing.html',
            controller: 'AutoLandingController',
            resolve: {
                Collection: function(AddressService) {
                    return AddressService.get_residence().$promise;
                }
            }
        })
        .when('/home_landing', {
            title: 'Welcome to MetLife Home Insurance',
            templateUrl: 'public/html/home_landing.html'
        })
        .when('/customer', {
            title: 'Tell us about yourself',
            templateUrl: 'public/html/customer.html',
            controller: 'CustomerController',
            resolve: {
                AddressCollection: function(AddressService) {
                    return AddressService.get_residence().$promise;
                },
                AutoProductCollection: function(AutoProductService) {
                	return AutoProductService.get().$promise;
                }
            }
        })
        .when('/driver_vehicle', {
            title: 'Add your vehicles',
            templateUrl: 'public/html/driver_vehicle.html',
            controller: 'DriverVehicleController',
            resolve: {
                VehicleCollection: function(VehicleService) {
                    return VehicleService.get().$promise;
                },
                DriverCollection: function(DriverService) {
                	return DriverService.get().$promise;
                }
            }
        })
        .when('/vehicle_details/:vehicle_id', {
        	title: 'Vehicle details',
        	templateUrl: 'public/html/vehicle_details.html',
            resolve: {
                VehicleCollection: function(VehicleService, $route) {
                    return VehicleService.get({'vehicleId': $route.current.params.vehicle_id}).$promise;
                },
                VehicleDetailsCollection: function(VehicleDetailsService, $route) {
                    return VehicleDetailsService.get({'vehicleId': $route.current.params.vehicle_id}).$promise;
                }
            }
        })
        .otherwise({
            redirectTo: '/'
        });

        $httpProvider.interceptors.push('AuthInterceptor');

        //localStorageServiceProvider.setPrefix('auto_site');
});

autosite.service('Storage', function(localStorageService) {
    this.getSessionId = function() {
        return localStorageService.get("SessionId");
    }
    this.setSessionId = function(SessionId) {
        localStorageService.set("SessionId", SessionId);
    }

    this.getPrivateKey = function() {
        return localStorageService.get("PrivateKey");
    }
    this.setPrivateKey = function(PrivateKey) {
        localStorageService.set("PrivateKey", PrivateKey);
    }

    this.getAutoProductId = function() {
        return localStorageService.get("AutoProductId");
    }
    this.setAutoProductId = function(AutoProductId) {
        localStorageService.set("AutoProductId", AutoProductId);
    }

    this.destroy = function() {
        localStorageService.clearAll();
    }
});

autosite.run(function ($rootScope, SessionService, $location, Storage) {
    // Template ng-model Methods
    $rootScope.hasSuccess = function (element) {
        return element.$valid;
    }

    $rootScope.hasError = function (element) {
        return element.$dirty && element.$invalid;
    }

    $rootScope.getStatus = function(element) {
        if (element.$valid) {
            return "VALID";
        }
        else if (element.$dirty && element.$invalid) {
            return "ERROR"
        }
        else {
            return "PRISTINE";
        }
    }

    $rootScope.logout = function(element) {
    	var promise = SessionService.del();
    	
    	promise.$promise.then(
    		function(data) {
                Storage.destroy();
    			$location.path('/');
    	});
    }

    $rootScope.$on('$routeChangeSuccess', function(event, currentRoute) {
        $rootScope.title = currentRoute.$$route.title;
    });

});

// Numeric Only Keypress Directive
autosite.directive('numericOnly', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).on('keydown', function (event) {
                var key = event.which || event.keyCode;

                if (!event.shiftKey && !event.altKey && !event.ctrlKey &&
                    // numbers
                    key >= 48 && key <= 57 ||
                    // Numeric keypad
                    key >= 96 && key <= 105 ||
                    // Backspace and Tab and Enter
                    key == 8 || key == 9 || key == 13 ||
                    // Home and End
                    key == 35 || key == 36 ||
                    // left and right arrows
                    key == 37 || key == 39 ||
                    // Del and Ins
                    key == 46 || key == 45)
                    return true;

                return false;
            });
        }
    }
});

autosite.directive('alphaOnly', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).on('keydown', function (event) {
                var key = event.which || event.keyCode;

                if (!event.altKey && !event.ctrlKey &&
                    // a-z
                    key >= 65 && key <= 90 ||
                    // Backspace, Tab, Enter, Space
                    key == 8 || key == 9 || key == 13 || key == 32 ||
                    // Home and End
                    key == 35 || key == 36 ||
                    // left and right arrows
                    key == 37 || key == 39 ||
                    // Del and Ins
                    key == 46 || key == 45 ||
                    // single quote, dash
                    key == 222 || key == 189)
                    return true;

                return false;
            });
        }
    }
});

autosite.directive('focus', function($timeout) {
	return {
		scope : {
			trigger : '@focus'
		},
		link : function(scope, element) {
			scope.$watch('trigger', function(value) {
				if (value === "true") {
					$timeout(function() {
						element[0].focus();
					});
				}
			});
		}
	};
}); 

autosite.filter('switch', function () {
    return function (input, map) {
        return map[input] || '';
    };
});
