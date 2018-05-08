//angular.module('app').factory('TFactory', ['$http', function ($http) {
//        return {
//            getData: function (callback) {
//                $http.get('PingServer').then(function (response) {
//                    callback(response.data.toString());
//                });
//            }
//        };
//    }]);

angular.module('app').factory('TFactory', TFactory);
TFactory.$inject = ['$http', '$cookies', '$rootScope', '$timeout'];

function TFactory($http) {
    var service = {};
    service.Login = Login;
    service.ServerMessage = ServerMessage;

    function Login(username, password, callback) {
        $http.post('/api/authenticate', {username: username, password: password})
                .success(function (response) {
                    callback(response);
                });
    }

    function ServerMessage(callback) {
        $http.get('PingServer').then(function (response) {
            callback(response.data.toString());
        });
    }

    return service;
}