IdeaBoardz.WebIdeaBoardz = function(domain) {
    this.domain = domain;
}

IdeaBoardz.WebIdeaBoardz.prototype = {
    createIdea: function(sectionId, message) {
        $.ajax({
            type : 'POST',
            url : this.domain + '/points.json?point[section_id]='+ sectionId +'&point[message]=' + encodeURIComponent(message)
        });
    }
}

IdeaBoardz.WebIdeaBoardz.instance = new IdeaBoardz.WebIdeaBoardz("http://10.10.15.130:3000");
