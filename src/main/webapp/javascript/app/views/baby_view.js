var CreateBabyView = Backbone.View.extend({
    el: null,
    template: _.template($("#template-newIdea").html()),
    _boardName: null,
    _boardID: null,

    initialize: function(container, boardName, id) {
        this.el = container;
        this._boardName = boardName;
        this._boardID = id;
        this.render();
    },

    render: function(){
        var html = this.template({ boardName: this._boardName, boardId: this._boardID });
        $(this.el).html(html);  // Append the result to the view's element.
        return this;
    },

    events: {
        "click #submitBtn": "submitIdea"
    },

    submitIdea: function(event){
        IdeaBoardz.WebIdeaBoardz.instance.createIdea("toddler view");
        return false;
    }


});