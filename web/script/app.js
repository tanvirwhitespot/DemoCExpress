var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngStorage', 'anguFixedHeaderTable',
    'oitozero.ngSweetAlert', 'cfp.hotkeys', 'fixed.table.header', 'ngCookies']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");
        $stateProvider
                .state('login', {url: "/login", templateUrl: "pages/auth/login.html", controller: 'LoginCtrl'})
                ;
    }]);
