/* global app */

angular.module(app).directive('pleaseWait',
        function ($parse) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    message: '@message'
                },
                link: function (scope, element, attrs) {
                    scope.$on('app-start-loading', function () {
                        element.fadeIn();
                    });
                    scope.$on('app-finish-loading', function () {
                        element.animate({
                            top: "+=15px",
                            opacity: "0"
                        }, 500);
                    });
                },
                template: '<div class="cssPleaseWait"><span>{{ message }}</span></div>'
            };
        });