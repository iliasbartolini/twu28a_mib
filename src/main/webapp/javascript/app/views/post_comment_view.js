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
        this.render();
    },

    render: function(){
        console.log("in render");
        var html = this.template({ boardName: this._boardName });
        $(this.el).find(this.container).html(html);  // Append the result to the view's element.
        return this;
    },

    events: {
        "click #postBtn": "postAComment",
    },

    postAComment: function(event){
        console.log("in post comment");
        var message = $(this.el).find("#commentText").val();
        var commentArea = $(this.el).find("#commentsList").prepend('<li><span class="username">Name: </span>'+message+'</li>');
        console.log(message);
        IdeaBoardz.WebIdeaBoardz.instance.postComment(this._boardID,message);
        return false;
    }

    });

});