IdeaBoardz.CommentView = Backbone.View.extend({
    el: $("#viewWrapper"),
    message: null,

    initialize: function(message){
        this.message=message;
        this.render();
    },

    render: function(){
        $(this.el).find("#commentsList").prepend('<li><span class="username">anonymous: </span>'+this.message+'</li>');
    }

});


