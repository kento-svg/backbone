var com = com || {};
com.apress = com.apress || {};

com.apress.model.Profile = Backbone.Model.extend({
    urlRoot: 'http://localhost:8080/profile',

    initialize: function(options) {
        var self = this;
        // このビューでレンダリングするモデルを作成
        self.model = new.com.apress.model.Profile({id: options.user});
    },
    parse: function(model) {
        return model;
    }
});