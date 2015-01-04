angular.module('customer.service', ['collection.adaptor']).
    service('CustomerService', function ($resource, CollectionAdaptor, Storage) {
        return $resource(
            '/api/session/:sessionId/auto/:autoId/customer', null, {
                get: {
                    method: 'GET',
                    transformResponse: function (data) {
                        return CollectionAdaptor.transform(angular.fromJson(data));
                    },
                    params: {
                        sessionId: Storage.getSessionId,
                        autoId: Storage.getAutoProductId
                    }
                },
                post: {
                    method: 'POST',
                    transformResponse: function (data) {
                        return CollectionAdaptor.transform(angular.fromJson(data));
                    },
                    params: {
                        sessionId: Storage.getSessionId,
                        autoId: Storage.getAutoProductId
                    }
                },
                put: {
                    method: 'PUT',
                    transformResponse: function (data) {
                        return CollectionAdaptor.transform(angular.fromJson(data));
                    },
                    params: {
                        sessionId: Storage.getSessionId,
                        autoId: Storage.getAutoProductId
                    }
                }
            }
        );
    });