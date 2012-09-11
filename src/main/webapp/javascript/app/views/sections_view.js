$(document).ready(function () {

    IdeaBoardz.SectionsView = Backbone.View.extend({
        el:$('#viewWrapper'),
        template:_.template($('#template-sectionsView').html()),
        sectionTemplate:_.template($('#template-sectionItem').html()),
        navigationTemplate:_.template($("#template-navigation").html()),
        container:null,
        board:null,

        initialize:function (container, boardName, boardId) {
            this.container = container;

            if(IdeaBoardz.Board.instance === undefined) {
                this.renderPlaceHolder();
                this.requestBoardData(boardName, boardId);
            } else {
                clearTimeout(IdeaBoardz.Board.instance.timer);
                this.renderBoard();
            }

        },

        requestBoardData: function(boardName, boardId){
            this.startListeningForGetBoardEvents();
            IdeaBoardz.WebIdeaBoardz.instance.getBoard(boardName, boardId);
        },

        renderPlaceHolder:function () {
            $(this.el).find('#container').html('<div class="mib_content"><h2 class="loading">Retrieving Board Data</h2></div>');
        },

        renderErrorNotice: function(message) {
            $(this.el).find('#container').html('<div class="mib_content"><div id="alert-area" class="alert alert-error alert-main">'+message+'</div></div>');
            this.stopListeningForGetBoardEvents();
        },

        startListeningForGetBoardEvents:function () {
            IdeaBoardz.dispatcher.on("change:boardData", this.renderBoard, this);
            IdeaBoardz.dispatcher.on("error:ajaxError", this.renderErrorNotice, this);
        },

        stopListeningForGetBoardEvents:function () {
            IdeaBoardz.dispatcher.off("error:ajaxError", this.renderErrorNotice, this);
            IdeaBoardz.dispatcher.off("change:boardData", this.renderBoard, this);
        },

        renderBoard:function(){
            this.stopListeningForGetBoardEvents();

            this.board = IdeaBoardz.Board.instance;

            this.customizeMenuLinks();
            this.renderBaseTemplate();
            this.renderSectionsList();
        },

        renderBaseTemplate: function(){
            var html = this.template({boardName:this.board.name});
            $(this.el).find(this.container).html(html);
        },

        renderSectionsList: function(){
            var sections = this.board.sections;
            var sectionListHtml = "";

            for (i = 0; i < sections.length; i++) {
                sectionListHtml += this.sectionTemplate({sectionName:sections[i].name, sectionId:sections[i].id, boardName:this.board.name, boardId:this.board.id });
            }

            $(this.container).find('#sectionsList').html(sectionListHtml);
        },

        customizeMenuLinks:function () {
            $(this.el).find("#navigation").html(this.navigationTemplate({boardName:this.board.name, boardId:this.board.id}));
        }
    });
});
