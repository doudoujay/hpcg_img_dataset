/**
 * Created by jay on 2016/9/30.
 */
app.controller('login', function ($scope, id,$location,$cookieStore, $rootScope) {

    $rootScope.id = '';
    $scope.login = function () {

        if (id.validIds.indexOf($scope.id) > -1 ){

            console.log($scope.id)
            $cookieStore.put("id",$scope.id)
            $location.path('/').replace()
        }
        else {
            alert($scope.id + " does not exist!")
        }
    }




});
