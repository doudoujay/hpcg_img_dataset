/**
 * Created by jay on 2016/9/30.
 */
app.service('imageData', function ($http, $cookieStore, $rootScope) {
    this.getImageCategories = function () {
        //    TODO: API For getImageCategory
        return [
            "Face","Cat","Car","Boy"
        ]
    }

    this.getImages = function (category) {
        //    TODO: API For getImages

    }

})
