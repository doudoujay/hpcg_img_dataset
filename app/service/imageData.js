/**
 * Created by jay on 2016/9/30.
 */
app.service('imageData', function ($http, $cookieStore, $rootScope, $http, $timeout, $cookieStore) {
    if ($cookieStore.get('imageId')) {
        $rootScope.imageId = $cookieStore.get('imageId')
    } else {
        $cookieStore.put('imageId', 0)
        $rootScope.imageId = 0
    }

    this.getImageCategories = function () {
        return [
            "Face", "Cat", "Car", "Boy"
        ]
    }


    this.getImages = function () {

        if ($cookieStore.get('images')) {
            $rootScope.images = $cookieStore.get('images')
        } else {
            $http.get(backendUrl.url + "images")
                .then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $cookieStore.put('images', response.data)
                    $rootScope.images = $cookieStore.get('images')

                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    alert("Can not fetch Image Data")
                });

        }


    }
    this.getImagesNoCached = function () {


        $http.get(backendUrl.url + "images")
            .then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $cookieStore.put('images', response.data)
                $rootScope.images = $cookieStore.get('images')

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert("Can not fetch Image Data")
            });


    }
    this.submitImageData = function (imageData, imageDataName,callback) {

        var req = {
            method: 'PUT',
            url: backendUrl.url + 'imageData/' + imageDataName,
            data: imageData
        }
        $http(req)
            .then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                callback()
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    }
    this.getImageData = function (imageDataName) {

        var req = {
            method: 'GET',
            url: backendUrl.url + 'imageData/' + imageDataName,
        }

        $http(req)
            .then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $rootScope.fields900 = response.data
                console.log($rootScope.fields900)


            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

    }

    this.getImageUrl = function () {
        var displayImg = function (url) {
            $rootScope.imageUrl = url
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

})
