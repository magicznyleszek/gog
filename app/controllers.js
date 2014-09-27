// define controllers module
var gogControllers = angular.module('gogControllers', []);

// bundle page controller
gogControllers.controller('BundleController', ['$scope', 'Bundle', function ($scope, Bundle) {
    
    $scope.bundleGames = Bundle.getGames();
    $scope.bundleGoodies = Bundle.getGoodies();
    $scope.bundleUnlockables = Bundle.getUnlockables();

    console.warn('hello world', $scope.bundleGames, $scope.bundleGoodies, $scope.bundleUnlockables);
}]);