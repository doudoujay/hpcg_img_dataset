/**
 * Created by jay on 2016/9/30.
 */
app.controller('area-selector', function ($scope, imageData, saveToPc, $rootScope, $route, $window, $cookieStore) {


    $scope.fields900 = [];
    imageData.getImages()
    imageData.getImageData($rootScope.images[$rootScope.imageId])


    $scope.$watch(function () {
        return $rootScope.fields900;
    }, function () {
        $scope.fields900 = $rootScope.fields900;
    }, true);

    // $scope.$watch(function () {
    //     return $scope.imageUrl;
    // }, function () {
    //     $scope.imageUrl = $scope.imageUrl;
    // }, true);


    $scope.$on('angular-spinkit:imageLoaded', function () {
        $('#imgloader').hide()
    });


    imageData.getImageUrl()

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
        if ($rootScope.imageId == 0) {
            alert("No More Image")
        } else {

            var callback = function () {
                $cookieStore.put('imageId', $rootScope.imageId - 1)
                $window.location.reload();

            }
            imageData.submitImageData($scope.log900, $scope.images[$scope.imageId], callback)

        }


    }
    $scope.goNext = function () {
        if ($rootScope.imageId == $rootScope.images.length - 1) {
            alert("No More Image")
        } else {

            var callback = function () {
                $cookieStore.put('imageId', $rootScope.imageId + 1)
                $window.location.reload();

            }
            imageData.submitImageData($scope.log900, $scope.images[$scope.imageId], callback)


        }


    }
    $scope.quit = function (areas) {
        imageData.submitImageData($scope.log900, $scope.images[$scope.imageId])
        console.log("quit")

    }

});
