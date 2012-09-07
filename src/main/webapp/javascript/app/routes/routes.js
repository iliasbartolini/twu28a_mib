var AppRouter = Backbone.Router.extend({
    routes: {
        "": "index", // http://localhost/
        "for/:boardName/:bid": "sectionsList", //#for/mibTest/9
        "for/:boardName/:bid/createIdea": "createIdeaPage", // #for/mibTest/9/createIdea
        "for/:boardName/:bid/comment": "postComment",  //#for/mibTest/9/comment
        "for/:boardName/:bid/:sid": "ideasList" //#for/mibTest/9/1
    },

    index: function(){
        var indexView = new IndexView($('#container'),$("#template-index"));
    },

    sectionsList: function(boardName, bid){
        console.log("hey open board");
        IdeaBoardz.WebIdeaBoardz.instance.getBoard(boardName, bid, {success:function(data){

            board = new IdeaBoardz.Board(data.name, data.id, data.sections);
            new SectionsView(board);
        }})
    },

    ideasList: function(boardName, bid, sid){
        console.log("in view ideas of section");
        var ideasView = new IdeasView(boardName, bid, sid);
    },

    createIdeaPage: function(boardName, bid){
        console.log("in createIdea") ;
        IdeaBoardz.WebIdeaBoardz.instance.getBoard(boardName, bid, {success:function(data){

            board = new IdeaBoardz.Board(data.name, data.id, data.sections);
            new IdeaBoardz.CreateIdeaView("#container", board);
        }})
    },

    postComment: function (boardName, bid){
        console.log("in post comment");
        var postCommentView = new IdeaBoardz.CreateCommentsView("#container",boardName,bid);
    }
});
