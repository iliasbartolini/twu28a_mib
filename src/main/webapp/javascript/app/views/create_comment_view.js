$(document).ready(function() {
    IdeaBoardz.CreateCommentsView = Backbone.View.extend({
    el: $("#viewWrapper"),
    template: _.template($("#template-comment").html()),
    navigationTemplate: _.template($("#template-navigation").html()),
    _boardName: null,
    _boardID: null,
    container: null,

    initialize: function(container, boardName, id) {
        this._boardID = id;
        this._boardName = boardName;
        this.container=container;

        _.bindAll(this,"resetBinding");
        this.resetBinding();
        this.render();
        IdeaBoardz.CommentServer.instance.getComments(this._boardID);

    },

    resetBinding:function(){
        console.log("In resetBinding");
        $(this.el).undelegate('#postBtn', 'click');
    },

    render: function(){
        console.log("in render");
        $(this.el).find("#navigation").html(this.navigationTemplate({boardName:this.boardName, boardId:this.boardID}));

        var html = this.template({ boardName: this._boardName });

        $(this.el).find(this.container).html(html);
        return this;
    },

    events: {
        "click #postBtn": "postAComment"
    },


    postAComment: function(event){
        console.log("in post comment");
        var message = $(this.el).find("#commentText").val();
        $(this.el).find("#commentText").val("");
        IdeaBoardz.CommentServer.instance.postComment(this._boardID,message);
        new IdeaBoardz.CommentView(message);
        return false;
    }

    });

});