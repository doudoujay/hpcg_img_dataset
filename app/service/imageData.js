/**
 * Created by jay on 2016/9/30.
 */
app.service('imageData', function ($http, $cookieStore, $rootScope, $http, $timeout, $cookieStore, $location) {
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
    this.getQuikCategoryData = function (imageDataName, callback) {
        var req = {
            method: 'GET',
            url: backendUrl.url + 'imageQuikCategory/' + imageDataName
        }
        $http(req)
            .then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $rootScope.quikCategoryData = response.data
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
                console.log(response.data)
                $rootScope.fields900 = response.data


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

    //Batch

    this.getUserCurrentBatch = function (callback) {

        call = function (type, callback) {

            $http.get(backendUrl.url + "batch/userCurrentBatch", {
                headers: {
                    'userid': $cookieStore.get('id'),
                    'type': type
                }
            })
                .then(function successCallback(response) {
                    console.log('getUserCurrentBatch')
                    // this callback will be called asynchronously
                    // when the response is available
                    if (response.data == {}) {
                        console.log(response.data)
                        alert("No Batch Data Left")
                        $location.path('/')
                    }
                    $cookieStore.put('batch', response.data)
                    $rootScope.batch = $cookieStore.get('batch')
                    $rootScope.imageId = $rootScope.batch['current'][type]
                    console.log($rootScope.imageId)
                    if (callback != null) {
                        callback()
                    }


                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    alert("Can not fetch Batch Data")
                });
        }

        if ($cookieStore.get('batch')) {
            //Cache
            $rootScope.batch = $cookieStore.get('batch')
        } else {
            if (($location.url() == '/quikCategory') || ($location.url() == '/dashboard')) {
                type = annotatorType[1]
                call(type, callback)
                return
            }
            if ($location.url() == '/area-selector') {
                type = annotatorType[0]
                call(type, callback)
                return
            }
        }
    }

    this.getUserBatchPrograss = function (callback) {
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
                    console.log('getUserBatchPrograss' + response.data)
                    if (callback) callback()
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    alert("Can not fetch Batch Data")
                });

        }
        if (($location.url() == '/quikCategory') || ($location.url() == '/dashboard')) {
            type = annotatorType[1]
            call(type)
            return
        }
        if ($location.url() == '/area-selector') {
            type = annotatorType[0]
            call(type)
            return
        }

    }
    this.putUserBatchPrograss = function (callback) {
        call = function (type) {
            var req = {
                method: 'PUT',
                url: backendUrl.url + 'batch/userBatchPrograss',
                data: {
                    "type": type,
                    "userid": $cookieStore.get('id'),
                    "value": $rootScope.imageId
                }
            }
            $http(req)
                .then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log(response.data)
                    callback()
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }


        if (($location.url() == '/quikCategory') || ($location.url() == '/dashboard')) {
            type = annotatorType[1]
            call(type)
            return
        }
        if ($location.url() == '/area-selector') {
            type = annotatorType[0]
            call(type)
            return
        }


    }

    this.getBatchImageUrl = function (callback) {

        var displayImg = function (url) {
            $rootScope.imageUrl = url
        }

        if ($rootScope.batch['files']) {
            var imageUrl = backendUrl.img + $rootScope.batch['files'][$rootScope.imageId]
            var options = {canvas: true}
            displayImg(imageUrl)
            EXIF.getData(imageUrl, function () {
                var allMetaData = EXIF.getAllTags(this);
                console.log(allMetaData.orientation)
            });

            if (callback) callback()
        } else {

            alert('no data')

        }

    }

    this.getBatchNoChached = function (callback) {
        if ($cookieStore.get('id') == null) {
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

                    if (response.data == {}) {
                        console.log(response.data)
                        alert("No Batch Data Left")
                        $location.path('/')
                    }
                    $cookieStore.put('batch', response.data)
                    $rootScope.batch = $cookieStore.get('batch')
                    $rootScope.imageId = $rootScope.batch['current'][type]
                    $cookieStore.put('imageId', $rootScope.imageId)
                    if (callback != null) {
                        callback()
                    }


                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    alert("Can not fetch Batch Data")
                });
        }
        if (($location.url() == '/quikCategory') || ($location.url() == '/dashboard')) {
            type = annotatorType[1]
            call(type)
            return
        }
        if ($location.url() == '/area-selector') {
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
            data: {'size': 100}
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
