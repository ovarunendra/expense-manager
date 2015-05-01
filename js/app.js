// create a module to make it easier to include in the app module
angular.module('rcForm', [])
    .directive(rcSubmitDirective);

// define module for app
var app = angular.module('expenseApp', ['rcForm', 'ui.bootstrap', 'ui.utils']);

//overriding the default bootstrap show weeks options
app.config(["datepickerConfig", function (datepickerConfig) {
    datepickerConfig.showWeeks = false;
}]);