angular.module('vehicle.service', ['collection.adaptor']).
    service('VehicleService', function ($resource, CollectionAdaptor, Storage) {
        return $resource(
            '/api/session/:sessionId/auto/vehicle/:vehicleId', null, {
                get: {
                    method: 'GET',
                    transformResponse: function(data) {
                        return CollectionAdaptor.transform(angular.fromJson(data));
                    },
                    params: {
                        sessionId: Storage.getSessionId
                    }
                },
                post: {
                    method: 'POST',
                    transformResponse: function(data) {
                        return CollectionAdaptor.transform(angular.fromJson(data));
                    },
                    params: {
                        sessionId: Storage.getSessionId
                    }
                }
            }
        );
    });

