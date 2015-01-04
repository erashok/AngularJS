angular.module('vin_lookup.service', []).
    service('VinLookupService', function ($resource) {
        return $resource(
            '/api/vin_lookup', null, {
                get: {
                    method: 'GET'
                }
            }
        );
    });