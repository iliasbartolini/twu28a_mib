var AppRouter = Backbone.Router.extend({
    routes: {
        "": "index", // http://localhost/
        "for/:boardName/:id/createIdea": "createIdea", // #for/mibTest/9/createIdea
        "for/:boardName/:id/comment": "postComment",  //#for/mibTest/9/comment
        "for/:boardName/:id": "sectionsList" //#for/mibTest/9

    },
    index: function(){
        var indexView = new IdeaBoardz.IndexView();
    },

    sectionsList: function(boardName,id){
        console.log("hey open board");
        var sectionsView = new IdeaBoardz.SectionsView(boardName, id);

    },

    createIdea: function(boardName, id){
        console.log("in createIdea") ;
        var createIdeaView = new IdeaBoardz.CreateIdeaView("#container", boardName, id);
    },

    postComment: function (boardName, id){
        console.log("in post comment");
        var postCommentView = new IdeaBoardz.CreateCommentsView("#container",boardName,id);
    }
});
