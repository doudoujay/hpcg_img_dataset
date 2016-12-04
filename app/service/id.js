/**
 * Created by jay on 2016/9/30.
 */
app.service('id', function ($http, $cookieStore, $rootScope,$location) {
    this.isLogin = function () {
        return ($cookieStore.get("id") != null)

    }
    this.validIds = [
        'doudoujay',
        '2f2f245e-543a-47b2-b403-dc64d244c2cb',
        '1ee4cb0f-5370-4c33-9a47-c6d8539cde81',
        'a17ffea7-ec97-4a4e-99de-6cc117d760f1',
        '4cac548a-5bf6-4fd4-90a2-4f45f64d9a36',
        '00b3cb63-b56f-476e-a97f-e90d8d6781a8',
        '2c071bf6-2723-46a7-9d64-6285a6caa795',
        '8ea34666-8ab8-4883-9f4a-546c9ce1cf4a',
        '3348de85-4a7f-44df-bd59-48c77075125e',
        'fdc9ce01-7f5c-49cb-aa91-a3431b69febf',
        '0b871edd-84a3-4605-a342-5bbd4d39029d',
        'be2f0254-76f9-40f9-bfd7-22b78ee2774c',
        '1312754c-8942-449c-89ef-d55dd52d7fb5',
        '37fd00a3-54d7-4e5f-a07a-6390c670d3e4',
        '5dbfb6e7-a0cc-4ae1-a5c9-5e31efe78174',
        '15b66396-98a7-4f65-96c4-f1a181309a48'
    ]

    this.getUserId = function () {
        return $cookieStore.get('id');
    }


})
