angular.module('session.service', ['collection.adaptor']).
    service('SessionService', function ($resource, CollectionAdaptor, Storage) {
        return $resource(
            '/api/session/:sessionId', null, {
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
                    isAnonymous: true
                },
                del: {
                    method: 'DELETE',
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

