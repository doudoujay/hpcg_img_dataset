/**
 * Created by jay on 2016/9/30.
 */
app.service('id', function ($http, $cookieStore, $rootScope,$location) {
    this.isLogin = function () {
        return ($cookieStore.get("id") != null)

    }
    //TODO: fix the log in
    this.ids = ['aa','bb'];
    this.validateId = function (id_user) {
        if (!!~id_user.indexOf(this.ids) ){
            $cookieStore.put("id",id_user)
            $location.path('/').replace()
        }
        else {
            alert(id_user + " does not exist!")
        }
    }

})
