var AppRouter = Backbone.Router.extend({
    routes: {
        "": "index", // http://localhost/
        "for/:boardName/:id": "createIdea" // #for/mibTest/9
    },
    index: function(){
        var indexView = new IndexView();
    },
    createIdea: function(boardName, id){
        var createIdeaView = new CreateIdeaView($("#blah"), boardName, id);
    }
});