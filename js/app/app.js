// var timeline = new com.apress.collection.Timeline();
// timeline.fetch();
$(function() {
    var timelineView = new com.apress.view.TimelineView(),
    profileView = new com.apress.view.ProfileView({user: 'sugrue'});
    searchModel = new com.apress.model.Search();
    searchView = new com.apress.view.searchView({model: searchModel});
    appRouter = new com.apress.router.appRouter({searchModel: searchModel});
    
    Backbone.history.start();
});

