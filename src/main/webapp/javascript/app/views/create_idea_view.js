$(document).ready(function() {
    IdeaBoardz.CreateIdeaView = Backbone.View.extend({
        el: $("#viewWrapper"),
        template: _.template($("#template-newIdea").html()),
        sectionOptionsTemplate: _.template($('#template-sectionOptions').html()),
        _boardName: null,
        _boardID: null,
        _sections:null,
        container: null,

        events: {
            "click #submitBtn": "submitIdea"
        },

        initialize: function(container, board) {
            console.log("in initialize");
            this.container = container;
            this._boardName = board.boardName;
            this._boardID = board.id;
            this._sections=board.sections;
            this.render();
        },

        render: function(){
            console.log("in render"+this._sections[0].name);
            var html = this.template({ boardName: this._boardName, boardId: this._boardID });
            console.log("in render"+this._sections[0].name);
            $(this.el).find(this.container).html(html);  // Append the result to the view's element.
            console.log("in render"+this._sections[0].name);
            var htmlForSections="";
            for(var i=0; i< this._sections.length; i++){
                htmlForSections+=this.sectionOptionsTemplate({sectionName: this._sections[i].name, sectionId: this._sections[i].id });
            };
            console.log(htmlForSections);
            console.log("in render"+this._sections[0].name);
            $('#container').find('#sectionId').html(htmlForSections);
            return this;
        },

        submitIdea: function(event){
            console.log("in submitIdea before call to createIdea");
            var message = $(this.el).find("#ideaText").val();
            var selectedSectionId = $(this.el).find("#sectionId").val();
            if (message == '') this.showEmptyError();
            else {
                IdeaBoardz.WebIdeaBoardz.instance.createIdea(selectedSectionId,message, {success: this.showSuccess, error: this.showError, context: this} );
            }
            return false;
        },

        showSuccess: function(event){
            $(this.el).find("#alert-area").html($("<div id=‘success-msg’ class='alert alert-success'><p>Your idea has been posted.</p></div>"));
            $(this.el).find("#ideaText").val("");
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
