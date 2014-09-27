// bundle service
gogApp.service('Bundles', ['$http', function ($http) {
    // declarations
    var myData = null;

    // get data from JSON
    var promise = $http.get('app/data/bundles.json').success(function (data) {
        myData = data;
    });

    // return object
    return {
        promise: promise,
        getAll: function () {
            return myData;
        }
    };
}]);