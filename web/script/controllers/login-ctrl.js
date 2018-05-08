angular.module('app').controller('LoginCtrl', function ($scope, $state) {
    $scope.busy = true;
    $scope.inputView = true;
    $scope.loginMsg = "PLEASE WAIT FOR SERVER";

    $scope.login = function () {
        $scope.busy = true;
    };

    initApp = function (res) {
    };

    $scope.signUp = function () {
        $state.go('manage-user');
    };

    $scope.backToLogin = function () {
        $state.go('login');
    };

    //'$stateChangeSuccess'
    $scope.$on('$viewContentLoaded', function () {
        $scope.busy = false;
        $scope.loginMsg = "PLEASE WAIT FOR SERVER";
    });
    
});
