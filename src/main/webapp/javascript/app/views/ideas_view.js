$(document).ready(function () {

    IdeaBoardz.IdeasView = Backbone.View.extend({
        el:$('#viewWrapper'),
        template:_.template($('#template-ideasView').html()),
        navigationTemplate:_.template($("#template-navigation").html()),
        ideaTemplate:_.template($('#template-stickyView').html()),
        container: null,
        board: null,
        sectionId:null,

        initialize:function (container, boardName, boardId, sectionId) {
            this.container = container;
            this.sectionId = sectionId;

            var ideasViewHelper = new IdeaBoardz.ViewHelper(this, this.renderBaseTemplate);
            ideasViewHelper.getBoardForCurrentView(boardName, boardId);
        },

        renderBaseTemplate: function(){
            var html = this.template({sectionName:this.getSectionName()});
            $(this.el).find(this.container).html(html);

            $(this.container).find('#ideasList').append('<h2 class="loading">Retrieving Ideas</h2>');
            this.pollForIdeas();
        },

        pollForIdeas:function () {
            this.startListeningToGetIdeasEvents();

            IdeaBoardz.WebIdeaBoardz.instance.getIdeas(this.board.id, {
                success: function(data){
                    IdeaBoardz.Board.instance.ideas = data;
                    IdeaBoardz.dispatcher.trigger("change:ideasData");
                },
                error: function(){
                    IdeaBoardz.dispatcher.trigger("error:ideasData");
                }
            });

            var currentView = this;     //In setTimeout, 'this' always refers to the global object, so we have to pass the current context as a variable.
            IdeaBoardz.Board.instance.timer = setTimeout(function(){currentView.pollForIdeas()}, 5000);
        },

        startListeningToGetIdeasEvents:function () {
            IdeaBoardz.dispatcher.on("change:ideasData", this.renderIdeasList, this);
            IdeaBoardz.dispatcher.on("error:ideasData", this.renderIdeasErrorNotice, this);
        },

        stopListeningToGetIdeasEvents:function () {
            IdeaBoardz.dispatcher.off("change:ideasData", this.renderIdeasList, this);
            IdeaBoardz.dispatcher.off("error:ideasData", this.renderIdeasErrorNotice, this);
        },

        getSectionName: function(){
            var sections = this.board.sections;
            for(var index in sections){
                if(this.sectionId == sections[index].id){
                    return sections[index].name;
                }
            }
        },

        renderIdeasList:function () {
            this.stopListeningToGetIdeasEvents();
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

        renderIdeasErrorNotice: function() {
            this.stopListeningToGetIdeasEvents();
            var errorMsg = "<h4>Problem retrieving ideas.</h4> Please check your URL or section id."
            $(this.currentView.el).find(this.currentView.container).html(
                '<div class="mib_content"><div id="alert-area" class="alert alert-error alert-main">'+ errorMsg +'</div></div>'
            );
        },
    });
});