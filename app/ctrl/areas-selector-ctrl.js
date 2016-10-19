/**
 * Created by jay on 2016/9/30.
 */
app.controller('area-selector', function ($scope, imageData, saveToPc, $rootScope, $route,$window,$cookieStore) {


    $scope.fields900 = [];


    $scope.$watch(function () {
        return $rootScope.fields900;
    }, function () {
        $scope.fields900 = $rootScope.fields900;
    }, true);

    imageData.getImageData($rootScope.images[$rootScope.imageId])


    $rootScope.getImageUrl = function () {

        if ($rootScope.images) {
            return backendUrl.img + $rootScope.images[$rootScope.imageId]
        } else {

            console.log('no data')

        }

    }
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
    $scope.goBack = function () {
        imageData.submitImageData($scope.log900, $scope.images[$scope.imageId])
        if ($rootScope.imageId == 0) {
            alert("No More Image")
        } else {

            $cookieStore.put('imageId',$rootScope.imageId - 1)
            $window.location.reload();


        }


    }
    $scope.goNext = function () {
        imageData.submitImageData($scope.log900, $scope.images[$scope.imageId])
        if ($rootScope.imageId == $rootScope.images.length - 1) {
            alert("No More Image")
        } else {


            $cookieStore.put('imageId',$rootScope.imageId + 1)
            $window.location.reload();



        }

    }
    $scope.quit = function (areas) {
        imageData.submitImageData($scope.log900, $scope.images[$scope.imageId])
        console.log("quit")

    }

});
