gogApp.directive('bundlesCounter', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/partials/bundles-counter.html',
        controller: function ($scope) {
            console.log('counter directive')
        }
    };
});