// bundle service
gogApp.service('Bundle', ['$http', '$q', function ($http, $q) {
    // declarations
    var myData = {};

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

    var promise = $q.all([promiseGames, promiseGoodies, promiseUnlockables]).then(function (result) { return result; });

    // return object
    return {
        promise: promise,
        getGames: function () {
            return myData.games;
        },
        getGoodies: function () {
            return myData.goodies;
        },
        getUnlockables: function () {
            return myData.unlockables;
        }
    };
}]);