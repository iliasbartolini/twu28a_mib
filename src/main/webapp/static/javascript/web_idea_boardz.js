MobileIdeaBoardz.WebIdeaBoardz = function(domain) {
    this.domain = domain;
}

MobileIdeaBoardz.WebIdeaBoardz.prototype = {
    createIdea: function(message) {
        $.ajax({
            type : 'POST',
            url : this.domain + '/points.json?point[section_id]=2&point[message]=' + encodeURIComponent(message)
        });
    }
}

MobileIdeaBoardz.WebIdeaBoardz.instance = new MobileIdeaBoardz.WebIdeaBoardz("http://10.10.15.130:3000");
