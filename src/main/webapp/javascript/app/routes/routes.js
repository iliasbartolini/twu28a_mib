var AppRouter = Backbone.Router.extend({
    routes: {
        "": "index", // http://localhost/
        "for/:boardName/:id/:comment": "postComment",  //#for/mibTest/9/comment
        "for/:boardName/:id": "sectionsList", //#for/mibTest/9
        "for/:boardName/:id/createIdea": "createIdea" // #for/mibTest/9/createIdea
    },
    index: function(){
        var indexView = new IndexView($('#container'),$("#template-index"));
    },

    sectionsList: function(boardName,id){
        console.log("hey open board");
        var sectionsView = new SectionsView(boardName, id);

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
