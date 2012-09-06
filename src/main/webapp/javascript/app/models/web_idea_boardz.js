IdeaBoardz.WebIdeaBoardz = function(domain) {
    this.domain = domain;
    this.comments = new IdeaBoardz.CommentCollection();
}

IdeaBoardz.WebIdeaBoardz.prototype = {

    getSections: function(boardName, boardID){
        $.ajax({
            type : 'GET',
            url : this.domain + '/for/' + boardName + '/' + boardID + '.json'
        });
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

    getBoard: function(boardName, boardId) {
        var board;

        $.ajax({
            type: 'GET',
            url : this.domain + '/for/' + encodeURIComponent(boardName) + '/' + boardId + '.json',
            dataType : 'json',
            async: false,
            success : function(data){
                console.log(data);
                board = new IdeaBoardz.Board(data.name, data.id);
            }
        });

        return board;
    }
}

IdeaBoardz.WebIdeaBoardz.instance = new IdeaBoardz.WebIdeaBoardz("http://10.10.15.130:3000");