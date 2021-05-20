var com = com || {};
com.apress = com.apress || {};
com.apress.view = com.apress.view || {};

com.apress.view.SearchView = Backbone.view.extend({

    el: '#search',
    model: null,
    events: {
        'click #searchbutton': 'runSearch'
    },

    initialize: function(options) {
        var self = this;
        self.model = options.model;
    },

    runSearch: function(e) {
        var self = this;
        query = $('#searchbox').val();

        e.preventDefault();

        console.log('Run search against ' + query);

        // 属性を強制的にリセット
        self.model.set('query', '', {silent: true});
        self.model.set('query', query)
    }
})