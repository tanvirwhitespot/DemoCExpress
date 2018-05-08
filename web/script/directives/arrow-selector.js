var app = angular.module('app');

app.directive('arrowSelector', ['$document', function ($document) {
        return{
            restrict: 'A',
            link: function ($scope, $elem, $attrs, $ctrl) {

                var elemFocus = false;

                $elem.on('mouseenter', function () {
                    elemFocus = true;
                    console.log('mouseenter');
                });
                $elem.on('mouseleave', function () {
                    elemFocus = false;
                    console.log('mouseleave');
                });

                $document.bind('keydown', function (e) {
                    console.log($scope.selectedRow);
                    if (elemFocus) {
                        if (e.keyCode === 38) {
                            console.log($scope.selectedRow);
                            if ($scope.selectedRow === 1) {
                                return;
                            }
                            $scope.selectedRow--;
                            $scope.$apply();
                            e.preventDefault();
                        }
                        if (e.keyCode === 40) {
                            if ($scope.selectedRow === $scope.zones.length) {
                                return;
                            }
                            $scope.selectedRow++;
                            $scope.$apply();
                            e.preventDefault();
                        }
                    }
                });
            }
        };
    }]);
