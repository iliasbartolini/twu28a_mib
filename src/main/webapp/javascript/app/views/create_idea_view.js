/**
 * CreateIdeaView: The view for creating new idea
 * For now will be the default page when enter a correct Board URL
 * @type Backbone.View
 */
var CreateIdeaView = Backbone.View.extend({
    el: null,
    template: null,
    _ideaText : null,
    _boardName: null,
    _boardID: null,

    initialize: function(container, template, ideaText, boardName, id) {
        this.el = container;
        this.template = _.template(template);
        this._boardName = boardName;
        this._boardID = id;
        this._ideaText = ideaText;
        this.render();
    },

    render: function(){
        var html = this.template({ boardName: this._boardName, boardId: this._boardID });
        $(this.el).html(html);  // Append the result to the view's element.
        return this;
    },

    events: {
        "click .submitButton": "submitIdea"
    } ,

    submitIdea: function(event){
        console.log("in submitIdea before call to createIdea");
        IdeaBoardz.WebIdeaBoardz.instance.createIdea(this._ideaText.val());

    }

});