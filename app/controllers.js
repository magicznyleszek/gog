// define controllers module
var gogControllers = angular.module('gogControllers', []);

// bundle page controller
gogControllers.controller('BundleController', ['$scope', 'Bundles', function ($scope, Bundles) {
    console.warn('hello world', Bundles.getAll());
}]);