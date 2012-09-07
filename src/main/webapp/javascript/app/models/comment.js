
IdeaBoardz.Comment = Backbone.Model.extend({
    message: null,

    initialize: function(aComment){
        this.message=aComment.comment;
        new IdeaBoardz.CommentView(this.message);
    }
});

