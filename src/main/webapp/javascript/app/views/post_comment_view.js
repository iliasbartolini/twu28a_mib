$(document).ready(function() {
    IdeaBoardz.CreateCommentsView = Backbone.View.extend({
    el: $("#viewWrapper"),
    template: _.template($("#template-comment").html()),
    _boardName: null,
    _boardID: null,
    container: null,

    initialize: function(container,boardName, id) {
        console.log("in initialize");
        this._boardID = id;
        this._boardName = boardName;
        this.container=container;
        this.getAllComments();
        this.render();
    },

    render: function(){
        console.log("in render");

//        var comments = IdeaBoardz.CommentServer.instance.getComments(this._boardID);

        var html = this.template({ boardName: this._boardName });
        $(this.el).find(this.container).html(html);  // Append the result to the view's element.
        return this;
    },

    events: {
        "click #postBtn": "postAComment"
    },

    getAllComments: function(event){
        console.log("in getting All Comments");
        IdeaBoardz.CommentServer.instance.getComments(this._boardID);
    },

    postAComment: function(event){
        console.log("in post comment");
        var message = $(this.el).find("#commentText").val();
        var commentArea = $(this.el).find("#commentsList").prepend('<li><span class="username">anonymous: </span>'+message+'</li>');
        console.log(message);
        IdeaBoardz.CommentServer.instance.postComment(this._boardID,message);
        return false;
    }

    });

});