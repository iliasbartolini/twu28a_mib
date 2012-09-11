$(document).ready(function () {

    IdeaBoardz.SectionsView = Backbone.View.extend({
        el:$('#viewWrapper'),
        template:_.template($('#template-sectionsView').html()),
        sectionTemplate:_.template($('#template-sectionItem').html()),
        navigationTemplate:_.template($("#template-navigation").html()),
        container:null,
        boardName:"",
        boardID:null,
        sections:[],

        initialize:function (container, boardName, boardId) {
            this.boardID = boardId;
            this.boardName = boardName;
            this.container = container;

            if(IdeaBoardz.Board.instance === undefined) {
                this.render();
            } else {
                clearTimeout(IdeaBoardz.Board.instance.timer);
                this.updateBoardDetails(IdeaBoardz.Board.instance);
            }

        },

        render:function () {
            updateQuickLinks(this)
            $(this.el).find('#container').html('<div class="mib_content"><h2 class="loading">Retrieving Board Data</h2></div>');
            this.requestBoardData();
        },

        renderErrorNotice: function(message) {
            $(this.el).find('#container').html('<div class="mib_content"><div id="alert-area" class="alert alert-error alert-main">'+message+'</div></div>');
            IdeaBoardz.dispatcher.off("error:ajaxError", this.renderErrorNotice, this);
        },

        requestBoardData: function(){
            //register to listen to event of data come back
            IdeaBoardz.dispatcher.on("change:boardData", this.updateBoardDetails, this);
            IdeaBoardz.dispatcher.on("error:ajaxError", this.renderErrorNotice, this);
            IdeaBoardz.WebIdeaBoardz.instance.getBoard(this.boardName, this.boardID );
        },

        updateBoardDetails:function(board){
            this.boardID = board.id;
            this.boardName = board.boardName;
            this.sections = board.sections;

            IdeaBoardz.dispatcher.off("change:boardData", this.updateBoardDetails, this);

            this.renderSectionsList();
        },

        renderSectionsList: function(){
            this.customizeMenuLinks();
            var html = this.template({boardName:this.boardName});
            $(this.el).find(this.container).html(html);

            var sectionListHtml = "";
            for (i = 0; i < this.sections.length; i++) {
                sectionListHtml += this.sectionTemplate({sectionName:this.sections[i].name, sectionId:this.sections[i].id, boardName:this.boardName, boardId:this.boardID });
            }
            $(this.container).find('#sectionsList').html(sectionListHtml);
        },

        updateBoardDetails:function(board){
            this.boardID = board.id;
            this.boardName = board.boardName;
            this.sections = board.sections;

            // data received, unregister event
            IdeaBoardz.dispatcher.off("change:boardData", this.updateBoardDetails, this);

            this.renderSectionsList();
        },

        customizeMenuLinks:function () {
            $(this.el).find("#navigation").html(this.navigationTemplate({boardName:this.boardName, boardId:this.boardID}));
            $(this.el).find('#logo').attr("href", "#for/" + this.boardName + "/" + this.boardID);
            $(this.el).find('#commentBtn').attr("href", "#for/" + this.boardName + "/" + this.boardID + "/comment");
            $(this.el).find('#createIdeaBtn').attr("href", "#for/" + this.boardName + "/" + this.boardID + "/createIdea");
        }
    });
});
