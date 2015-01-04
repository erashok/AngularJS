angular.module('auto_product.service', ['collection.adaptor']).
    service('AutoProductService', function ($resource, CollectionAdaptor, Storage) {
        return $resource(
            '/api/session/:sessionId/auto', null, {
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
                },
                put: {
                	method: 'PUT',
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