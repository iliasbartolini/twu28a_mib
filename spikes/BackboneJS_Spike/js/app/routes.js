var AppRouter = Backbone.Router.extend({
    routes: {
        "": "index", // http://localhost/
        //"for/:boardName/:commentID": "createIdea" // #for/mibTest/9
        "for/:boardName/:id": "boardHome" // #for/mibTest/9

    },
    index: function(){
        var indexView = new IndexView();
    },
    createIdea: function(boardName, id){
        var createIdeaView = new CreateIdeaView($("#blah"), boardName, id);
    },
    boardHome: function(boardName, id){
        var boardHomeView = new BoardHomeView(boardName, id);
    }
});
