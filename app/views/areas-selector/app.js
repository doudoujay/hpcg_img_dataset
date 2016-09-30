'use strict';

// Declare app level module which depends on views, and components
var hpcg_img_dataset = angular.module("hpcg_img_dataset", ['ngAreas']).run(function() {
});



hpcg_img_dataset.controller('DemoController', function($scope
                                                            // ,$http
) {
  // $http.get('data-api.json').success(function(response) {
  // $scope.fields = response.data;
  var testData = [];

  $scope.fields900 = testData.slice(0);


  $scope.onAddArea = function(ev, boxId, areas, area) {
    console.log("area added");
    $scope.log900 = JSON.stringify(areas);
    $scope.$apply();
  }


  $scope.onChangeAreas900 = function(ev, boxId, areas, area) {
    console.log(areas);
    $scope.log900 = JSON.stringify(areas);
    $scope.$apply();
  }

  $scope.onChangeAreas600 = function(ev, boxId, areas, area) {
    $scope.log600 = JSON.stringify(areas);
    $scope.$apply();
  }

  // });
});
