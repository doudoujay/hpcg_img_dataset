/**
 * Created by jay on 2016/11/2.
 */
app.controller('quikCategory', function ($scope, imageData, $rootScope, $cookieStore, $location,ngDialog,$route) {
    $scope.id = $cookieStore.get('id')
    imageData.getBatchNoChached(function () {
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



    $scope.ultimateSubmission = function (callback) {
        imageData.putUserBatchPrograss(function () {
            imageData.getBatchNoChached(function () {

                imageData.getBatchImageUrl()
                imageData.getUserBatchPrograss(function () {
                    $scope.batchProgress = $cookieStore.get('batchProgress')
                    if (callback) callback()
                })


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
                ngDialog.open({ template: 'prompt',controller: 'quikCategory' });
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
                if ($rootScope.imageId == $rootScope.images.length - 1) {
                    ngDialog.open({ template: 'prompt',controller: 'quikCategory' });
                } else {
                    $rootScope.imageId = $rootScope.imageId + 1
                    $cookieStore.put('imageId', $rootScope.imageId + 1)

                    $scope.ultimateSubmission()


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
                    ngDialog.open({ template: 'prompt',controller: 'quikCategory' });
                } else {
                    $rootScope.imageId = $rootScope.imageId + 1
                    $cookieStore.put('imageId', $rootScope.imageId + 1)

                    $scope.ultimateSubmission()

                }
            }
            callback()
            var imageName = $scope.images[$scope.imageId]
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
    
    $scope.nextBatch =function () {
        ngDialog.close()
        $rootScope.imageId = $rootScope.imageId + 1
        $scope.ultimateSubmission(function () {


        })

    }

});
