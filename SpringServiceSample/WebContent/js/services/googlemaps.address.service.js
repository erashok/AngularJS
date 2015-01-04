/**
 * Created by dpentka on 3/4/14.
 */
angular.module('googlemaps.address.service', ['url.constants']).
    service('GoogleMapsAddressService', function($http, UrlConstants) {

        // Retrieve Address Data from Google Maps
        // (Param) typedValue = keyed information to search on
        // (Param) responseLimit = number of objects returned from the service
        // (Return) Promise Response Array Object ["1028 Morgan Highway, Clarks Summit, PA 18708, USA",...]
        this.getLocation = function(typedValue, responseLimit) {
            return $http.get(UrlConstants.GoogleMapsAddressService, {
                params: {
                    address: typedValue,
                    components: 'country:US',
                    sensor: false
                }
            }).then(
                function(response) {
                    var addresses = [];
                    angular.forEach(response.data.results, function(item) {
                        if (addresses.length < responseLimit) {
                            addresses.push(item.formatted_address);
                            console.log(item.formatted_address);
                        }
                    });
                    return addresses;
                }
            );
        }

        this.getLocationPromise = function(typedValue) {
            return $http.get(UrlConstants.GoogleMapsAddressService, {
                params: {
                    address: typedValue,
                    components: 'country:US',
                    sensor: false
                }
            });
        }
    });
