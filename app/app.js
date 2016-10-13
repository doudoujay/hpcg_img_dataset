'use strict';

// Declare app level module which depends on views, and components
var app = angular.module("hpcg_img_dataset", ['ngAreas', 'ngRoute', 'ngCookies','angular-loading-bar', 'ngAnimate']).run(function () {

});

app.controller('main', function ($scope,$cookieStore,$location,imageData) {
    $scope.logout = function () {
        $cookieStore.remove("id");
        $location.path('/login').replace()
    }
    imageData.getImages()


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

var backendUrl = {
    url:"http://localhost:5000/",
    img: "http://localhost:5000/static/data/img/",
    imgData: "http://localhost:5000/static/data/imgData/"
}