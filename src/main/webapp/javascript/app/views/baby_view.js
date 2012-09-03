var CreateBabyView = Backbone.View.extend({
    el: $('#container'),
    template: _.template($("#template-newIdea").html()),
    _boardName: null,
    _boardID: null,

    initialize: function(boardName, id) {
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
        /*console.log("in submitIdea before call to createIdea");
        var message = el.find("#ideaText").val();
        console.log(message);*/

        IdeaBoardz.WebIdeaBoardz.instance.createIdea("baby steps");
        return false;
    }


});