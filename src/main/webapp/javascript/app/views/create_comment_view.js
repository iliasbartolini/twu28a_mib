$(document).ready(function() {
    IdeaBoardz.CreateCommentsView = Backbone.View.extend({
        el: $("#viewWrapper"),
        template: _.template($("#template-comment").html()),
        navigationTemplate: _.template($("#template-navigation").html()),
        _boardName: null,
        _boardID: null,
        container: null,
        timer: 0,

        events: {
            "click #postBtn": "postAComment",
        },

        pollForComments:function () {
            IdeaBoardz.CommentServer.instance.getComments(this._boardID, {
                success:this.successFunc,
                error:this.renderNoCommentsMessage()
            });

            if (IdeaBoardz.Board.instance.startedPollingForComments == false) {
                this.doCommentsPoll();
                IdeaBoardz.Board.instance.startedPollingForComments = true;
            }
        },

        initialize: function(container, boardName, id) {
            this._boardID = id;
            this._boardName = boardName;
            this.container=container;
            if (IdeaBoardz.Board.instance) {
                clearTimeout(IdeaBoardz.Board.instance.timer);
            }

            _.bindAll(this,"resetBinding");
            this.resetBinding();

            this.render();
            this.pollForComments();
        },

        doCommentsPoll : function(){
            var temp_boardID = this._boardID;
            var temp_pollForComments = this.pollSuccessFunc;
            var timeStamp = new Date().getTime()
            this.timer = setInterval(function(){
                    IdeaBoardz.CommentServer.instance.getComments(temp_boardID, {success: temp_pollForComments})}
                , 2000);

        },



        resetBinding:function(){
            $(this.el).undelegate('#postBtn', 'click');
        },

        render: function(){
            $(this.el).find("#navigation").html(this.navigationTemplate({boardName:this._boardName, boardId:this._boardID}));
            var html = this.template({ boardName: this._boardName });
            $(this.el).find(this.container).html(html);

            // change top menu to be not-fixed
            $(this.el).find('#menu').removeClass('navbar-fixed-top');
            $(this.el).find('.mib_content').addClass('content-pull-up');

            return this;
        },


        postAComment: function(event){
            var message = $(this.el).find("#commentText").val();
            $(this.el).find("#commentText").val("");
            if(message.trim() == '') {
                this.showEmptyError();
                return false;
            }
            var temp_showNoServiceError=this.showNoServiceError;
            IdeaBoardz.CommentServer.instance.postComment(this._boardID,message, {error: temp_showNoServiceError, success: this.clearErrorMessage});
            return false;

        },

        clearErrorMessage: function(){
            $("#viewWrapper").find("#alert-area").html("");
        },


        showEmptyError: function(){
            $(this.el).find("#alert-area").html($("<div id=‘empty-msg’ align='center' class='alert alert-error'>Please enter a message</div>"));
        },

        showNoServiceError: function(){
              $("#viewWrapper").find("#alert-area").html($("<div id=‘empty-msg’ align='center' class='alert alert-error'>Please try again</div>"));
        },


        successFunc: function(data) {
           $("#viewWrapper").find('#noCommentsMessage').html("");
           IdeaBoardz.CommentServer.instance.lastViewedAt = 0;

            for(i = 0; i < data.comments.length; i++) {
                new IdeaBoardz.CommentView(data.comments[i].comment);
            }

            IdeaBoardz.CommentServer.instance.lastViewedAt=data.comments[(data.comments.length)-1].created_at;

        },

        renderNoCommentsMessage:function(){
            IdeaBoardz.CommentServer.instance.lastViewedAt = 0;
            $("#viewWrapper").find('#noCommentsMessage').html("There are no comments to display.");
        },


        pollSuccessFunc : function(data) {
            $("#viewWrapper").find('#noCommentsMessage').html("");
            for(i = 0; i < data.comments.length; i++) {
                if(data.comments[i].created_at > IdeaBoardz.CommentServer.instance.lastViewedAt){
                    new IdeaBoardz.CommentView(data.comments[i].comment);
                }
            }
            IdeaBoardz.CommentServer.instance.lastViewedAt=data.comments[(data.comments.length)-1].created_at;
        }
    });
});