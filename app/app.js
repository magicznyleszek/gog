(function () {

    // create gog app
    var gogApp = angular.module('gogApp', []);

    // bundle page controller
    gogApp.controller('BundleController', ['$scope', 'Bundles', function ($scope, Bundles) {
        console.log('hello world', Bundles.getAll());
    }]);

    // bundle service
    gogApp.service('Bundles', ['$http', function ($http) {
        // declarations
        var myData = null;

        // get data from JSON
        $http.get('app/data/bundles.json').success(function (data) {
            myData = data;
        });

        // declare stuff ugly way to avoid Cross origin request error
        myData = [
            {
                "slug": "Test 1",
                "sth": "1"
            },
            {
                "slug": "Test 2",
                "sth": "2"
            }
        ];

        // return object
        return {
            getAll: function () {
                return myData;
            }
        };
    }]);
      
})();


