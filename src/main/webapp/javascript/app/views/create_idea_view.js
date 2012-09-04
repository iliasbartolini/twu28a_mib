$(document).ready(function() {
    IdeaBoardz.CreateIdeaView = Backbone.View.extend({
        el: $("#container"),
        template: _.template($("#template-newIdea").html()),
        _ideaText : null,
        _boardName: null,
        _boardID: null,

        events: {
            "click #submitBtn": "submitIdea"
        },

        initialize: function(container, boardName, id) {
            console.log("in initialize");
            this.el = container;
            this._boardName = boardName;
            this._boardID = id;

            this.render();
        },

        render: function(){
            console.log("in render");
            var html = this.template({ boardName: this._boardName, boardId: this._boardID });
            $(this.el).html(html);  // Append the result to the view's element.
            return this;
        },

        submitIdea: function(event){
            console.log("in submitIdea before call to createIdea");
            IdeaBoardz.WebIdeaBoardz.instance.createIdea($(this.el).find("#ideaText").val());

            return false;
        }

    });
});
