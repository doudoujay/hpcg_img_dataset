/**
 * Created by jay on 2016/11/2.
 */
app.controller('quikCategory', function ($scope, imageData, $rootScope, $cookieStore) {
    $scope.id = $cookieStore.get('id')
    imageData.getImages()
    imageData.getUserCurrentBatch($scope.id,annotatorType[1])
    imageData.getBatchImageUrl()




    $scope.goBack = function () {

        var callback = function () {
            if ($rootScope.imageId == 0) {
                alert("No More Image")
            } else {
                $rootScope.imageId = $rootScope.imageId - 1
                $cookieStore.put('imageId', $rootScope.imageId - 1)
                imageData.getImageUrl()


            }
        }

        callback()

    }

    $scope.goNext = function () {
        var callback = function () {
            if ($rootScope.imageId == $rootScope.batch['files'].length - 1) {
                alert("No More Image")
            } else {
                $rootScope.imageId = $rootScope.imageId + 1
                $cookieStore.put('imageId', $rootScope.imageId + 1)

                imageData.getImageUrl()


            }
        }
        callback()
    }

    $scope.yes = function () {
        if ($rootScope.category) {
            var callback = function () {
                if ($rootScope.imageId == $rootScope.images.length - 1) {
                    alert("No More Image")
                } else {
                    $rootScope.imageId = $rootScope.imageId + 1
                    $cookieStore.put('imageId', $rootScope.imageId + 1)

                    imageData.getImageUrl()


                }
            }
            var imageName = $scope.images[$scope.imageId]
            var result = {}
            result[$rootScope.category] = true
            imageData.submitQuikCategoryData(result, imageName, callback)
        }
        else {
            alert('Please select the category')
        }


    }
    $scope.no = function () {
        if ($rootScope.category) {
            var callback = function () {
                if ($rootScope.imageId == $rootScope.images.length - 1) {
                    alert("No More Image")
                } else {
                    $rootScope.imageId = $rootScope.imageId + 1
                    $cookieStore.put('imageId', $rootScope.imageId + 1)

                    imageData.getImageUrl()


                }
            }
            callback()
            var imageName = $scope.images[$scope.imageId]
            var result = {}
            result[$rootScope.category] = false
            imageData.submitQuikCategoryData(result, imageName, callback)
        }
        else{
            alert('Please select the category')
        }
    }

});
