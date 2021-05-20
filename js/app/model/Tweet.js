var com = com || {};
com.apress = com.apress || {};
com.apress.model = com.apress.model || {};

com.apress.model.Tweet = Backbone.Model.extend({

    parse: function(model) {

        var friendly = moment(model.created_at, "ddd MMM DD HH:mm:ss ZZ YYYY").fromNow();

        model.friendlyDate = friendly;

        return model;
    }
});