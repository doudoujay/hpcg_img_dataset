/**
 * Created by jay on 2016/9/30.
 */
app.service('imageData', function ($http, $cookieStore, $rootScope, $http,$timeout,$cookieStore) {
    if ($cookieStore.get('imageId')){
        $rootScope.imageId = $cookieStore.get('imageId')
    }else {
        $cookieStore.put('imageId',0)
        $rootScope.imageId = 0
    }

    this.getImageCategories = function () {
        return [
            "Face", "Cat", "Car", "Boy"
        ]
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
                alert("Can not fetch Image Data")
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

    }
    this.getImageData = function (imageDataName) {

        var req = {
            method: 'GET',
            url: backendUrl.url+'imageData/'+imageDataName,
        }

        $http(req)
            .then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $rootScope.fields900 = response.data
                console.error('new fields 900')
                console.log($rootScope.fields900)



            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    }

})
