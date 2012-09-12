IdeaBoardz.WebIdeaBoardz = function(domain,comments) {
    this.domain = domain;
}

IdeaBoardz.WebIdeaBoardz.prototype = {

    createIdea: function(sectionId, message, callbacks) {
        callbacks = callbacks || {};
        var success = callbacks.success || function() {};
        var error = callbacks.error || function() {};
        var context = callbacks.context;

        $.ajax({
            type : 'POST',
            url : this.domain + '/points.json?point[section_id]='+encodeURIComponent(sectionId)+'&point[message]=' + encodeURIComponent(message),
            context : context,
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
            success: success,
            error: error
        });
    },

    getIdeas : function(boardID, callbacks){
        callbacks = callbacks || {};
        var success = callbacks.success || function() {};
        var error = callbacks.error || function() {};

        $.ajax({
            type: 'GET',
            url : this.domain + '/retros/' + boardID + '/points.json',
            dataType : 'json',
            success : success,
            error: error
        });

    }
}

IdeaBoardz.WebIdeaBoardz.instance = new IdeaBoardz.WebIdeaBoardz("http://m.ideaboardz.local/api");

