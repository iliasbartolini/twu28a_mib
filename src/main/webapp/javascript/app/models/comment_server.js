IdeaBoardz.CommentServer = function(domain){
    this.domain=domain;
}

IdeaBoardz.CommentServer.prototype = {

    postComment: function(boardID,comment,callbacks){
        callbacks = callbacks || {};
        var success = callbacks.success || function() {};
        var error = callbacks.error || function() {};

        $.ajax({
            type : 'POST',
            url : this.domain + '/mib/postComment',
            data : 'board_id='+encodeURIComponent(boardID)+'&name=anonymous&comment='+encodeURIComponent(comment),
            success : success,
            error : error
        });
    },

    getComments: function(boardID,callbacks){
        callbacks = callbacks || {};
        var success = callbacks.success || function() {};
        var error = callbacks.error || function() {};
        $.ajax({
            type: 'GET',
            url : this.domain + '/mib/getComments',
            data : 'board_id='+encodeURIComponent(boardID),
            dataType: 'json',
            async: false,
            success: function(data){
                for(i=0;i<data.comments.length;i++){
                    comment= new IdeaBoardz.Comment(data.comments[i]);
                }
            },
            error: function(xhr, type){
            }
        })
    }
}

IdeaBoardz.CommentServer.instance = new IdeaBoardz.CommentServer("http://m.ideaboardz.local/commentapi");