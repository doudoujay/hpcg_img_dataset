'use strict';

// Declare app level module which depends on views, and components
var app = angular.module("hpcg_img_dataset", ['ngAreas', 'ngRoute','ngCookies']).run(function () {
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
        .when("/blue", {
            templateUrl: "blue.htm"
        });
});

app.controller('DemoController', function ($scope) {
    // $http.get('data-api.json').success(function(response) {
    // $scope.fields = response.data;
    var testData = [];

    $scope.fields900 = testData.slice(0);


    $scope.onAddArea = function (ev, boxId, areas, area) {
        console.log("area added");
        $scope.log900 = JSON.stringify(areas);
        $scope.$apply();
    }


    $scope.onChangeAreas900 = function (ev, boxId, areas, area) {
        console.log(areas);
        $scope.log900 = JSON.stringify(areas);
        $scope.$apply();
    }

    $scope.onChangeAreas600 = function (ev, boxId, areas, area) {
        $scope.log600 = JSON.stringify(areas);
        $scope.$apply();
    }

    // });
});
