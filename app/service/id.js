/**
 * Created by jay on 2016/9/30.
 */
app.service('id', function ($http, $cookieStore, $rootScope,$location) {
    this.isLogin = function () {
        return ($cookieStore.get("id") != null)

    }
    this.validIds = [
        'doudoujay',
        'aa'
    ]

    this.getUserId = function () {
        return $cookieStore.get('id');
    }


})
