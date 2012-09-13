IdeaBoardz.AppRouter = Backbone.Router.extend({
    routes: {
        "": "index", // http://localhost/
        "for/:boardName/:bid": "sectionsList", //#for/mibTest/9
        "for/:boardName/:bid/createIdea": "createIdea", // #for/mibTest/9/createIdea
        "for/:boardName/:bid/comment": "postComment",  //#for/mibTest/9/comment
        "for/:boardName/:bid/:sid": "ideasList", //#for/mibTest/9/1
        "*actions":"error"
    },

    initialize: function(){
        var findSlash = new RegExp("(\/)+$", "g");
        this.route(/(.*)\/+$/, "trailFix", function (id) {
            var idWithNoEndingSlash = id.replace(findSlash, '');
            this.navigate(idWithNoEndingSlash, true);
        });
    },

    index: function(){
        var indexView = new IdeaBoardz.IndexView();
    },

    sectionsList: function(boardName, bid){
        boardName=decodeURIComponent(boardName);
        var sectionsView = new IdeaBoardz.SectionsView("#container", boardName, bid);
    },

    ideasList: function(boardName, bid, sid){
        boardName=decodeURIComponent(boardName);
        var ideasView = new IdeaBoardz.IdeasView("#container", boardName, bid, sid);
    },

    createIdea: function(boardName, bid){
        boardName=decodeURIComponent(boardName);
        var createIdeaView = new IdeaBoardz.CreateIdeaView("#container", boardName, bid);
    },

    postComment: function (boardName, bid){
        boardName=decodeURIComponent(boardName);
        var createCommentView = new IdeaBoardz.CreateCommentsView("#container",boardName,bid);
    },

    error: function(actions){
        var errorView = new IdeaBoardz.ErrorView();
    }
});
