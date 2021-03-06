'use strict';

// Declare app level module which depends on views, and components
var app = angular.module("hpcg_img_dataset", ['ngAreas', 'ngRoute', 'ngCookies','angular-loading-bar', 'ngAnimate','angular-spinkit','cp.ng.fix-image-orientation','cfp.hotkeys','ngSanitize','btford.markdown','ngTouch','ui.bootstrap','ngDialog']).run(function () {

});

app.controller('main', function ($scope,$cookieStore,$location,imageData) {
    $scope.logout = function () {
        $cookieStore.remove("id");
        $location.path('/login').replace()
    }
    $scope.refresh =function () {
        imageData.getImagesNoCached()
        imageData.getBatchNoChached()
    }
    imageData.getImages()


});

//routing setup
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/views/guideline/guideline.html",
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
        .when("/quikCategory", {
            templateUrl: "/views/quikCategory/quikCategory.html",
            resolve: {factory: checkRouting}
        })
        .when("/guideline", {
            templateUrl: "/views/guideline/guideline.html",
            resolve: {factory: checkRouting}
        })
        .when("/profile", {
            templateUrl: "/views/profile/profile.html",
            resolve: {factory: checkRouting}
        })
        .otherwise({
            templateUrl: "/views/guideline/guideline.html",
            resolve: {factory: checkRouting}
        });
});

app.filter('percentage', ['$filter', function ($filter) {
    return function (input, decimals) {
        return $filter('number')(input * 100, decimals) + '%';
    };
}]);

// //Image loader
// app.directive('imageonload', function() {
//     return {
//         restrict: 'A',
//
//         link: function(scope, element) {
//             element.on('load', function() {
//                 // Set visibility: true + remove spinner overlay
//                 $('#image').hide()
//                 $('#imgloader').show()
//             });
//             scope.$watch('ngSrc', function() {
//                 // Set visibility: false + inject temporary spinner overlay
//                 $('#imgloader').hide()
//                 $('#image').show()
//                 // element.parent().append('<span class="spinner"></span>');
//             });
//         }
//     };
// });

var checkRouting = function ($q, $rootScope, $location, id) {
    if (id.isLogin()) {

    } else {
        $location.path("/login");
    }
};

var backendUrl = {
    testurl:"localhost:5000/",
    url:"http://hpcg.doudoujay.com:5000/",
    img: "http://hpcg.doudoujay.com:5000/static/data/img/",
    imgData: "http://hpcg.doudoujay.com:5000/static/data/imgData/"
}
var annotatorType = ['objectAnnotator','imageAnnotator']