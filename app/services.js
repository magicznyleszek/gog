// bundle service
gogApp.service('Bundles', ['$http', function ($http) {
    // declarations
    var myData = null;

    // get data from JSON
    $http.get('app/data/bundles.json').success(function (data) {
        myData = data;
    });

    // return object
    return {
        getAll: function () {
            return myData;
        }
    };
}]);