$(document).ready(function() {
    IdeaBoardz.CreateIdeaView = Backbone.View.extend({
        el: $("#viewWrapper"),
        template: _.template($("#template-newIdea").html()),
        navigationTemplate: _.template($("#template-navigation").html()),
        _boardName: null,
        _boardID: null,
        container: null,

        events: {
            "click #submitBtn": "submitIdea",
            "click #createIdeaBtn": "reRender",
            "click #commentBtn": "reRender",
            "click #sectionsBtn": "reRender"
        },

        reRender:function(){
            this.render();
        },

        initialize: function(container, boardName, id) {
            this.container = container;
            this._boardName = boardName;
            this._boardID = id;
            if (IdeaBoardz.Board.instance) clearTimeout(IdeaBoardz.Board.instance.timer);
            _.bindAll(this,"resetBinding");
            this.resetBinding();
            this.render();
        },


        resetBinding:function(){
            $(this.el).undelegate('#submitBtn', 'click');
        },

        render: function(){
            $(this.el).find('#commentBtn').attr("href", "#for/" + this._boardName + "/" + this._boardID + "/comment");
            $(this.el).find('#createIdeaBtn').attr("href", "#for/" + this._boardName + "/" + this._boardID + "/createIdea");
            $(this.el).find('#sectionsBtn').attr("href", "#for/" + this._boardName + "/" + this._boardID);

            $(this.el).find("#navigation").html(this.navigationTemplate({boardName:this._boardName, boardId:this._boardID}));

            var html = this.template({ boardName: this._boardName, boardId: this._boardID });

            $(this.el).find(this.container).html(html);  // Append the result to the view's element.
            $(this.el).find("#ideaText").focus();
            return this;
        },

        submitIdea: function(event){
            var message = $(this.el).find("#ideaText").val();
            message = this.trim(message);
            if (message == '') this.showEmptyError();
            else {
                IdeaBoardz.WebIdeaBoardz.instance.createIdea(message, {success: this.showSuccess, error: this.showError, context: this} );
            }
            $(this.el).find("#ideaText").focus();
            return false;
        },

        trim: function(str){
            return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        },

        showSuccess: function(event){

            $(this.el).find("#alert-area").html($("<div id=‘success-msg’ align='center'  class='alert alert-success'><p>Your idea has been posted.</p></div>"));
            $(this.el).find("#ideaText").val("");
        },

        showError: function(event){
            $(this.el).find("#alert-area").html($("<div id=‘error-msg’ align='center'  class='alert alert-error'><p>Failed to submit. Please try again in some time.</p></div>"));
        },

        showEmptyError: function(event){
            $(this.el).find("#alert-area").html($("<div id=‘empty-msg’ align='center' class='alert alert-error'><p>Please enter some text.</p></div>"));
        },


        toString: function(){
            return "A CreateIdeaView";
        }

    });
});
