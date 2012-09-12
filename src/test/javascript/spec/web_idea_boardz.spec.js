describe("Web IdeaBoardz", function() {

    var sectionId = 1;


    it("should make ajax POST request with message in URL", function(){
        spyOn($, 'ajax');
        IdeaBoardz.WebIdeaBoardz.instance.createIdea(sectionId,"some");

        expect(($.ajax).mostRecentCall.args[0].type).toEqual("POST");
        expect(($.ajax).mostRecentCall.args[0].url).toEqual(IdeaBoardz.WebIdeaBoardz.instance.domain + "/points.json?point[section_id]="+sectionId+"&point[message]=some");
    });



    it("should escape special symbols when creating Idea",function(){
        spyOn($, 'ajax');
        IdeaBoardz.WebIdeaBoardz.instance.createIdea(sectionId,"lalala/&fjf! ??&");

        expect(($.ajax).mostRecentCall.args[0].type).toEqual("POST");
        expect(($.ajax).mostRecentCall.args[0].url).toEqual(IdeaBoardz.WebIdeaBoardz.instance.domain + "/points.json?point[section_id]="+sectionId+"&point[message]=lalala%2F%26fjf!%20%3F%3F%26");
    });


    it("should call ajax with error callback",function(){
        // arrange
        spyOn($, 'ajax').andCallFake(function(options) {
            options.error();
        });

        var callback = jasmine.createSpy();

        // act

        IdeaBoardz.WebIdeaBoardz.instance.createIdea(sectionId,"lalala/&fjf! ??&", {
            error: callback
        });

        // assert
        expect(callback).toHaveBeenCalled();
    });

    it("should call ajax with error callback if empty Idea is submitted",function(){
        // arrange
        spyOn($, 'ajax').andCallFake(function(options) {
            options.error();
        });

        var callback = jasmine.createSpy();

        // act

        IdeaBoardz.WebIdeaBoardz.instance.createIdea(sectionId,"", {
            error: callback
        });

        // assert
        expect(callback).toHaveBeenCalled();
    });

    it("should call ajax with error callback if white spaces are submitted",function(){
        // arrange
        spyOn($, 'ajax').andCallFake(function(options) {
            options.error();
        });

        var callback = jasmine.createSpy();

        // act

        IdeaBoardz.WebIdeaBoardz.instance.createIdea(sectionId,"              ", {
            error: callback
        });

        // assert
        expect(callback).toHaveBeenCalled();
    });

    it("should call ajax with success callback", function(){
        //arrange
        spyOn($, 'ajax').andCallFake(function(options) {
            options.success();
        });

        var callback = jasmine.createSpy();

        //act
        IdeaBoardz.WebIdeaBoardz.instance.createIdea(sectionId,"idea", {
            success: callback
        });

        //assert
        expect(callback).toHaveBeenCalled();
    });

    it("should call ajax with callback in the context of the object passed in", function(){
        //arrange
        spyOn($, 'ajax');

        var callback = jasmine.createSpy();
        var contextObject = {};

        //act
        IdeaBoardz.WebIdeaBoardz.instance.createIdea(sectionId,"idea", {
            success: callback,
            context: contextObject
        });

        //assert
        expect(($.ajax).mostRecentCall.args[0].context).toEqual(contextObject);
    });

    xit("should make ajax GET request when getBoard is called", function(){
        var fakeJSON={
            "name":"mibimmmm",
            "id":16,
            "description":"blah",
            "sections":[{"name":"What went well","id":33},{"name":"What can be improved","id":34},{"name":"Action Items","id":35}]
        };

        spyOn($, 'ajax').andCallFake(function(options){
            options.success(fakeJSON);
            });
        spyOn(IdeaBoardz, 'Board');
        expect(IdeaBoardz.Board).toHaveBeenCalledWith("mibimmmm", 16, [{"name":"What went well","id":33},{"name":"What can be improved","id":34},{"name":"Action Items","id":35}]);
    });
    
    xit("should collect all the Ideas in a board when getIdeas is called", function(){
        IdeaBoardz.Board.instance = new IdeaBoardz.Board("name", 16, []);

        var fakeJSON=[{"created_at":"2012/08/31 15:38:51 +0000","updated_at":"2012/08/31 15:39:06 +0000",
                "section_id":4,"id":53874,"message":"work on multiple stories \n\nwork with claim status story",
                "votes_count":4} ,

            {"created_at":"2012/08/31 15:39:45 +0000",
                "updated_at":"2012/08/31 16:05:39 +0000","section_id":4,"id":53876,
                "message":"good communication wiht BO grooming is good","votes_count":3}]  ;



        spyOn($, 'ajax').andCallFake(function(options){
            options.success(fakeJSON);
        });

        spyOn(IdeaBoardz.dispatcher, 'trigger').andCallFake(function(options){
        });
        IdeaBoardz.WebIdeaBoardz.instance.getIdeas(IdeaBoardz.Board.instance.id);

        expect(IdeaBoardz.Board.instance.ideas).toBe(fakeJSON);
    });



    it("should make ajax GET request with spaces in Ideaboard Name on the URL",function(){
        //arrange
        var boardName = "Board Name with spaces";
        var boardId=1;
        spyOn($,'ajax');

        //act
        IdeaBoardz.WebIdeaBoardz.instance.getBoard(boardName, boardId );

        //assert
        expect(($.ajax).mostRecentCall.args[0].type).toEqual("GET");
        expect(($.ajax).mostRecentCall.args[0].url).toEqual(IdeaBoardz.WebIdeaBoardz.instance.domain+"/for/Board%20Name%20with%20spaces/1.json" );
    });

    it("should make ajax GET request with space and special characters in Ideaboard Name on the URL",function(){
        //arrange
        var boardName = "Funcky!!!! Style*** Board$$$ Name@@";
        var boardId=1;
        spyOn($,'ajax');

        //act
        IdeaBoardz.WebIdeaBoardz.instance.getBoard(boardName, boardId );

        //assert
        expect(($.ajax).mostRecentCall.args[0].type).toEqual("GET");
        expect(($.ajax).mostRecentCall.args[0].url).toEqual(IdeaBoardz.WebIdeaBoardz.instance.domain+"/for/Funcky!!!!%20Style***%20Board%24%24%24%20Name%40%40/1.json" );
    });

});