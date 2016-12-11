/**
 * Created by jay on 2016/11/2.
 */
app.controller('quikCategory', function ($scope, imageData, $rootScope, $cookieStore, $location, ngDialog, $route, hotkeys) {
    $rootScope.category = 'category'
    $scope.id = $cookieStore.get('id')
    $scope.loadImageInit = function () {
        $('#image').hide()
        $('#imgloader').show()
    }
    $scope.loadImageInit()
    imageData.getBatchNoChached(function () {
        imageData.getQuikCategoryData($rootScope.batch['files'][$scope.imageId], function () {
            if ($scope.quikCategoryData.length > 0) {
                if ($scope.quikCategoryData[0]['category']) {
                    $scope.imageStyle = {'border': '15px solid #3472F7'}
                    $scope.status = "Yes"
                } else {
                    $scope.imageStyle = {'border': '15px solid yellow'}
                    $scope.status = "No"
                }
            } else {
                $scope.imageStyle = {'border': '15px solid white'}
                $scope.status = "Unclassified"
            }
        })
        imageData.getBatchImageUrl()
        imageData.getUserBatchPrograss(function () {
            $scope.batchProgress = $cookieStore.get('batchProgress')
        })
    })
    $scope.$watch(function () {
        return $rootScope.batchProgress;
    }, function () {
        $scope.batchProgress = $rootScope.batchProgress;
    }, true);

    $scope.$on('angular-spinkit:imageLoaded', function () {
        console.log('loaded')
        $('#imgloader').hide()
        $('#image').show()
    });


    $scope.ultimateSubmission = function (callback) {
        imageData.putUserBatchPrograss(function () {
            imageData.getBatchNoChached(function () {
                imageData.getQuikCategoryData($rootScope.batch['files'][$scope.imageId], function () {
                    if ($scope.quikCategoryData.length > 0) {
                        if ($scope.quikCategoryData[0]['category']) {
                            $scope.imageStyle = {'border': '15px solid #3472F7'}
                            $scope.status = "Yes"
                        } else {
                            $scope.imageStyle = {'border': '15px solid yellow'}
                            $scope.status = "No"
                        }
                    } else {
                        $scope.imageStyle = {'border': '15px solid white'}
                        $scope.status = "Unclassified"
                    }

                })
                imageData.getBatchImageUrl(function () {
                    $scope.loadImageInit()
                })

                imageData.getUserBatchPrograss(function () {
                    $scope.batchProgress = $cookieStore.get('batchProgress')

                })

                if (callback) callback()
            })
        })
    }

    $scope.goBack = function () {

        var callback = function () {
            if ($rootScope.imageId == 0) {
                alert("No More Image")
            } else {
                $rootScope.imageId = $rootScope.imageId - 1
                $cookieStore.put('imageId', $rootScope.imageId)

                $scope.ultimateSubmission()


            }
        }

        callback()

    }

    $scope.goNext = function () {
        var callback = function () {
            if ($rootScope.imageId == $rootScope.batch['files'].length - 1) {
                ngDialog.open({template: 'prompt', controller: 'quikCategory'});
            } else {
                $rootScope.imageId = $rootScope.imageId + 1
                $cookieStore.put('imageId', $rootScope.imageId)

                $scope.ultimateSubmission()


            }
        }
        callback()
    }

    $scope.yes = function () {
        if ($rootScope.category) {
            var callback = function () {
                if ($rootScope.imageId == $rootScope.batch['files'].length - 1) {
                    ngDialog.open({template: 'prompt', controller: 'quikCategory'});
                } else {
                    $rootScope.imageId = $rootScope.imageId + 1
                    $cookieStore.put('imageId', $rootScope.imageId)

                    $scope.ultimateSubmission()


                }
            }
            var imageName = $rootScope.batch['files'][$scope.imageId]
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
                if ($rootScope.imageId == $rootScope.batch['files'].length - 1) {
                    ngDialog.open({template: 'prompt', controller: 'quikCategory'});
                } else {
                    $rootScope.imageId = $rootScope.imageId + 1
                    $cookieStore.put('imageId', $rootScope.imageId)

                    $scope.ultimateSubmission(function () {
                    })

                }
            }
            var imageName = $rootScope.batch['files'][$scope.imageId]
            var result = {}
            result[$rootScope.category] = false
            imageData.submitQuikCategoryData(result, imageName, callback)
        }
        else {
            alert('Please select the category')
        }
    }
    $scope.quitAndSave = function () {
        $scope.ultimateSubmission(function () {
            ngDialog.close()
            $location.path('/')
        })


    }

    $scope.nextBatch = function () {
        ngDialog.close()
        $rootScope.imageId = $rootScope.imageId + 1
        $scope.ultimateSubmission(function () {


        })

    }

    hotkeys.add({
        combo: 'up',
        action: 'keyup',
        description: 'Yes',
        callback: function (event, hotkey) {
            $scope.yes()
        }
    });

    hotkeys.add({
        combo: 'down',
        action: 'keyup',
        description: 'No',
        callback: function (event, hotkey) {
            $scope.no()
        }
    });
    hotkeys.add({
        combo: 'left',
        action: 'keyup',
        description: 'goBack',
        callback: function (event, hotkey) {
            $scope.goBack()
        }
    });
    hotkeys.add({
        combo: 'right',
        action: 'keyup',
        description: 'goNext',
        callback: function (event, hotkey) {
            $scope.goNext()
        }
    });
});
