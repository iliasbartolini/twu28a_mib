$(document).ready(function () {

    IdeaBoardz.IdeasView = Backbone.View.extend({
        el:$('#viewWrapper'),
        template:_.template($('#template-ideasView').html()),
        navigationTemplate:_.template($("#template-navigation").html()),
        ideaTemplate:_.template($('#template-stickyView').html()),
        boardName:null,
        boardId:null,
        sectionId:null,
        sectionName: null,
        ideas:[],

        initialize:function (board, sectionId) {
            var ideasCollection = IdeaBoardz.WebIdeaBoardz.instance.getIdeas(board.id);
            this.ideas = ideasCollection.ideas;
            this.boardName = board.boardName;
            this.boardId = board.id;
            this.sectionId = sectionId;

            for (var i=0; i<board.sections.length; i++){
                if (board.sections[i].id == this.sectionId){
                    this.sectionName = board.sections[i].name;
                    break;
                }
            }

            this.render();
        },

        render:function () {
            $(this.el).find("#navigation").html(this.navigationTemplate({boardName:this.boardName, boardId:this.boardId}));
            var html = this.template({sectionId:this.sectionId, sectionName:this.sectionName});
            $(this.el).find('#container').html(html);
            this.populateStickies();

            this.doPoll();

            return this;
        },

        populateStickies:function () {
            var sticky_html = "";
            for (var index = 0; index < this.ideas.length; index++) {
                var idea = this.ideas[index];
                if (idea.section_id == this.sectionId) {
                    sticky_html = this.ideaTemplate({ideaText:idea.message, vote_count:idea.votes_count}) + sticky_html;
                }
            }
            $('#container').find('#ideasList').html(sticky_html);
        },

        doPoll:function () {
            var ideasCollection = IdeaBoardz.WebIdeaBoardz.instance.getIdeas(this.boardId);
            this.ideas = ideasCollection.ideas;

            this.populateStickies();

            var that = this;
            setTimeout(function(){that.doPoll()}, 5000);
        }
    });
});