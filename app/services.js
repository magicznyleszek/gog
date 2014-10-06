// bundle service
gogApp.service('Bundle', ['$http', '$q', function ($http, $q) {
    // declarations
    var myData = {};

    // get data from JSON
    var promiseOptions = $http.get('app/data/bundle-options.json').success(function (data) {
        myData.options = data;
    });

    // get data from JSON
    var promiseBreakpoints = $http.get('app/data/bundle-breakpoints.json').success(function (data) {
        myData.breakpoints = data;
    });

    // get data from JSON
    var promiseGames = $http.get('app/data/bundle-games.json').success(function (data) {
        myData.games = data;
    });

    // get data from JSON
    var promiseGoodies = $http.get('app/data/bundle-goodies.json').success(function (data) {
        myData.goodies = data;
    });

    // get data from JSON
    var promiseUnlockables = $http.get('app/data/bundle-unlockables.json').success(function (data) {
        myData.unlockables = data;
    });

    // get data from JSON
    var promiseSales = $http.get('app/data/bundle-sales.json').success(function (data) {
        myData.sales = data;
    });

    // get data from JSON
    var promiseSlider = $http.get('app/data/bundle-slider.json').success(function (data) {
        myData.slider = data;
    });

    var promise = $q.all([promiseOptions, promiseBreakpoints, promiseGames, promiseGoodies, promiseUnlockables, promiseSales, promiseSlider]).then(function (result) { return result; });

    // return object
    return {
        promise: promise,
        getOptions: function () {
            return myData.options;
        },
        getBreakpoints: function () {
            return myData.breakpoints;
        },
        getGames: function () {
            return myData.games;
        },
        getGoodies: function () {
            return myData.goodies;
        },
        getUnlockables: function () {
            return myData.unlockables;
        },
        getSales: function () {
            return myData.sales;
        },
        getSlider: function () {
            return myData.slider;
        }
    };
}]);
