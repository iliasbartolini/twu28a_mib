IdeaBoardz.CommentServer = function(domain){
    this.domain=domain;
}

IdeaBoardz.CommentServer.prototype = {

    postComment: function(boardID,comment,callbacks){
        callbacks = callbacks || {};
        var success = callbacks.success || function() {};
        var error = callbacks.error || function() {};
        //call ajax to post comment using comment api

        console.log("making the ajax call");
        $.ajax({
            type : 'POST',
            url : this.domain + '/mib/postComment',
            data : 'board_id='+encodeURIComponent(boardID)+'&name=anonymous&comment='+encodeURIComponent(comment),
            success : success,
            error : error
        });

        console.log("Ajax call made for comment:" + comment);
    },

    getComments: function(boardID,callbacks){
        callbacks = callbacks || {};
        var success = callbacks.success || function() {};
        var error = callbacks.error || function() {};
        //call ajax to post comment using comment api

        console.log("Just before getting comments");




        $.ajax({
            type: 'GET',
            url : this.domain + '/mib/getComments',
            data : 'board_id='+encodeURIComponent(boardID),
            dataType: 'json',
            success: function(data){
                // Supposing this JSON payload was received:
                //   {"project": {"id": 42, "html": "<div>..." }}
                // append the HTML to context object.

                console.log(data.comments[0].comment);

            },
            error: function(xhr, type){
                alert('Ajax error!')
            }
        })

        console.log("Just after getting comments")
    }
}

IdeaBoardz.CommentServer.instance = new IdeaBoardz.CommentServer("http://localhost:9092/mib");