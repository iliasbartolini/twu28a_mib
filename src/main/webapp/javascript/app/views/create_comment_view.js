$(document).ready(function() {
    IdeaBoardz.CreateCommentsView = Backbone.View.extend({
        el: $("#viewWrapper"),
        template: _.template($("#template-comment").html()),
        board: null,
        container: null,

        events: {
            "click #postBtn": "postAComment",
            "click #commentBtn": "render"
        },

        initialize: function(container, boardName, boardId) {
            this.container=container;
            this.resetBinding();
            this.container = container;
            this.resetBinding();

            var createViewHelper = new IdeaBoardz.ViewHelper(this, this.render);
            createViewHelper.getBoardForCurrentView(boardName, boardId);
        },

        resetBinding:function(){
            $(this.el).undelegate('#postBtn', 'click');
        },

        render: function(){
            var html = this.template({ boardName: this.board.name});
            $(this.el).find(this.container).html(html);
            IdeaBoardz.CommentServer.instance.getComments(this.board.id);
        },

        postAComment: function(event){
            var message = $(this.el).find("#commentText").val();
            $(this.el).find("#commentText").val("");
            if(message == '') {
                this.showEmptyError();
                return false;
            }
            IdeaBoardz.CommentServer.instance.postComment(this.board.id,message);
            new IdeaBoardz.CommentView(message);
            return false;
        },

        showEmptyError: function(){
            $(this.el).find("#alert-area").html($("<div id=‘empty-msg’ align='center' class='alert alert-error'>Please enter a message</div>"));
        }

    });

});