$(document).ready(function () {

    IdeaBoardz.IdeasView = Backbone.View.extend({
        el:$('#viewWrapper'),
        template:_.template($('#template-ideasView').html()),
        navigationTemplate:_.template($("#template-navigation").html()),
        ideaTemplate:_.template($('#template-stickyView').html()),
        boardName:null,
        boardId:null,
        container: null,
        sectionId:null,
        sectionName: null,

        initialize:function (container, boardName, boardId, sectionId) {

            this.container = container;
            this.sectionId = sectionId;

            if(IdeaBoardz.Board.instance === undefined) {
                this.renderPlaceHolder();
                this.requestBoardData(boardName, boardId);
            } else {
                clearTimeout(IdeaBoardz.Board.instance.timer);
                this.renderBoard(IdeaBoardz.Board.instance);
            }
        },

        renderPlaceHolder:function () {
            $(this.el).find('#container').html('<div class="mib_content"><h2 class="loading">Retrieving Board Data</h2></div>');
        },

        renderErrorNotice: function(message) {
            $(this.el).find('#container').html('<div class="mib_content"><div id="alert-area" class="alert alert-error alert-main">'+message+'</div></div>');
            this.stopListeningForChangeEventsForGetBoard();
        },

        requestBoardData: function(boardName, boardId){
            this.listenForChangeEventsForGetBoard();
            IdeaBoardz.WebIdeaBoardz.instance.getBoard(boardName, boardId);
        },

        pollForIdeas:function () {
            this.listenToChangeEventsForGetIdeas();

            IdeaBoardz.WebIdeaBoardz.instance.getIdeas(this.boardId);

            var currentView = this;     //In setTimeout, 'this' always refers to the global object, so we have to pass the current context as a variable.
            IdeaBoardz.Board.instance.timer = setTimeout(function(){currentView.pollForIdeas()}, 5000);
        },

        renderBoard:function(board){
            this.boardId = board.id;
            this.boardName = board.boardName;

            // get section name
            for(var index in board.sections){
                if(this.sectionId == board.sections[index].id){
                    this.sectionName = board.sections[index].name;
                    break;
                }
            }

            $(this.el).find("#navigation").html(this.navigationTemplate({boardName:this.boardName, boardId:this.boardId}));

            IdeaBoardz.Board.instance.currentSection = this.sectionId;

            this.stopListeningForChangeEventsForGetBoard();
            this.pollForIdeas();
        },

        renderIdeasList: function(){
            this.stopListeningForChangeEventsOfGetIdeas();

            var html = this.template({sectionId:this.sectionId, sectionName:this.sectionName});
            $(this.el).find(this.container).html(html);
            this.populateStickies();
        },

        populateStickies:function () {
            var ideas = IdeaBoardz.Board.instance.ideas;
            var stickyHtml = "";
            for (var index = 0; index < ideas.length; index++) {
                var idea = ideas[index];
                if (idea.section_id == this.sectionId) {
                    stickyHtml = this.ideaTemplate({ideaText:idea.message, vote_count:idea.votes_count}) + stickyHtml;
                }
            }
            $(this.container).find('#ideasList').html(stickyHtml);
        },

        listenForChangeEventsForGetBoard:function () {
            IdeaBoardz.dispatcher.on("change:boardData", this.renderBoard, this);
            IdeaBoardz.dispatcher.on("error:ajaxError", this.renderErrorNotice, this);
        },

        stopListeningForChangeEventsForGetBoard:function () {
            IdeaBoardz.dispatcher.off("change:boardData", this.renderBoard, this);
            IdeaBoardz.dispatcher.off("error:ajaxError", this.renderErrorNotice, this);
        },

        listenToChangeEventsForGetIdeas:function () {
            IdeaBoardz.dispatcher.on("change:ideasData", this.renderIdeasList, this);
            IdeaBoardz.dispatcher.on("error:ajaxError", this.renderErrorNotice, this);
        },

        stopListeningForChangeEventsOfGetIdeas:function () {
            IdeaBoardz.dispatcher.off("change:ideasData", this.renderIdeasList, this);
            IdeaBoardz.dispatcher.off("error:ajaxError", this.renderErrorNotice, this);
        }
    });
});