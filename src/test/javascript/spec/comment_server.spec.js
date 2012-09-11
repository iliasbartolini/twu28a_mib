describe("Comment Sever", function(){

    it("should make post call to CommentSever", function(){
        spyOn($, 'ajax');

        var boardID = 3;
        var comment = "a comment";

        IdeaBoardz.CommentServer.instance.postComment(boardID, comment);

        expect(($.ajax).mostRecentCall.args[0].type).toBe('POST');
        expect(($.ajax).mostRecentCall.args[0].url).toBe(IdeaBoardz.CommentServer.instance.domain + '/mib/postComment');

        expect(($.ajax).mostRecentCall.args[0].data).toContain("board_id=" + boardID);
        expect(($.ajax).mostRecentCall.args[0].data).toContain("comment=" + encodeURIComponent(comment));
    });

    it("should make get request to CommentServer", function() {
        var boardID = 1;

        spyOn($, 'ajax').andCallFake(function(options){
            options.success();
        });
        var callback=jasmine.createSpy();

        IdeaBoardz.CommentServer.instance.getComments(boardID, {success : callback});

        expect(($.ajax).mostRecentCall.args[0].type).toBe('GET');
        expect(($.ajax).mostRecentCall.args[0].url).toBe(IdeaBoardz.CommentServer.instance.domain + '/mib/getComments');
        expect(callback).toHaveBeenCalled();
    })
});