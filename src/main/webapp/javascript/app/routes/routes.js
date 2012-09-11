
// Initialize Global Dispatcher
IdeaBoardz.dispatcher = _.clone(Backbone.Events);

IdeaBoardz.AppRouter = Backbone.Router.extend({
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
        var sectionsView = new IdeaBoardz.SectionsView("#container", boardName, bid);
    },

    ideasList: function(boardName, bid, sid){
        IdeaBoardz.WebIdeaBoardz.instance.getBoard(boardName, bid, {success:function(data){
            board = new IdeaBoardz.Board(data.name, data.id, data.sections);
            new IdeaBoardz.IdeasView(board, sid)}})
    },

    createIdea: function(boardName, bid){
        var createIdeaView = new IdeaBoardz.CreateIdeaView("#container", boardName, bid);
    },

    postComment: function (boardName, bid){
        var createCommentView = new IdeaBoardz.CreateCommentsView("#container",boardName,bid);
    }
});
