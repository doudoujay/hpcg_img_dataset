/**
 * Created by jay on 2016/11/2.
 */
app.controller('quikCategory', function ($scope,imageData,$rootScope,$cookieStore) {
    imageData.getImages()
    imageData.getImageUrl()



    $scope.goBack = function () {

        var callback = function () {
            if ($rootScope.imageId == 0) {
                alert("No More Image")
            } else {
                $rootScope.imageId =$rootScope.imageId - 1
                $cookieStore.put('imageId', $rootScope.imageId - 1)
                imageData.getImageUrl()


            }
        }

        callback()

    }

    $scope.goNext = function () {
        var callback = function () {
            if ($rootScope.imageId == $rootScope.images.length-1) {
                alert("No More Image")
            } else {
                $rootScope.imageId =$rootScope.imageId + 1
                $cookieStore.put('imageId', $rootScope.imageId + 1)

                imageData.getImageUrl()


            }
        }
        callback()
    }
});
