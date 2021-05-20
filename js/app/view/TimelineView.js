var com = com || {};
com.apress = com.apress || {};
com.apress.view = com.apress.view || {};

com.apress.view.TimelineView = Backbone.View.extend({

    el: '#timeline',

    template: Handlebars.compile($("#timeline-template").html()),
    timeline: null,

    initialize: function() {
        var self = this;

        // このビューでレンダリングするコレクションを作成
        self.timeline = new com.apress.collection.Timeline();
        // renderを初期化
        self.render();

        // fetchの呼び出しにより，resetイベントを強制的に発行
        self.timeline.fetch({reset:true});
        self.listenTo(self.timeline, 'reset', self.render);
    },
    render: function() {
        var self = this;
        if(self.timeline.models.length > 0) {
            var output = self.template({tweet: self.timeline.toJSON()});
            self.$el.append(output);
        }
        return self;
    },
    events: {
        'click .profile': 'showDialog'
    },
    showDialog: function(options) {
        var self = this,
        $target = $(options.currentTtarget),
        username = $target.data('user');

        var ProfileView = new com.apress.view.ProfilePopupView({user: username});
    }
});