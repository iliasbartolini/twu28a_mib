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
            console.log('in initialize of ideas view');
            this.boardName = board.name;
            this.boardId = board.id;
            this.sectionId = sectionId;

            for (var i=0; i<board.sections.length; i++){
                if (board.sections[i].id == this.sectionId){
                    this.sectionName = board.sections[i].name;
                    console.log("section name: ---- "+this.sectionName);
                    break;
                }
            }

            this.render();
        },

        render:function () {
            console.log('in render of ideas view');
            $(this.el).find("#navigation").html(this.navigationTemplate({boardName:this.boardName, boardId:this.boardId}));
            var html = this.template({sectionId:this.sectionId, sectionName:this.sectionName});
            $(this.el).find('#container').html(html);
            this.populateStickies();

            this.doPoll();

            return this;
        },

        populateStickies:function () {
            console.log("in populateStickies");

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
            console.log("Polling every 5 seconds");
            var ideasCollection = IdeaBoardz.WebIdeaBoardz.instance.getIdeas(this.boardId);
            this.ideas = ideasCollection.ideas;

            this.populateStickies();

            var that = this;
            setTimeout(function(){that.doPoll()}, 5000);
        }
    });
});