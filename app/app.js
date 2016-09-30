'use strict';

// Declare app level module which depends on views, and components
var app = angular.module("hpcg_img_dataset", ['ngAreas', 'ngRoute', 'ngCookies']).run(function () {

});

//routing setup
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {

        })
        .when("/area-selector", {
            templateUrl: "/views/areas-selector/areas-selector.html"
        })
        .when("/login", {
            templateUrl: "/views/login/login.html"
        })
        .when("/dashboard", {
            templateUrl: "/views/dashboard/dashboard.html"
        })
        .otherwise({
            templateUrl: "/views/dashboard/dashboard.html"
        });
});

