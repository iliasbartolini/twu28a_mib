$(document).ready(function() {
    IdeaBoardz.CreateCommentsView = Backbone.View.extend({
    el: $("#viewWrapper"),
    template: _.template($("#template-comment").html()),
    _boardName: null,
    _boardID: null,
    container: null,

    initialize: function(container,boardName, id) {
        this._boardID = id;
        this._boardName = boardName;
        this.container=container;
        _.bindAll(this,"cancel");
        this.cancel();
        this.render();
        IdeaBoardz.CommentServer.instance.getComments(this._boardID);

    },

    cancel:function(){
        console.log("In Cancel");
        $(this.el).undelegate('#postBtn', 'click');
    },

            render: function(){
        console.log("in render");
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