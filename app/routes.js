// define routes configuration
gogApp.config(['$routeProvider', function ($routeProvider) {
    // only one route for now
    // redirects to '/'
    $routeProvider
    .when('/', {
        templateUrl: 'app/views/bundle.html',
        controller: 'BundleController',
        resolve: {
            'BundleData': function (Bundle) {
                return Bundle.promise;
            }
        }
    })
    .otherwise({
        redirectTo: '/'
    });
}]);