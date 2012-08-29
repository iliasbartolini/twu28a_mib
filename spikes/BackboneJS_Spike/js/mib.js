//var cache = new CacheProvider;

/**
 * IndexView: The default view seen when opening up the application for the first time.
 * This will be just a message to request user to enter specific board URL for now
 * @type Backbone.View
 */
var IndexView = Backbone.View.extend({
    el: $('#container'),
    template: _.template($("#template-index").html()),

    initialize: function() {
        this.render();
    },

    render: function() {
        var html = this.template();
        $(this.el).append(html);  // Append the result to the view's element.
        return this;
    }
});


/**
 * CreateIdeaView: The view for creating new idea
 * For now will be the default page when enter a correct Board URL
 * @type Backbone.View
 */
var CreateIdeaView = Backbone.View.extend({
    el: $('#container'),
    template: _.template($("#template-newIdea").html()),
    _boardName: null,
    _boardID: null,

    initialize: function(boardName, id) {
        this._boardName = boardName;
        this._boardID = id;
        this.render();
    },

    render: function(){
        var html = this.template({ boardName: this._boardName, boardId: this._boardID });
        $(this.el).append(html);  // Append the result to the view's element.
        return this;
    }
});




var AppRouter = Backbone.Router.extend({
    routes: {
        "": "index", // http://localhost/
        "for/:boardName/:id": "createIdea" // #for/mibTest/9
    },
    index: function(){
        var indexView = new IndexView();
    },
    createIdea: function(boardName, id){
        var createIdeaView = new CreateIdeaView(boardName, id);
    }
});

// Initiate the router
var app_router = new AppRouter;

// Start Backbone history a neccesary step for bookmarkable URL's
Backbone.history.start();