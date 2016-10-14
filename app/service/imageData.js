/**
 * Created by jay on 2016/9/30.
 */
app.service('imageData', function ($http, $cookieStore, $rootScope, $http) {
    $rootScope.imageId = 0
    this.getImageCategories = function () {
        return [
            "Face", "Cat", "Car", "Boy"
        ]
    }

    $rootScope.getImageUrl =function () {
        return backendUrl.img + $rootScope.images[$rootScope.imageId]
    }
    this.getImages = function () {
        $http.get(backendUrl.url + "images")
            .then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available

                $rootScope.images = response.data


            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('error')
            });

    }
    this.submitImageData = function (imageData,imageDataName) {
        var req = {
            method: 'PUT',
            url: backendUrl.url+'imageData/'+imageDataName,
            data: imageData
        }
        $http(req)
            .then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        console.log("Image Data Submitted")
    }
})
