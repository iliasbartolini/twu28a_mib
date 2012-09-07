IdeaBoardz.WebIdeaBoardz = function(domain) {
    this.domain = domain;
}

IdeaBoardz.WebIdeaBoardz.prototype = {

    getSections: function(boardName, boardID){
        $.ajax({
            type : 'GET',
            url : this.domain + '/for/' + boardName + '/' + boardID + '.json'
        });
    },

    postComment: function(boardID,comment,callbacks){
        callbacks = callbacks || {};
        var success = callbacks.success || function() {};
        var error = callbacks.error || function() {};
        //call ajax to post comment using comment api

        console.log("making the ajax call");
        $.ajax({
            type : 'POST',
            url : 'http://localhost:9092/mib/postComment',
            data : 'board_id='+encodeURIComponent(boardID)+'&name=anonymous&comment='+encodeURIComponent(comment),
            success : success,
            error : error
        });

        console.log("Ajax call made for comment:" + comment);
    },

    createIdea: function(message, callbacks) {
        callbacks = callbacks || {};
        var success = callbacks.success || function() {};
        var error = callbacks.error || function() {};
        var context = callbacks.context;

        $.ajax({
            type : 'POST',
            context : context,
            url : this.domain + '/points.json?point[section_id]=20&point[message]=' + encodeURIComponent(message),
            success : success,
            error : error
        });
    },

    getBoard: function(boardName, boardId, callbacks) {
        callbacks = callbacks || {};
        var success = callbacks.success || function() {};
        var error = callbacks.error || function() {};

        $.ajax({
            type: 'GET',
            url : this.domain + '/for/' + encodeURIComponent(boardName) + '/' + boardId + '.json',
            dataType : 'json',
            success: success
        });
    }
}

IdeaBoardz.WebIdeaBoardz.instance = new IdeaBoardz.WebIdeaBoardz("http://m.ideaboardz.local/api");
