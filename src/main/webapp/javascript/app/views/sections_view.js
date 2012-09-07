
var SectionsView = Backbone.View.extend({
    el: $('#viewWrapper'),
    template: _.template($('#template-sectionsView').html()),
    sectionTemplate: _.template($('#template-sectionItem').html()),
    boardName: "",
    boardID: null,
    sections: [],

    initialize: function(boardName, id) {
        var board = IdeaBoardz.WebIdeaBoardz.instance.getBoard(boardName, id);
        console.log(board);
        this.boardID=board.id;
        this.boardName=board.boardName;
        this.sections=board.sections;
        this.render();
    },

    events: {
        "click #createIdeaBtn": "createIdea"
    },


    createIdea: function(event){
        console.log("in create idea");
    },

    render: function() {
        console.log(this.sections);
        console.log(this.boardName);
        var html = this.template({boardName: this.boardName});
        $(this.el).find('#container').html(html);
        var html="";
        for(i=0; i< this.sections.length; i++){
             html+=this.sectionTemplate({sectionName: this.sections[i].name});
        };
        $('#container').find('#sectionsList').html(html);
        return this;
    }
});