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
            "click #commentBtn": "render"
        },

        initialize: function(container, boardName, id) {
            console.log("in initialize Create Comments View");
            this._boardID = id;
            this._boardName = boardName;
            this.container=container;
            if (IdeaBoardz.Board.instance) {
                clearTimeout(IdeaBoardz.Board.instance.timer);
            }

            _.bindAll(this,"resetBinding");
            this.resetBinding();

            this.render();

            IdeaBoardz.CommentServer.instance.getComments(this._boardID, {
                success: this.successFunc
            });

            this.doCommentsPoll();

        },

        doCommentsPoll : function(){
            var temp_boardID = this._boardID;
            var temp_pollForComments = this.pollSuccessFunc;
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
            if(message == '') {
                this.showEmptyError();
                return false;
            }
            var temp_showNoServiceError=this.showNoServiceError;
            IdeaBoardz.CommentServer.instance.postComment(this._boardID,message, {error: temp_showNoServiceError});
            return false;

        },

        showEmptyError: function(){
            $(this.el).find("#alert-area").html($("<div id=‘empty-msg’ align='center' class='alert alert-error'>Please enter a message</div>"));
        },

        showNoServiceError: function(){
              $("#viewWrapper").find("#alert-area").html($("<div id=‘empty-msg’ align='center' class='alert alert-error'>Please try again</div>"));
        },


        successFunc: function(data) {
           IdeaBoardz.CommentServer.instance.lastViewedAt =  new Date().getTime();

            for(i = 0; i < data.comments.length; i++) {

                new IdeaBoardz.CommentView(data.comments[i].comment);
            }

        },

        pollSuccessFunc : function(data) {
            var previousViewTime=IdeaBoardz.CommentServer.instance.lastViewedAt;
            IdeaBoardz.CommentServer.instance.lastViewedAt =  new Date().getTime();
            for(i = 0; i < data.comments.length; i++) {
                if(data.comments[i].created_at > previousViewTime){
                    new IdeaBoardz.CommentView(data.comments[i].comment);
                }
            }

        }
    });
});