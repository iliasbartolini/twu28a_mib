var AppRouter = Backbone.Router.extend({
    routes: {
        "": "index", // http://localhost/
        "for/:boardName/:bid": "sectionsList", //#for/mibTest/9
        "for/:boardName/:bid/createIdea": "createIdea", // #for/mibTest/9/createIdea
        "for/:boardName/:bid/comment": "postComment",  //#for/mibTest/9/comment
        "for/:boardName/:bid/:sid": "ideasList" //#for/mibTest/9/1
    },

    index: function(){
        var indexView = new IdeaBoardz.IndexView();
    },

    sectionsList: function(boardName, bid){
        console.log("hey open board");
        IdeaBoardz.WebIdeaBoardz.instance.getBoard(boardName, bid, {success:function(data){
            board = new IdeaBoardz.Board(data.name, data.id, data.sections);
            new IdeaBoardz.SectionsView(board)}})
    },

    ideasList: function(boardName, bid, sid){
        console.log("in view ideas of section");

        IdeaBoardz.WebIdeaBoardz.instance.getBoard(boardName, bid, {success:function(data){
            board = new IdeaBoardz.Board(data.name, data.id, data.sections);
            new IdeaBoardz.IdeasView(board, sid)}})
        //var ideasView = new IdeaBoardz.IdeasView(boardName, bid, sid);
    },

    createIdea: function(boardName, bid){
        console.log("in createIdea") ;
        var createIdeaView = new IdeaBoardz.CreateIdeaView("#container", boardName, bid);
    },

    postComment: function (boardName, bid){
        console.log("in post comment");
        var createCommentView = new IdeaBoardz.CreateCommentsView("#container",boardName,bid);
    }
});
