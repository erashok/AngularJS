angular.module('address.service', ['collection.adaptor']).
    service('AddressService', function ($resource, CollectionAdaptor, Storage) {
        return $resource(
            '/api/session/:sessionId/auto/address/:addressType', null, {
                get_residence: {
                    method: 'GET',
                    transformResponse: function(data) {
                        return CollectionAdaptor.transform(angular.fromJson(data));
                    },
                    params: {
                        sessionId: Storage.getSessionId,
                        addressType: 'residence'
                    }
                },
                put_residence: {
                    method: 'PUT',
                    transformResponse: function(data) {
                        return CollectionAdaptor.transform(angular.fromJson(data));
                    },
                    params: {
                        sessionId: Storage.getSessionId,
                        addressType: 'residence'
                    }
                }
            }
        );
    });
