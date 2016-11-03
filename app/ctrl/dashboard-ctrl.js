/**
 * Created by jay on 2016/9/30.
 */
app.controller('dashboard', function ($scope,imageData,$location,$rootScope) {
    $scope.imageCatogories = imageData.getImageCategories()
    
    $scope.gotoCategory = function (category) {
        $rootScope.category = category
        console.log("Go to Category " +category )
        $location.path('quikCategory')
    }
});
