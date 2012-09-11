$(document).ready(function() {
    IdeaBoardz.CreateCommentsView = Backbone.View.extend({
    el: $("#viewWrapper"),
    template: _.template($("#template-comment").html()),
    navigationTemplate: _.template($("#template-navigation").html()),
    _boardName: null,
    _boardID: null,
    container: null,



    events: {
        "click #postBtn": "postAComment",
        "click #createIdeaBtn": "reRender",
        "click #commentBtn": "reRender",
        "click #sectionsBtn": "reRender"
    },


    reRender:function(){
       this.render();
    },

    initialize: function(container, boardName, id) {
        this._boardID = id;
        this._boardName = boardName;
        this.container=container;

        if (IdeaBoardz.Board.instance) clearTimeout(IdeaBoardz.Board.instance.timer);

        _.bindAll(this,"resetBinding");
        this.resetBinding();
        this.render();
        IdeaBoardz.CommentServer.instance.getComments(this._boardID, {success: this.successFunc});

    },

    resetBinding:function(){
        $(this.el).undelegate('#postBtn', 'click');
    },

    render: function(){
        updateQuickLinks(this);
        $(this.el).find("#navigation").html(this.navigationTemplate({boardName:this._boardName, boardId:this._boardID}));

        var html = this.template({ boardName: this._boardName });

        $(this.el).find(this.container).html(html);
        return this;
    },


    postAComment: function(event){
        var message = $(this.el).find("#commentText").val();
        $(this.el).find("#commentText").val("");
        if(message == '') {
            this.showEmptyError();
            return false;
        }
        IdeaBoardz.CommentServer.instance.postComment(this._boardID,message);
        new IdeaBoardz.CommentView(message);
        return false;
    },

    showEmptyError: function(){
        $(this.el).find("#alert-area").html($("<div id=‘empty-msg’ align='center' class='alert alert-error'><p>Please enter a message</p></div>"));
    },

        successFunc: function (data) {
            for(i = 0; i < data.comments.length; i++) {
                new IdeaBoardz.CommentView(data.comments[i].comment);
            }
        }
    });
});