/*
 * Angular Fixed Table Header
 * https://github.com/daniel-nagy/fixed-table-header
 * @license MIT
 * v0.2.1
 */
(function (angular) {
    'use strict';
    angular.module('fixed.table.header', []).directive('fixHead', fixHead);

    function fixHead($compile, $window) {
//        console.log('Printing...');
        function compile(tElement) {
            var table = {
                clone: tElement.parent().clone().empty(),
                original: tElement.parent()
            };

            var header = {
                clone: tElement.clone(),
                original: tElement
            };

            function getBrowser() {
                var userAgent = $window.navigator.userAgent;
                var browsers = {chrome: /chrome/i, safari: /safari/i, firefox: /firefox/i, ie: /Trident/i};
                for (var key in browsers) {
                    if (browsers[key].test(userAgent)) {
                        return key;
                    }
                }
                return 'unknown';
            }

            var browser = getBrowser();
            // prevent recursive compilation
            header.clone.removeAttr('fix-head').removeAttr('ng-if');

            table.clone.css({display: 'block', overflow: 'hidden'}).addClass('clone');
            header.clone.css('display', 'block');
            header.original.css('visibility', 'hidden');

            return{
                pre: function (scope) {
                    //var totalColumn = header.clone.find('th').length;
                    //console.log(header.original.prop('clientWidth'));
                },
                post: function (scope) {
                    var scrollContainer = table.original.parent();

                    // insert the element so when it is compiled it will link
                    // with the correct scope and controllers
                    header.original.after(header.clone);

                    $compile(table.clone)(scope);
                    $compile(header.clone)(scope);

                    scrollContainer.parent()[0].insertBefore(table.clone.append(header.clone)[0], scrollContainer[0]);

                    scrollContainer.on('scroll', function () {
                        // use CSS transforms to move the cloned header when the table is scrolled horizontally
                        header.clone.css('transform', 'translate3d(' + -(scrollContainer.prop('scrollLeft')) + 'px, 0, 0)');
                    });

                    function cells() {
                        return header.clone.find('th').length;
                    }

                    function getCells(node) {
                        return Array.prototype.map.call(node.find('th'), function (cell) {
                            return jQLite(cell);
                        });
                    }

                    function height() {
                        return header.original.prop('clientHeight');
                    }

                    function jQLite(node) {
                        return angular.element(node);
                    }

                    function marginTop(height) {
                        table.original.css('marginTop', '-' + height + 'px');
                    }

                    function updateCells() {
                        var cells = {
                            clone: getCells(header.clone),
                            original: getCells(header.original)
                        };

                        cells.clone.forEach(function (clone, index) {
                            if (clone.data('isClone')) {
                                return;
                            }
                            // prevent duplicating watch listeners
                            clone.data('isClone', true);

                            var cell = cells.original[index];
                            var style = $window.getComputedStyle(cell[0]);

                            var getWidth = function () {
                                //console.log(style.width + " Index: " + index);
                                return style.width;
                            };

                            var setWidth = function () {
                                marginTop(height());
                                if (browser === 'ie') {
                                    var ww = parseFloat(style.borderLeftWidth.replace('px', '')) +
                                            parseFloat(style.borderRightWidth.replace('px', '')) +
                                            parseFloat(style.paddingLeft.replace('px', '')) +
                                            parseFloat(style.paddingRight.replace('px', '')) +
                                            parseFloat(style.width.replace('px', ''));
                                    clone.css({minWidth: ww, maxWidth: ww});
                                } else {
                                    clone.css({minWidth: style.width, maxWidth: style.width});
                                }
                            };

                            var listener = scope.$watch(getWidth, setWidth);

                            $window.addEventListener('resize', setWidth);

                            clone.on('$destroy', function () {
                                listener();
                                $window.removeEventListener('resize', setWidth);
                            });

                            cell.on('$destroy', function () {
                                clone.remove();
                            });
                        });
                    }

                    scope.$watch(cells, updateCells);

                    header.original.on('$destroy', function () {
                        header.clone.remove();
                    });
                }
            };
        }

        return {
            compile: compile
        };
    }

    fixHead.$inject = ['$compile', '$window'];

})(angular);