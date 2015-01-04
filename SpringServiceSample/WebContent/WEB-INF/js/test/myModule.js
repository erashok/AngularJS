var myAppModule = angular.module('myApp', [ auto_site ]);
myAppModule.service(
		'AlertService', function($resource, auto) {

			alert("ashok yadav");

		});
myAppModule.directive('myPlanet', ['planetName', function myPlanetDirectiveFactory(planetName) {
	  // directive definition object
	  return {
	    restrict: 'E',
	    scope: {},
	    link: function($scope, $element) { $element.text('Planet: ' + planetName); }
	  };
	}]);