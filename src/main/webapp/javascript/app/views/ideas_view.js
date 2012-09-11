$(document).ready(function () {

    IdeaBoardz.IdeasView = Backbone.View.extend({
        el:$('#viewWrapper'),
        template:_.template($('#template-ideasView').html()),
        navigationTemplate:_.template($("#template-navigation").html()),
        ideaTemplate:_.template($('#template-stickyView').html()),
        boardName:null,
        boardId:null,
        container: null,
        sectionId:null,
        sectionName: null,

        initialize:function (container, boardName, boardId, sectionId) {
            console.log('in initialize of ideas view');

            this.container = container;
            this.sectionId = sectionId;

            if(IdeaBoardz.Board.instance === undefined) {
                console.log("NO BOARD DEFINED YET!!!");
                this.boardName = boardName;
                this.boardId = boardId;
                this.render();
            } else {
                console.log("SOME BOARD IS DEFINED! RENDER DATA DIRECTLY");
                this.updateBoardDetails(IdeaBoardz.Board.instance);
            }
            this.render();
        },

        render:function () {

            console.log('render place holder text');
            $(this.el).find('#container').html('<div class="mib_content"><h2 class="loading">Retrieving Board Data</h2></div>');
            this.requestBoardData();


        },

        requestBoardData: function(){
            console.log('request board data');

            //register to listen to event of data come back
            IdeaBoardz.dispatcher.on("change:boardData", this.updateBoardDetails, this);
            IdeaBoardz.dispatcher.on("error:ajaxError", this.renderErrorNotice, this);
            IdeaBoardz.WebIdeaBoardz.instance.getBoard(this.boardName, this.boardId );
        },

        updateBoardDetails:function(board){
            console.log('update board details');
            this.boardId = board.id;
            this.boardName = board.boardName;

            // get section name
            for(var index in board.sections){
                if(this.sectionId == board.sections[index].id){
                    this.sectionName = board.sections[index].name;
                    break;
                }
            }

            $(this.el).find("#navigation").html(this.navigationTemplate({boardName:this.boardName, boardId:this.boardId}));

            // data received, unregister event
            IdeaBoardz.dispatcher.off("change:boardData", this.updateBoardDetails, this);

            this.requestIdeasData();
        },

        requestIdeasData: function(){
            console.log("request list of ideas");
            //register to listen to event of data come back
            IdeaBoardz.dispatcher.on("change:ideasData", this.renderIdeasList, this);
            IdeaBoardz.dispatcher.on("error:ajaxError", this.renderErrorNotice, this);

            IdeaBoardz.WebIdeaBoardz.instance.getIdeas(this.boardId);
        },

        renderIdeasList: function(){

            var html = this.template({sectionId:this.sectionId, sectionName:this.sectionName});
            $(this.el).find(this.container).html(html);
            this.populateStickies();

            //this.doPoll();

            return this;
        },

        renderErrorNotice: function(message) {
            console.log('render error');
            $(this.el).find('#container').html('<div class="mib_content"><div id="alert-area" class="alert alert-error alert-main">'+message+'</div></div>');
            IdeaBoardz.dispatcher.off("error:ajaxError", this.renderErrorNotice, this);
        },

        populateStickies:function () {
            console.log("in populateStickies");
            var ideas = IdeaBoardz.Board.instance.ideas;

            var sticky_html = "";
            for (var index = 0; index < ideas.length; index++) {
                var idea = ideas[index];
                if (idea.section_id == this.sectionId) {
                    sticky_html = this.ideaTemplate({ideaText:idea.message, vote_count:idea.votes_count}) + sticky_html;
                }
            }
            $(this.container).find('#ideasList').html(sticky_html);
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