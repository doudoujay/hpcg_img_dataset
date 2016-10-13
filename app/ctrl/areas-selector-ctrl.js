/**
 * Created by jay on 2016/9/30.
 */
app.controller('area-selector', function ($scope, imageData,saveToPc,$rootScope) {
    // $http.get('data-api.json').success(function(response) {
    // $scope.fields = response.data;

    var testData = [];

    $scope.fields900 = testData.slice(0);


    $scope.onAddArea = function (ev, boxId, areas, area) {

        $scope.log900 = JSON.stringify(areas);
        $scope.$apply();

    }


    $scope.onChangeAreas = function (ev, boxId, areas, area) {

        $scope.log900 = JSON.stringify(areas);
        $scope.$apply();
    }
    $scope.onRemoveArea = function (ev, boxId, areas, area) {

        $scope.log900 = JSON.stringify(areas);
        $scope.$apply();

    }




    //Buttons
    $scope.goBack = function (areas) {
        if ($rootScope.imageId == 0){
            alert("No More Image")
        }else{
            $rootScope.imageId = $rootScope.imageId -1

        }


    }
    $scope.goNext = function (areas) {
        if ($rootScope.imageId == $rootScope.images.length-1){
            alert("No More Image")
        }else{
            $rootScope.imageId = $rootScope.imageId + 1
        //    TODO: fix the change image bug



        }

    }
    $scope.quit = function (areas) {
        console.log("quit")
    }

});
