$(document).ready(function () {

    IdeaBoardz.IdeasView = Backbone.View.extend({
        el:$('#viewWrapper'),
        template:_.template($('#template-ideasView').html()),
        navigationTemplate:_.template($("#template-navigation").html()),
        ideaTemplate:_.template($('#template-stickyView').html()),
        boardName:null,
        boardId:null,
        sectionId:null,
        ideas:[],

        initialize:function (boardName, boardId, sectionId) {
            var ideasCollection = IdeaBoardz.WebIdeaBoardz.instance.getIdeas(boardId);
            this.ideas = ideasCollection.ideas;
            console.log('in initialize of ideas view');
            this.boardName = boardName;
            this.boardId = boardId;
            this.sectionId = sectionId;
            this.render();
        },

        render:function () {
            console.log('in render of ideas view');
            $(this.el).find("#navigation").html(this.navigationTemplate());
            var html = this.template({sectionId:this.sectionId});
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