$(document).ready(function () {

    IdeaBoardz.SectionsView = Backbone.View.extend({
        el:$('#viewWrapper'),
        template:_.template($('#template-sectionsView').html()),
        sectionTemplate:_.template($('#template-sectionItem').html()),
        navigationTemplate:_.template($("#template-navigation").html()),
        boardName:"",
        boardID:null,
        sections:[],


        initialize:function (board) {
            console.log('in sections_view initialize: '+board);
            this.boardID = board.id;
            this.boardName = board.boardName;
            this.sections = board.sections;

            this.customizeMenuLinks();
            this.render();
        },


        createIdea:function (event) {
            console.log("in create idea");
        },

        render:function () {
            console.log(this.sections);
            console.log(this.boardName);
            $(this.el).find("#navigation").html(this.navigationTemplate({boardName:this.boardName, boardId:this.boardID}));
            var html = this.template({boardName:this.boardName});
            $(this.el).find('#container').html(html);  // Replace the view's element with the result
            var html = "";
            for (i = 0; i < this.sections.length; i++) {
                html += this.sectionTemplate({sectionName:this.sections[i].name, sectionId:this.sections[i].id, boardName:this.boardName, boardId:this.boardID });
            }
            ;
            $('#container').find('#sectionsList').html(html);
            return this;
        },

        customizeMenuLinks:function () {
            $(this.el).find('#logo').attr("href", "#for/" + this.boardName + "/" + this.boardID);
            $(this.el).find('#commentBtn').attr("href", "#for/" + this.boardName + "/" + this.boardID + "/comment");
            $(this.el).find('#createIdeaBtn').attr("href", "#for/" + this.boardName + "/" + this.boardID + "/createIdea");
        }
    });
});
