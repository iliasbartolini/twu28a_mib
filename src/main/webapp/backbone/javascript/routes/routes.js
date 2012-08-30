var AppRouter = Backbone.Router.extend({
    routes: {
        "": "index", // http://localhost/
        "for/:boardName/:id": "createIdea" // #for/mibTest/9
    },
    index: function(){
        var indexView = new IndexView($('#container'),$("#template-index"));
    },
    createIdea: function(boardName, id){
        console.log("oh no pigeons");
        var createIdeaView = new CreateIdeaView($("#container"), $("#template-newIdea"), $("submitBtn"), $("ideaText"), boardName, id);
    }
});