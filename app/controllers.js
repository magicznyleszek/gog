// define controllers module
var gogControllers = angular.module('gogControllers', []);

// bundle page controller
gogControllers.controller('BundleController', ['$scope', 'Bundle', function ($scope, Bundle) {

    // define useful bundle object
    $scope.bundle = {};
    $scope.bundle.salesDigits = [];

    // get data from services
    $scope.bundle.options = Bundle.getOptions();
    $scope.bundle.breakpoints = Bundle.getBreakpoints();
    $scope.bundle.games = Bundle.getGames();
    $scope.bundle.goodies = Bundle.getGoodies();
    $scope.bundle.unlockables = Bundle.getUnlockables();
    $scope.bundle.sales = Bundle.getSales();
    $scope.bundle.slider = Bundle.getSlider();

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
            }
        });
        return state;
    };

    // returns breakpoint value if breakpoint is visible
    $scope.getAvailabilityBreakpointValue = function (slug, prefix, suffix) {
        // declarations
        var value = '';
        // loop through all breakpoints
        $scope.bundle.breakpoints.forEach(function (breakpoint) {
            // check if the breakpoint we are looking for
            if (breakpoint.slug === slug) {
                // check if visible
                if (breakpoint.visible) {
                    value = String(breakpoint.value);
                    // check if prefix and or suffix given
                    if (prefix) {value = prefix + value; }
                    if (suffix) {value = value + suffix; }
                }
            }
        });
        return value;
    };

    // returns percent value of given breakpoint
    $scope.getBreakpointPercent = function (breakpoint) {
        // declarations
        var percent = 0;
        // calculate percent width
        percent = (breakpoint.value - $scope.bundle.slider.limitBottom) / ($scope.bundle.slider.limitTop - $scope.bundle.slider.limitBottom) * 100;
        percent += '%';
        return percent;
    }

    // returns progress bar percent value
    $scope.getSliderProgressPercent = function () {
        // declarations
        var percent = 0;
        // calculate percent width
        percent = ($scope.limitValue($scope.bundle.slider.value) - $scope.bundle.slider.limitBottom) / ($scope.bundle.slider.limitTop - $scope.bundle.slider.limitBottom) * 100;
        percent += '%';
        return percent;
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

    // populate sales
    $scope.buyGame = function (user) {
        // declarations
        var transaction = {
            user: user,
            games: [],
            value: $scope.limitValue($scope.bundle.slider.value)
        };
        // loop through all games
        $scope.bundle.games.forEach(function (game) {
            // add game to transaction, if available
            if (game.available) {
                transaction.games.push(game);
            }
        });
        // push transaction
        $scope.bundle.sales.push(transaction);
        // update digits
        $scope.updateSalesDigits();
        // print info
        console.info('pushed transaction', transaction);
    };

    // recalculate breakpoints value
    $scope.updateBreakpoints = function () {
        // declarations
        var a;
        // loop through all breakpoints
        for (a = 0; a < $scope.bundle.breakpoints.length; a += 1) {
            // recalculate breakpoint value
            if ($scope.bundle.breakpoints[a].slug === 'average') {
                $scope.bundle.breakpoints[a].value = $scope.getAveragePrice();
            } else if ($scope.bundle.breakpoints[a].slug === 'top') {
                $scope.bundle.breakpoints[a].value = $scope.getAveragePrice('top');
            }
        }
    };

    // returns limited number to slider limits
    $scope.limitValue = function (number) {
        // declarations
        var limitedNumber = Number(number);
        // check if within the limits
        if (limitedNumber > $scope.bundle.slider.limitTop) {
            limitedNumber = $scope.bundle.slider.limitTop;
        } else if (limitedNumber < $scope.bundle.slider.limitBottom) {
            limitedNumber = $scope.bundle.slider.limitBottom;
        }
        return limitedNumber;
    };

    // returns average number from all sales
    $scope.getAveragePrice = function (type) {
        // declarations
        var amounts = [];
        var average = 0;
        var start = 0;
        var sum = 0;
        var a;
        // loop through all sales
        $scope.bundle.sales.forEach(function (transaction) {
            amounts.push(transaction.value);
        });
        // sort amounts
        amounts.sort(function (a, b) { return a-b; });
        // check type
        if (type === 'top') {
            start = Math.round(amounts.length * 0.9);
        }
        // loop through all amounts
        for (a = start; a < amounts.length; a += 1) {
            sum += amounts[a];
        }
        // calculate average
        average = Number((sum / (amounts.length - start)).toFixed(2));
        return average;
    };

    // returns the percent of breakpoint reached
    $scope.getUnlockablePercent = function (breakpoint) {
        // declarations
        var percent;
        // check if already reached
        if ($scope.bundle.sales.length >= breakpoint) {
            percent = 100;
        } else {
            percent = Math.floor($scope.bundle.sales.length / breakpoint * 100);
        }
        percent += '%';
        return percent;
    };

    // for updating sales amount for counter
    $scope.updateSalesDigits = function () {
        $scope.bundle.salesDigits = $scope.getDigits($scope.bundle.sales.length);
    };

    // return an array of sales digits
    $scope.getDigits = function (number) {
        // declarations
        var numberArray = String(number).split('');
        var digits = [];
        var a;
        // loop through number array
        for (a = 0; a < 6; a += 1) {
            // add every digit and fill the rest with zeroes
            if (numberArray[a]) {
                digits.push({ 'value': numberArray[a] });
            } else {
                digits.unshift({ 'value': 0 });
            }
        }
        return digits;
    };

    // initialize app
    $scope.updateSalesDigits();
    $scope.updateBreakpoints();
    $scope.checkGamesAvailability();

}]);
