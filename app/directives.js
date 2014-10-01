gogApp.directive('bundlesCounter', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/partials/bundles-counter.html',
        controller: function ($scope) {
            console.log('counter directive')
        }
    };
});

// for svg icons with variables in attributes
gogApp.directive('ngXlinkHref', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            // declarations
            var attrName = 'xlink:href';
            // observe attr change and set attribute if value exist
            attr.$observe('ngXlinkHref', function (value) {
                if (value) { attr.$set(attrName, value); }
            });
        }
    };
});
