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
        this.render();
        IdeaBoardz.CommentServer.instance.getComments(this._boardID);
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
        this.renderAComment(message);
        console.log(message);
        IdeaBoardz.CommentServer.instance.postComment(this._boardID,message);
        return false;
    }

    });

});