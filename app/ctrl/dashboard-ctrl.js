/**
 * Created by jay on 2016/9/30.
 */
app.controller('dashboard', function ($scope,imageData) {
    $scope.imageCatogories = imageData.getImageCategories()

});
