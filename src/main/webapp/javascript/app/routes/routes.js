var AppRouter = Backbone.Router.extend({
    routes: {
        "": "index", // http://localhost/
        "for/:boardName/:id/:comment": "postComment",  //#for/mibTest/9/comment
        "for/:boardName/:id": "createIdea"// #for/mibTest/9

    },
    index: function(){
        var indexView = new IndexView($('#container'),$("#template-index"));
    },
    createIdea: function(boardName, id){
        console.log("in createIdea") ;
        var createIdeaView = new IdeaBoardz.CreateIdeaView($("#container"), boardName, id);
    },
    postComment: function (boardName, id){
        console.log("in post comment");
        var postCommentView = new IdeaBoardz.CreateCommentsView(boardName,id);
    }
});
