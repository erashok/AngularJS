angular.module('auth.interceptor', ['collection.adaptor']).
    service('AuthInterceptor', function(CollectionAdaptor) {

        return {
            request: function(config) {
                // Bypass Auth for Google Maps API
                if (config.url == "http://maps.googleapis.com/maps/api/geocode/json") {
                    return config;
                }

                if (!isResourcePublic(config.url) && config.isAnonymous !== true) {
                    CollectionAdaptor.addAuthHeaders(config.method, angular.toJson(config.data), config.headers, getUrlPath(config.url));
                }
                return config;
            }
        };

        function getUrlPath(url) {
            url = url.substr(url.indexOf("://") + 3);
            return url.substr(url.indexOf("/"));
        }

        function isResourcePublic(url) {
            return url.substr(0,7) == 'public/';
        }
    });