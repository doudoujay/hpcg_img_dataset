/**
 * Created by jay on 2016/9/30.
 */
app.controller('area-selector', function ($scope, imageData, saveToPc, $rootScope, $route, $window, $cookieStore) {


    $scope.fields900 = [];
    imageData.getImages()


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

    imageData.getImageData($rootScope.images[$rootScope.imageId])

    $scope.$on('angular-spinkit:imageLoaded', function () {
        $('#imgloader').remove()
    });


    var getImageUrl = function () {
        var displayImg = function (url) {
            $scope.imageUrl = url
        }

        if ($rootScope.images) {
            var imageUrl = backendUrl.img + $rootScope.images[$rootScope.imageId]
            var options= {canvas:true}
            console.log(imageUrl)
            displayImg(imageUrl)
            EXIF.getData(imageUrl, function () {
                var allMetaData = EXIF.getAllTags(this);
                console.log(allMetaData.orientation)
            });



        } else {

            console.log('no data')

        }

    }
    getImageUrl()
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
        var callback = function () {
            if ($rootScope.imageId == 0) {
                alert("No More Image")
            } else {

                $cookieStore.put('imageId', $rootScope.imageId - 1)
                $window.location.reload();


            }
        }

        imageData.submitImageData($scope.log900, $scope.images[$scope.imageId], callback)

    }
    $scope.goNext = function () {
        var callback = function () {
            if ($rootScope.imageId == $rootScope.images.length - 1) {
                alert("No More Image")
            } else {


                $cookieStore.put('imageId', $rootScope.imageId + 1)
                $window.location.reload();


            }
        }
        imageData.submitImageData($scope.log900, $scope.images[$scope.imageId], callback)


    }
    $scope.quit = function (areas) {
        imageData.submitImageData($scope.log900, $scope.images[$scope.imageId])
        console.log("quit")

    }

});
