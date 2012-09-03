
var CreateIdeaView = Backbone.View.extend({
    el: null,
    template: null,
    _ideaText : null,
    _boardName: null,
    _boardID: null,

    events: {
        "click button#submitBtn": "submitIdea"
    } ,

    initialize: function(container, template, ideaText, boardName, id) {
        console.log("in initialize");
        this.el = container;
        this.template = _.template(template);
        this._boardName = boardName;
        this._boardID = id;
        this._ideaText = ideaText;

        //IdeaBoardz.WebIdeaBoardz.instance.getSections();

        this.render();
    },

    render: function(){
        var html = this.template({ boardName: this._boardName, boardId: this._boardID });
        $(this.el).html(html);  // Append the result to the view's element.
        this.delegateEvents();
        return this;
    },

    submitIdea: function(event){

        console.log("in submitIdea before call to createIdea");
        var result = IdeaBoardz.WebIdeaBoardz.instance.createIdea(this._ideaText.val());

        // tell, don't ask
        // delegation
        return false;
    }

});