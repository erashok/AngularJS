angular.module('driver.service', ['collection.adaptor']).
    service('DriverService', function ($resource, CollectionAdaptor, Storage) {
        return $resource(
            '/api/session/:sessionId/auto/driver/:driverId', null, {
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
