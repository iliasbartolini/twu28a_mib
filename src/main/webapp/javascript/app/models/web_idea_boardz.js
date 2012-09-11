IdeaBoardz.WebIdeaBoardz = function(domain,comments) {
    this.domain = domain;
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
            url : this.domain + '/points.json?point[section_id]=1&point[message]=' + encodeURIComponent(message),
            success : success,
            error : error
        });
    },

    getBoard: function(boardName, boardId, callbacks) {
        callbacks = callbacks || {};
        var success = callbacks.success || function(data){
            console.log('data returned success');
            IdeaBoardz.Board.instance = new IdeaBoardz.Board(data.name, data.id, data.sections);
            console.log('trigger change event');
            IdeaBoardz.dispatcher.trigger("change:boardData", IdeaBoardz.Board.instance);
        };
        var error = callbacks.error || function(data){
            console.log('error retrieving board data');
            var errorMsg = "<h4>No such board exists.</h4>The provided board URL is invalid.<br/> Please check the URL again."
            IdeaBoardz.dispatcher.trigger("error:ajaxError", errorMsg);
        };

        $.ajax({
            type: 'GET',
            url : this.domain + '/for/' + encodeURIComponent(boardName) + '/' + boardId + '.json',
            dataType : 'json',
            success: success,
            error: error
        });
    },

    getIdeas : function(boardID){
        var ideas;
        $.ajax({
            type: 'GET',
            url : this.domain + '/retros/' + boardID + '/points.json',
            dataType : 'json',
            async: false,
            success : function(data){
                console.log("in getIdeas Method");
                console.log(data);
                ideas = new IdeaBoardz.IdeaCollection(data);
                console.log(ideas);
            }
        });

        return ideas;
    }
}

IdeaBoardz.WebIdeaBoardz.instance = new IdeaBoardz.WebIdeaBoardz("http://m.ideaboardz.local/api");

