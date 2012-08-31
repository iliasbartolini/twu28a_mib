IdeaBoardz.WebIdeaBoardz = function(domain) {
    this.domain = domain;
}

IdeaBoardz.WebIdeaBoardz.prototype = {
    createIdea: function(message, callbacks) {
        callbacks = callbacks || {};
        var success = callbacks.success || function() {};
        var error = callbacks.error || function() {};

        $.ajax({
            type : 'POST',
            url : this.domain + '/points.json?point[section_id]=2&point[message]=' + encodeURIComponent(message),
            success : success,
            error : error
        });
    }
}

IdeaBoardz.WebIdeaBoardz.instance = new IdeaBoardz.WebIdeaBoardz("http://10.10.15.130:3000");
