var com = com || {};
com.apress = com.apress || {};
com.apress.model = com.apress.model || {};

com.apress.collection = Backbone.Collection.extend({

    // このコレクションで使用するモデル
    model: com.apress.model.Tweet,
    // コレクションに接続するためのサーバー側のURL
    url: 'http://localhost:8080/timeline',

    initialize: function(option) {
        // 初期化コード
    }
});