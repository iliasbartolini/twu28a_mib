$(document).ready(function() {
    IdeaBoardz.CreateIdeaView = Backbone.View.extend({
        el: $("#container"),
        template: _.template($("#template-newIdea").html()),
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
            var message = $(this.el).find("#ideaText").val();
            if (message == '') this.showEmptyError();
            else {
                IdeaBoardz.WebIdeaBoardz.instance.createIdea(message, {success: this.showSuccess, error: this.showError, context: this} );
            }
            return false;
        },

        //CLEAR IDEA TEXT IN SUCCESS CALLBACK
        showSuccess: function(event){
            $(this.el).find("#alert-area").html($("<div id=‘success-msg’ class='alert alert-success'><p>Your idea has been posted.</p></div>"));
        },

        showError: function(event){
            $(this.el).find("#alert-area").html($("<div id=‘error-msg’ class='alert alert-error'><p>Failed to submit. Please try again in some time.</p></div>"));
        },

        showEmptyError: function(event){
            $(this.el).find("#alert-area").html($("<div id=‘empty-msg’ class='alert alert-error'><p>Please enter some text.</p></div>"));
        },

        toString: function(){
            return "A CreateIdeaView";
        }

    });
});
