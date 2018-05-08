//https://github.com/long2know/angular-directives-general
var app = angular.module('app');
app.directive('compackTable', function () {
    return {
        scope: {
            header: '=', data: '='
        },
//        template: '<ul><li ng-repeat="prop in data">{{ prop }}</li></ul>'
        template: '<table class="table table-bordered center-align-column" fixed-header table-height="118px">' +
                '<thead>' +
                '<tr>' +
                '<th ng-repeat="head in header">{{head.NAME}}</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr ng-repeat="zone in data track by $index">' +
//                '<td ng-repeat="v in zone">{{v}}</td>' +

                '<td ng-repeat="head in header track by $index"> {{zone.{{head}}}} </td>' +

//                '<td class="min-width-30">{{$index + 1}}</td>' +
//                '<td class="min-width-30">{{zone.ID}}</td>' +
//                '<td class="min-width-45">{{zone.NAME}}</td>' +
//                '<td class="min-width-70">{{zone.DESCRIP}}</td>' +
//                '<td class="min-width-45">{{zone.STATUS}}</td>' +
//                '<td>{{zone.CREATE_INFO}}</td>' +
//                '<td>{{zone.UPDATE_INFO}}</td>' +

                '</tr>' +
                '</tbody>' +
                '</table>'
    };
});
