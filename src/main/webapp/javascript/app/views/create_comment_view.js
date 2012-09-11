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

        _.bindAll(this,"resetBinding");
        this.resetBinding();
        this.render();
        IdeaBoardz.CommentServer.instance.getComments(this._boardID);

    },

    resetBinding:function(){
        $(this.el).undelegate('#postBtn', 'click');
    },

    render: function(){
        $(this.el).find('#commentBtn').attr("href", "#for/" + this._boardName + "/" + this._boardID + "/comment");
        $(this.el).find('#createIdeaBtn').attr("href", "#for/" + this._boardName + "/" + this._boardID + "/createIdea");
        $(this.el).find('#sectionsBtn').attr("href", "#for/" + this._boardName + "/" + this._boardID);
        $(this.el).find("#navigation").html(this.navigationTemplate({boardName:this._boardName, boardId:this._boardID}));

        var html = this.template({ boardName: this._boardName });

        $(this.el).find(this.container).html(html);
        return this;
    },


    postAComment: function(event){
        var message = $(this.el).find("#commentText").val();
        $(this.el).find("#commentText").val("");
        IdeaBoardz.CommentServer.instance.postComment(this._boardID,message);
        new IdeaBoardz.CommentView(message);
        return false;
    }

    });

});