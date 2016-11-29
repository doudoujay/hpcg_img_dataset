/**
 * Created by jay on 2016/11/21.
 */
app.controller('profile', function ($scope,$location,$cookieStore, $rootScope) {

    $scope.id = $cookieStore.get('id')
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

    Chartist.Pie('#imagesChart', dataPreferences, optionsPreferences);

    Chartist.Pie('#imagesChart', {
        labels: ['62%','32%'],
        series: [62, 32]
    });

    Chartist.Pie('#objectsChart', dataPreferences, optionsPreferences);

    Chartist.Pie('#objectsChart', {
        labels: ['62%','32%'],
        series: [62, 32]
    });

});
