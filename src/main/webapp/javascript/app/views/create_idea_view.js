
function updateQuickLinks(element) {
    $(element.el).find('#commentBtn').attr("href", "#for/" + element._boardName + "/" + element._boardID + "/comment");
    $(element.el).find('#createIdeaBtn').attr("href", "#for/" + element._boardName + "/" + element._boardID + "/createIdea");
    $(element.el).find('#sectionsBtn').attr("href", "#for/" + element._boardName + "/" + element._boardID);
}

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
            "click #createIdeaBtn": "reRender"
        },

        reRender:function(){
            this.render();
        },

        initialize: function(container, boardName, boardId) {
            this.container = container;
            this._boardName = boardName;
            this._boardID = boardId;

            _.bindAll(this,"resetBinding");
            this.resetBinding();

            if(IdeaBoardz.Board.instance === undefined) {
                this.renderPlaceHolder();
                this.requestBoardData(boardName, boardId);
            } else {
                clearTimeout(IdeaBoardz.Board.instance.timer);
                this.render();
            }
        },

        requestBoardData: function(boardName, boardId){
            this.listenForChangeEventsForGetBoard();
            IdeaBoardz.WebIdeaBoardz.instance.getBoard(boardName, boardId);
        },

        listenForChangeEventsForGetBoard:function () {
            IdeaBoardz.dispatcher.on("change:boardData", this.render, this);
            IdeaBoardz.dispatcher.on("error:ajaxError", this.renderErrorNotice, this);
        },

        stopListeningForChangeEventsForGetBoard:function () {
            IdeaBoardz.dispatcher.off("change:boardData", this.renderBoard, this);
            IdeaBoardz.dispatcher.off("error:ajaxError", this.renderErrorNotice, this);
        },

        resetBinding:function(){
            $(this.el).undelegate('#submitBtn', 'click');
        },

        renderPlaceHolder:function () {
            $(this.el).find('#container').html('<div class="mib_content"><h2 class="loading">Retrieving Board Data</h2></div>');
        },

        renderErrorNotice: function(message) {
            $(this.el).find('#container').html('<div class="mib_content"><div id="alert-area" class="alert alert-error alert-main">'+message+'</div></div>');
            this.stopListeningForChangeEventsForGetBoard();
        },

        render: function(){
            this.stopListeningForChangeEventsForGetBoard();

            $(this.el).find("#navigation").html(this.navigationTemplate({boardName:this._boardName, boardId:this._boardID}));
            updateQuickLinks(this);

            var html = this.template({ boardName: this._boardName, boardId: this._boardID });
            $(this.el).find(this.container).html(html);  // Append the result to the view's element.

            var boardInstance = IdeaBoardz.Board.instance;
            for (i = 0; i < boardInstance.sections.length; i++) {
                $(this.el).find("#sectionId").append('<option value='+ boardInstance.sections[i].id +' >'+boardInstance.sections[i].name+'</option>');
            }

            $(this.el).find("#ideaText").focus();
            return this;
        },

        submitIdea: function(event){
            var message = $(this.el).find("#ideaText").val();
            message = this.trim(message);
            var sectionId=$(this.el).find("#sectionId").val();
            if (message == '') this.showEmptyError();
            else {
                IdeaBoardz.WebIdeaBoardz.instance.createIdea(sectionId,message, {success: this.showSuccess, error: this.showError, context: this} );
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
