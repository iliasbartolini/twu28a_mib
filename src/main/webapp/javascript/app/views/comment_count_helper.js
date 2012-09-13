IdeaBoardz.CommentCountHelper = function(id){
    this.timer = null;
    this.boardId = id;
    this.started = false;
}

IdeaBoardz.CommentCountHelper.prototype = {

    updateCommentServerWithCommentCount: function(data){
        this.doneListeningToFirstGetCommentCountEvent();
        this.startListeningToGetCommentCountEvent();
        console.log("updating view with comment count; count is "+data.count);
        IdeaBoardz.CommentServer.instance.currentCommentCount = data.count;
    },

    updateViewWithCommentCount: function(data){
        var numberOfNewComments = data.length - IdeaBoardz.CommentServer.instance.currentCommentCount;

        console.log("difference: "+numberOfNewComments);
        if (numberOfNewComments < 0) numberOfNewComments = 0;

        $("#commentCount").html(numberOfNewComments);
    },

    startPollingForNewCommentCount: function() {
        var self = this;
        var successFun = function(data){
            console.log("comment count success!");
            IdeaBoardz.dispatcher.trigger('success:commentCount', data);
            self.doCommentCountPoll();
        };

        IdeaBoardz.CommentServer.instance.getCommentsCount(this.boardId, {success: successFun});
    },

    doCommentCountPoll : function(){
        var id = this.boardId;
        this.timer = setInterval(function(){
                console.log("inside polling, id is "+id);
                IdeaBoardz.CommentServer.instance.getCommentsCount(id, {success: function(data) { IdeaBoardz.dispatcher.trigger('success:commentCount',data); }}
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
        this.started = true;
    },

    stop: function(){
        this.stopListeningToGetCommentCountEvent();
        clearTimeout(this.timer);
        this.started = false;
    }

}