var com = com || {};
com.apress = com.apress || {};
com.apress.collection = com.apress.collection || {};

com.apress.collection.Timeline = Backbone.Collection.extend({

    // このコレクションで使用するモデル
    model: com.apress.model.Tweet,
    // コレクションに接続するためのサーバー側のURL
    url: 'http://localhost:8080/timeline',

    initialize: function(option) {
        // 初期化コード
    }
});