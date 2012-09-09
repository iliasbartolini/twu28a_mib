IdeaBoardz.CommentView = Backbone.View.extend({
    el: $("#viewWrapper"),
    message: null,

    initialize: function(message){
        console.log("in initialize of comment_view");
        this.message=message;
        this.render();
    },

    render: function(){
        console.log("in render of comment_view");
        $(this.el).find("#commentsList").prepend('<li><span class="username">anonymous: </span>'+this.message+'</li>');
    }

});


