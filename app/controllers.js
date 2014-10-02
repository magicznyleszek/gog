// define controllers module
var gogControllers = angular.module('gogControllers', []);

// bundle page controller
gogControllers.controller('BundleController', ['$scope', 'Bundle', function ($scope, Bundle) {

    // define useful bundle object
    $scope.bundle = {};

    // get data from services
    $scope.bundle.options = Bundle.getOptions();
    $scope.bundle.breakpoints = Bundle.getBreakpoints();
    $scope.bundle.games = Bundle.getGames();
    $scope.bundle.goodies = Bundle.getGoodies();
    $scope.bundle.unlockables = Bundle.getUnlockables();
    $scope.bundle.slider = Bundle.getSlider();

    console.info($scope.bundle);

    // checks if given game is available
    $scope.checkGamesAvailability = function () {
        // declarations
        var a;
        // loop through all games
        for (a = 0; a < $scope.bundle.games.length; a += 1) {
            // loop through all breakpoints
            $scope.bundle.breakpoints.forEach(function (breakpoint) {
                // check if same breakpoint as defined for given game
                if ($scope.bundle.games[a].breakpoint === breakpoint.slug) {
                    // check if slider value over breakpoint value
                    if ($scope.bundle.slider.value >= breakpoint.value) {
                        $scope.bundle.games[a].available = true;
                    } else {
                        $scope.bundle.games[a].available = false;
                    }
                    //
                    $scope.bundle.games[a].logoState = $scope.getGameLogoState($scope.bundle.games[a].slug);
                }
            });
        }
    };

    // for am-game-logo styles
    $scope.getGameLogoState = function (slug) {
        // declarations
        var state = '';
        // loop through all games
        $scope.bundle.games.forEach(function (game) {
            // check if the game we are looking for
            if (game.slug === slug) {
                // check availability and if current price deserves gold
                if (game.available && $scope.doDeservesGold(game.slug)) {
                    state = '-gold';
                } else if (game.available) {
                    state = '-silver';
                }
                console.log(slug, state, $scope.doDeservesGold(slug));
            }
        });
        return state;
    };

    // checks if given game deserves gold logo
    $scope.doDeservesGold = function (slug) {
        // declarations
        var deserves = false;
        // loop through all games
        $scope.bundle.games.forEach(function (game) {
            // check if the game we are looking for
            if (game.slug === slug) {
                // loop through all breakpoints
                $scope.bundle.breakpoints.forEach(function (breakpoint) {
                    // check if same breakpoint as defined for given game
                    if (game.breakpoint === breakpoint.slug) {
                        // check if slider value over breakpoint value
                        if ($scope.bundle.slider.value > breakpoint.value) {
                            deserves = true;
                        }
                    }
                });
            }
        });
        return deserves;
    };

    // initialize app
    $scope.checkGamesAvailability();

}]);
