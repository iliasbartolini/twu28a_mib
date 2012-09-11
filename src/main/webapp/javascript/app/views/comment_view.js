IdeaBoardz.CommentView = Backbone.View.extend({
    el: $("#viewWrapper"),
    message: null,

    initialize: function(message){
        this.message=message;

        if (IdeaBoardz.Board.instance) clearTimeout(IdeaBoardz.Board.instance.timer);

        this.render();
    },

    render: function(){
        $(this.el).find("#commentsList").prepend('<li><span class="username">anonymous: </span>'+this.message+'</li>');
    }

});


