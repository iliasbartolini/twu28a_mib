$(document).ready(function() {
    IdeaBoardz.CreateIdeaView = Backbone.View.extend({
        el: $("#viewWrapper"),
        template: _.template($("#template-newIdea").html()),
        _ideaText : null,
        _boardName: null,
        _boardID: null,
        container: null,

        events: {
            "click #submitBtn": "submitIdea"
        },

        initialize: function(container, boardName, id) {
            console.log("in initialize");
            this.container = container;
            this._boardName = boardName;
            this._boardID = id;

            this.render();
        },

        render: function(){
            console.log("in render");
            var html = this.template({ boardName: this._boardName, boardId: this._boardID });
            $(this.el).find(this.container).html(html);  // Append the result to the view's element.
            return this;
        },

        submitIdea: function(event){
            console.log("in submitIdea before call to createIdea");
            IdeaBoardz.WebIdeaBoardz.instance.createIdea($(this.el).find("#ideaText").val());

            return false;
        }

    });
});
