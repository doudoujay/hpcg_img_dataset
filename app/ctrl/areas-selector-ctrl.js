/**
 * Created by jay on 2016/9/30.
 */
app.controller('area-selector', function ($scope, imageData,saveToPc) {
    // $http.get('data-api.json').success(function(response) {
    // $scope.fields = response.data;
    var testData = [];

    $scope.fields900 = testData.slice(0);


    $scope.onAddArea = function (ev, boxId, areas, area) {
        console.log(areas);
        $scope.log900 = JSON.stringify(areas);
        $scope.$apply();
        saveToPc.saveToPc(areas, "test.json")
    }


    $scope.onChangeAreas = function (ev, boxId, areas, area) {
        console.log(areas);
        $scope.log900 = JSON.stringify(areas);
        $scope.$apply();
    }
    $scope.onRemoveArea = function (ev, boxId, areas, area) {
        console.log("removed");
        $scope.log900 = JSON.stringify(areas);
        $scope.$apply();
    }


    //Buttons
    $scope.goBack = function () {
        console.log("back")
    }
    $scope.goNext = function () {
        console.log("next")
    }
    $scope.quit = function (areas) {
        console.log("quit")
    }

});
