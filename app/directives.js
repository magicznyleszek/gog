// simple import directives
gogApp.directive('slider', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/modules/slider.html'
    };
});
gogApp.directive('slideshow', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/modules/slideshow.html'
    };
});
gogApp.directive('digitalCounter', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/modules/digital-counter.html'
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

// for game logos am- attribute
gogApp.directive('ngAmGameLogo', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            // declarations
            var attrName = 'am-game-logo';
            // // parse attribute for function
            // var expressionHandler = $parse(attr.ngAmGameLogo);
            // // observe attr change and set expressionHandler-ed attribute if value exist
            // attr.$observe('ngAmGameLogo', function (value) {
            //     if (value) { attr.$set(attrName, expressionHandler(scope, value)); }
            // });
            attr.$observe('ngAmGameLogo', function (value) {
                if (value) { attr.$set(attrName, value); }
            });
        }
    };
});
