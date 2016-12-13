/**
 * Created by jay on 2016/11/21.
 */
app.controller('profile', function ($scope,$location,$cookieStore, $rootScope,imageData,hotkeys) {
    var dataPreferences = {
        series: [
            [25, 30, 20, 25]
        ]
    };

    var optionsPreferences = {
        donut: true,
        donutWidth: 40,
        startAngle: 0,
        total: 100,
        showLabel: false,
        axisX: {
            showGrid: false
        }
    };

    $scope.id = $cookieStore.get('id')
    imageData.getUserStatus('imageAnnotator',function () {
        Chartist.Pie('#imageAnnotator', dataPreferences, optionsPreferences);
        var annotatedImgPercentage = ($scope.imageAnnotator['img']['annotated'] / $scope.imageAnnotator['img']['total'])* 100
        var leftImgPercentage = ($scope.imageAnnotator['img']['left'] / $scope.imageAnnotator['img']['total'])* 100
        console.log(annotatedImgPercentage)
        console.log(leftImgPercentage)
        Chartist.Pie('#imageAnnotator', {
            labels: [annotatedImgPercentage.toFixed(2)+'%',leftImgPercentage.toFixed(2)+'%'],
            series: [annotatedImgPercentage, leftImgPercentage]
        });

    })

    // imageData.getUserStatus('objectAnnotator',function () {
    //
    //     Chartist.Pie('#objectAnnotator', dataPreferences, optionsPreferences);
    //     var annotatedImgPercentage = ($scope.objectAnnotator['img']['annotated'] / $scope.objectAnnotator['img']['total'])* 100
    //     var leftImgPercentage = ($scope.objectAnnotator['img']['left'] / $scope.objectAnnotator['img']['total'])* 100
    //     Chartist.Pie('#objectAnnotator', {
    //         labels: [annotatedImgPercentage.toFixed(2)+'%',leftImgPercentage.toFixed(2)+'%'],
    //         series: [annotatedImgPercentage, leftImgPercentage]
    //     });
    //
    // })
    //



    $scope.generateBatchs = function () {
        imageData.generateBatchs(function () {
            imageData.getUserCurrentBatch()
        })
    }
    hotkeys.add({
        combo: 'ctrl+shift+r',
        action: 'keyup',
        description: 'Refresh',
        callback: function (event, hotkey) {
            $scope.generateBatchs()
        }
    })

});
