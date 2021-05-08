var com = com || {};
com.apress = com.apress || {};
com.apress.view = com.apress.view || {};

com.apress.view.ProfileView = Backbone.View.extend({
    el: '#profile',
    template: Handlebars.compile($("#profile-template").html()),
    model: null,

    initialize: function(options) {
        var self = this;
        // このビューでレンダリングするモデルを作成
        self.model = new com.apress.model.Profile({id: options.user});

        // fetchの呼び出しにより、resetイベントを強制的に発行
        self.model.fetch({});
        self.listenTo(self.model, 'change', self.render);
    },

    render: function() {
        var self = this;
        if(self.model.cid) {
            var output = self.template({user : self.model.toJSON()});
            self.$el.html(output);
        }
        return self;
    }

});