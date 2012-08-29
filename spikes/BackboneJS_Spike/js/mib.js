//var cache = new CacheProvider;

$(function() {
    Backbone.emulateJSON = true;

    // Initialize Backbone views.
    var appRouter = new AppRouter();

    // Initialize the Backbone router.
    Backbone.history.start();

});