/**
 * Created by jay on 2016/9/30.
 */
app.controller('login', function ($scope, id,$location) {

    $scope.id = '';
    $scope.login = function () {

        console.log($scope.id)


        if (!!~$scope.id.indexOf(['aa']) ){

            console.log($scope.id)
            $location.path('/').replace()
        }
        else {
            alert($scope.id + " does not exist!")
        }
    }


});
