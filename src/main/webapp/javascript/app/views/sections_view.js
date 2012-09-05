
var SectionsView = Backbone.View.extend({
    el: $('#viewWrapper'),
    template: _.template($('#template-sectionsView').html()),
    boardName: "",
    boardID: null,

    initialize: function(boardname, id) {
        //var board = IdeaBoardz.WebIdeaBoardz.instance.getBoard(boardname, id);
        //alert("Result: " + board.name + "ID: " + board.id);
        this.boardID=id;
        this.boardName=boardname;
        this.render();
    },

    events: {
        "click #createIdeaBtn": "createIdea"
    },


    createIdea: function(event){
        console.log("in create idea");
        //event.preventDefault();
        //var view=new IdeaBoardz.CreateIdeaView("#container", this.boardName, this.boardID);
    },

    render: function() {
        var html = this.template();
        $(this.el).find('#container').html(html);  // Replace the view's element with the result
        return this;
    }
});