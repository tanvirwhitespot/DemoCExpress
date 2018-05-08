angular.module('app').service('Template', function () {

    this.getPaymentTmpl = function () {
        return '<p class="page-bar text-center" id="PAYMENT_201804161006">{{pageHeader}}</p>' +
                '<div ng-show="loading" class="row">' +
                '<p class="msg-paragraph-emb text-center">Loading...</p>' +
                '</div>' +
                '<div ng-include="\'pages/app/reload-message.html\'"></div>' +
                '<div ng-show ="!loading" class="row text-center">' +
                '<button class="btn btn-default" type="button" ng-click="generateReport()">Generate Report</button>' +
                '</div>' +
                '<div ng-show ="!loading" class="input-form">' +
                '<div class="row gutter-05">' +
                '<div class="fixed-head-table-frame">' +
                '<div class="fixed-head" style="max-height: 60vh">' +
                '<table class="fixed-head-columns table-hover">' +
                '<thead fix-head>' +
                '<tr>' +
                '<th>PARTICULAR</th>' +
                '<th ng-if="!isClientEnable">CLIENT NAME</th>' +
                '<th>CHARGE PAID</th>' +
                '<th>TX DATE TIME</th>' +
                '<th>DESCRIPTION</th>' +
                '<th>PAYMENT</th>' +
                '<th>SERVICE CHARGE</th>' +
                '<th>COD</th>' +
                '<th>ADJUSTMENT</th>' +
                '<th>BALANCE</th>' +
                '<th>REMARK</th>' +
                '<th>TX USER</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr ng-repeat="record in transaction">' +
                '<td ng-click="addForPayment(record)" style="cursor: pointer">{{record.PARTICULAR}}</td>' +
                '<td ng-if="!isClientEnable">{{record.CLIENT_NAME}}</td>' +
                '<td>{{record.SC_PAID}}</td>' +
                '<td>{{record.T_DATE}}</td>' +
                '<td>{{record.DESCRIPTION}}</td>' +
                '<td>{{record.PAYMENT | number : 2}}</td>' +
                '<td>{{record.SC | number : 2}}</td>' +
                '<td>{{record.COD | number : 2}}</td>' +
                '<td>{{record.ADJUSTMENT | number : 2}}</td>' +
                '<td class="btn-info" style="text-align: right">{{record.BALANCE | number : 2}}</td>' +
                '<td>{{record.REMARK}}</td>' +
                '<td>{{record.USER_NAME}}</td>' +
                '</tr>' +
                '</tbody>' +
                '</table>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
    };

    this.getLink = function () {
        return 'pages/app/payment.html';
    };
});