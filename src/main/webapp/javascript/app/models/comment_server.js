IdeaBoardz.CommentServer = function(domain){
    this.domain=domain;
}


IdeaBoardz.CommentServer.prototype = {

    postComment:function (boardID, comment, callbacks) {
        callbacks = callbacks || {};
        var success = callbacks.success || function () {
        };

        var error = callbacks.error || function () {
        };

        $.ajax({
            type:'POST',
            url:this.domain + '/mib/postComment',
            data:'board_id=' + encodeURIComponent(boardID) + '&name=anonymous&comment=' + encodeURIComponent(comment),
            success:success,
            error:error
        });
    },

    getComments:function(boardID, callbacks) {
        callbacks = callbacks || {};
        var success = callbacks.success || function () {
        };
        var error =callbacks.error || function(){};

        $.ajax({
            type:'GET',
            dataType:'json',
            url:this.domain + '/mib/getComments?board_id=' + boardID,
            success:success,
            error:error
        });
    },


    getCommentsCount:function(boardID, callbacks) {
        callbacks = callbacks || {};
        var success = callbacks.success || function(){console.log("didn't correctly set success function");};
        var error = callbacks.error || function(){};

        $.ajax({
            type:'GET',
            dataType:'json',
            url:this.domain + '/mib/getCommentsCount?board_id=' + boardID,
            success: success,
            error: error
        });
    }

}


IdeaBoardz.CommentServer.instance = new IdeaBoardz.CommentServer("/commentapi");
