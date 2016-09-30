'use strict';

// Declare app level module which depends on views, and components
var app = angular.module("hpcg_img_dataset", ['ngAreas', 'ngRoute', 'ngCookies']).run(function () {

});

//routing setup
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            resolve: {factory: checkRouting}
        })
        .when("/area-selector", {
            templateUrl: "/views/areas-selector/areas-selector.html",
            resolve: {factory: checkRouting}
        })
        .when("/login", {
            templateUrl: "/views/login/login.html",
            resolve: {factory: checkRouting}
        })
        .when("/dashboard", {
            templateUrl: "/views/dashboard/dashboard.html",
            resolve: {factory: checkRouting}
        })
        .otherwise({
            templateUrl: "/views/dashboard/dashboard.html",
            resolve: {factory: checkRouting}
        });
});


var checkRouting = function ($q, $rootScope, $location, id) {
    if (id.isLogin()) {

    } else {
        $location.path("/login");
    }
};
