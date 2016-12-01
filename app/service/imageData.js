/**
 * Created by jay on 2016/9/30.
 */
app.service('imageData', function ($http, $cookieStore, $rootScope, $http, $timeout, $cookieStore,$location) {
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
    
    

    this.submitImageData = function (imageData, imageDataName, callback) {

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
    this.submitQuikCategoryData = function (imageData, imageDataName, callback) {
        var req = {
            method: 'PUT',
            url: backendUrl.url + 'imageQuikCategory/' + imageDataName,
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
            var options = {canvas: true}
            displayImg(imageUrl)
            EXIF.getData(imageUrl, function () {
                var allMetaData = EXIF.getAllTags(this);
                console.log(allMetaData.orientation)
            });


        } else {

            console.log('no data')

        }

    }
    this.getUserCurrentBatch = function (userid, type) {
        if ($cookieStore.get('batch')) {
            $rootScope.batch = $cookieStore.get('batch')
        } else {
            $http.get(backendUrl.url + "batch/userCurrentBatch", {
                headers: {
                    'userid': userid,
                    'type': type
                }
            })
                .then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    if (response.data == null){
                        alert("No Batch Data")
                        $location.path('/')
                    }
                    $cookieStore.put('batch', response.data)
                    $rootScope.batch = $cookieStore.get('batch')


                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    alert("Can not fetch Batch Data")
                });

        }
    }
    //TODO: /batch/generateBatchs
    //TODO: /batch/userBatchPrograss
    this.getUserBatchPrograss = function () {
        call = function (type) {
            $http.get(backendUrl.url + "batch/userBatchPrograss", {
                headers: {
                    'userid': $cookieStore.get('id'),
                    'type': type
                }
            })
                .then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available

                    $cookieStore.put('batchProgress', response.data)
                    $rootScope.batchProgress = $cookieStore.get('batchProgress')
                    console.log('getUserBatchPrograss'+response.data)

                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    alert("Can not fetch Batch Data")
                });

        }
        if ( ($location.url() == '/quikCategory') || ($location.url() == '/dashboard')){
            type = annotatorType[1]
            call(type)
            return
        }
        if ($location.url() == '/area-selector'){
            type = annotatorType[0]
            call(type)
            return
        }

    }
    this.putUserBatchPrograss = function (data, callback) {
        var req = {
            method: 'PUT',
            url: backendUrl.url + 'batch/userBatchPrograss',
            data: data
        }
        $http(req)
            .then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(response.data)
                alert('Progress Saved')
                callback()
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });


    }
    //TODO: batch check. Auto change batch
    this.getBatchImageUrl = function () {
        // TODO: load image url by current progress on server
        var displayImg = function (url) {
            $rootScope.imageUrl = url
        }

        if ($rootScope.images) {
            var imageUrl = backendUrl.img + $rootScope.batch['files'][$rootScope.imageId]
            var options = {canvas: true}
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
    
    this.getBatchNoChached = function () {
        if ($cookieStore.get('id') == null){
            alert('No User Logged')
            return
        }

        call = function (type) {
            $http.get(backendUrl.url + "batch/userCurrentBatch", {
                headers: {
                    'userid': $cookieStore.get('id'),
                    'type': type
                }
            })
                .then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $cookieStore.put('batch', response.data)
                    $rootScope.batch = $cookieStore.get('batch')

                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    alert("Can not fetch Batch Data")
                });
        }
        if ( ($location.url() == '/quikCategory') || ($location.url() == '/dashboard')){
            type = annotatorType[1]
            call(type)
            return
        }
        if ($location.url() == '/area-selector'){
            type = annotatorType[0]
            call(type)
            return
        }
        alert('No type specified')


    }
    this.generateBatchs = function (callback) {
        var req = {
            method: 'PUT',
            url: backendUrl.url + 'batch/generateBatchs',
            data: {'size':10}
        }
        $http(req)
            .then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(response.data)
                alert('Generation complete')
                callback()
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    }
})
