/**
 * Created by jay on 2016/9/30.
 */
app.controller('DemoController', function ($scope) {
    // $http.get('data-api.json').success(function(response) {
    // $scope.fields = response.data;
    var testData = [];

    $scope.fields900 = testData.slice(0);


    $scope.onAddArea = function (ev, boxId, areas, area) {
        console.log("area added");
        $scope.log900 = JSON.stringify(areas);
        $scope.$apply();
    }


    $scope.onChangeAreas900 = function (ev, boxId, areas, area) {
        console.log(areas);
        $scope.log900 = JSON.stringify(areas);
        $scope.$apply();
    }

    $scope.onChangeAreas600 = function (ev, boxId, areas, area) {
        $scope.log600 = JSON.stringify(areas);
        $scope.$apply();
    }

    // });
});
