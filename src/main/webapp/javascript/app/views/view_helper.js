// Initialize Global Dispatcher
IdeaBoardz.dispatcher = _.clone(Backbone.Events);

IdeaBoardz.ViewHelper = function(currentView, renderBoardCallback) {
    this.currentView = currentView;
    this.renderBoardCallback = renderBoardCallback;
}

IdeaBoardz.ViewHelper.prototype = {
    navigationTemplate: _.template($("#template-navigation").html()),

    getBoardForCurrentView: function(boardName, boardId){
        var board = IdeaBoardz.Board.instance;

        if(board == undefined || board.name != boardName || board.id != boardId) {
            IdeaBoardz.Board.instance = null;
            this.renderPlaceHolder();
            this.requestBoardData(boardName, boardId);
        } else {
            clearTimeout(IdeaBoardz.Board.instance.timer);
            this.renderView();
        }
    },

    requestBoardData: function(boardName, boardId){
        this.startListeningToGetBoardEvents();
        IdeaBoardz.WebIdeaBoardz.instance.getBoard(boardName, boardId, {
            success: function(data){
                IdeaBoardz.dispatcher.trigger('success:boardData', data);
            },
            error: function(messsage){
                IdeaBoardz.dispatcher.trigger('error:boardData');
            }
        });
    },

    renderPlaceHolder:function () {
        $(this.currentView.el).find(this.currentView.container).html('<div class="mib_content"><h2 class="loading">Retrieving Board Data</h2></div>');
    },

    renderBoardErrorNotice: function() {
        this.stopListeningToGetBoardEvents();
        var errorMsg = "<h4>No such board exists.</h4>The provided board URL is invalid.<br/> Please check the URL again."
        $(this.currentView.el).find(this.currentView.container).html(
            '<div class="mib_content"><div id="alert-area" class="alert alert-error alert-main">'+ errorMsg +'</div></div>'
        );
    },

    updateViewWithReturnedBoardData: function(data){
        this.stopListeningToGetBoardEvents();
        IdeaBoardz.Board.instance = new IdeaBoardz.Board(data.name, data.id, data.sections);
        this.renderView();
    },

    renderView:function(){
        this.currentView.board = IdeaBoardz.Board.instance;
        this.customizeMenuLinks();
        this.renderBoardCallback.call(this.currentView);
    },

    customizeMenuLinks:function () {
        var board = this.currentView.board;
        $(this.currentView.el).find("#navigation").html(
            this.navigationTemplate({
                boardName:board.name,
                boardId:board.id
            })
        );
    },

    startListeningToGetBoardEvents: function(){
        IdeaBoardz.dispatcher.on('success:boardData', this.updateViewWithReturnedBoardData, this);
        IdeaBoardz.dispatcher.on('error:boardData', this.renderBoardErrorNotice, this);
    },

    stopListeningToGetBoardEvents: function(){
        IdeaBoardz.dispatcher.off('success:boardData', this.updateViewWithReturnedBoardData, this);
        IdeaBoardz.dispatcher.off('error:boardData', this.renderBoardErrorNotice, this);
    }
}
