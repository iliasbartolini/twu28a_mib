var IdeasView = Backbone.View.extend({
    el: $('#viewWrapper'),
    template:_.template($('#template-ideasView').html()),
    ideaTemplate: _.template($('#template-stickyView').html()),
    boardName: null,
    boardId: null,
    sectionId: null,
    ideas:[],

    initialize: function(boardName, boardId, sectionId){
        var ideasCollection = IdeaBoardz.WebIdeaBoardz.instance.getIdeas(boardId)
        this.ideas = ideasCollection.ideas;
        console.log('in initialize of ideas view');
        this.boardName = boardName;
        this.boardId = boardId;
        this.sectionId = sectionId;
        this.render();
    },

    render: function(){
        console.log('in render of ideas view');
        var html = this.template({sectionId: this.sectionId});
        $(this.el).find('#container').html(html);
        var sticky_html="";
        for(var index = 0; index < this.ideas.length ; index++){
            var idea = this.ideas[index];
            if(idea.section_id == this.sectionId){
                sticky_html += this.ideaTemplate({ideaText:idea.message, vote_count:idea.votes_count});
            }
        }
        $('#container').find('#ideasList').html(sticky_html);

        return this;
    }
});
