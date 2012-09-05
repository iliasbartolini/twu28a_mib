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
            data : 'board_id='+10+'&name=anonymous&comment='+encodeURIComponent(comment),
            success : success,
            error : error
        });

        console.log("Ajax call made for comment:" + comment);
    },

    createIdea: function(message, callbacks) {
        callbacks = callbacks || {};
        var success = callbacks.success || function() {};
        var error = callbacks.error || function() {};

        $.ajax({
            type : 'POST',
            url : this.domain + '/points.json?point[section_id]=20&point[message]=' + encodeURIComponent(message),
            success : success,
            error : error
        });
    }
}

IdeaBoardz.WebIdeaBoardz.instance = new IdeaBoardz.WebIdeaBoardz("http://10.10.15.130:3000");
