IdeaBoardz.CommentCountHelper = function(currentView){
    this.currentView = currentView;
    this.timer = null;

}

IdeaBoardz.CommentCountHelper.prototype = {

    updateCommentServerWithCommentCount: function(data){
        this.doneListeningToFirstGetCommentCountEvent();
        this.startListeningToGetCommentCountEvent();
        console.log("updating view with comment count; count is "+data.count);
        IdeaBoardz.CommentServer.instance.currentCommentCount = data.count;
    },

    updateViewWithCommentCount: function(data){
        IdeaBoardz.CommentServer.instance.currentCommentCount = data.count;
        $(this.currentView.el).find("#commentCount").html(IdeaBoardz.CommentServer.instance.currentCommentCount);
    },

    startPollingForNewCommentCount: function() {
        var self = this;
        var successFun = function(data){
            console.log("comment count success!");
            IdeaBoardz.dispatcher.trigger('success:commentCount', data);
            self.doCommentCountPoll();
        };

        IdeaBoardz.CommentServer.instance.getCommentsCount(IdeaBoardz.Board.instance.id, {success: successFun});
    },

    doCommentCountPoll : function(){
        this.timer = setInterval(function(){
                IdeaBoardz.CommentServer.instance.getCommentsCount(IdeaBoardz.Board.instance.id, {success: function(data) { IdeaBoardz.dispatcher.trigger('success:commentCount',data); }}
                )}
            , 2000);
    },

    listenForFirstGetCommentCountEvent: function(){
        IdeaBoardz.dispatcher.on('success:commentCount', this.updateCommentServerWithCommentCount, this);
    },

    doneListeningToFirstGetCommentCountEvent: function(){
        IdeaBoardz.dispatcher.off('success:commentCount', this.updateCommentServerWithCommentCount, this);
    },

    startListeningToGetCommentCountEvent: function(){
        IdeaBoardz.dispatcher.on('success:commentCount', this.updateViewWithCommentCount, this);
    },

    stopListeningToGetCommentCountEvent: function(){
        IdeaBoardz.dispatcher.off('success:commentCount', this.updateViewWithCommentCount, this);
    },

    start: function(){
        this.listenForFirstGetCommentCountEvent();
        this.startPollingForNewCommentCount();
    }

}