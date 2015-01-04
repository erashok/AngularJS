angular.module('vehicle_details.service', ['collection.adaptor']).
    service('VehicleDetailsService', function ($resource, CollectionAdaptor, Storage) {
        return $resource(
            '/api/session/:sessionId/auto/:autoProductId/vehicle/:vehicleId/vehicle_details', null, {
                get: {
                    method: 'GET',
                    transformResponse: function(data) {
                        return CollectionAdaptor.transform(angular.fromJson(data));
                    },
                    params: {
                        sessionId: Storage.getSessionId,
                        autoProductId: Storage.getAutoProductId
                    }
                },
                post: {
                    method: 'POST',
                    transformResponse: function(data) {
                        return CollectionAdaptor.transform(angular.fromJson(data));
                    },
                    params: {
                        sessionId: Storage.getSessionId,
                        autoProductId: Storage.getAutoProductId
                    }
                }
            }
        );
    });

