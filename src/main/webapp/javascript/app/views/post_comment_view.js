$(document).ready(function() {
    IdeaBoardz.CreateCommentsView = Backbone.View.extend({
    el: $("#container"),
    template: _.template($("#template-comment").html()),
    _boardName: null,
    _boardID: null,

    initialize: function(boardName, id) {
        console.log("in initialize");
        this._boardID = id;
        this._boardName = boardName;
        this.render();
    },

    render: function(){
        console.log("in render");
        var html = this.template({ boardName: this._boardName });
        $(this.el).html(html);  // Append the result to the view's element.
        return this;
    },

    events: {
        "click #postBtn": "postAComment",
        "click #commentText": "clearText"
    },

    clearText: function(event){
        $(this.el).find("#commentText").val("");
    },

    postAComment: function(event){
        console.log("in post comment");
        var message = $(this.el).find("#commentText").val();
        $(this.el).find("#commentArea").val(message+"\n"+$(this.el).find("#commentArea").val());
        $(this.el).find("#commentText").val("");
        console.log(message);

        IdeaBoardz.WebIdeaBoardz.instance.postComment(this.boardId,message);
        return false;
    }

    });

});