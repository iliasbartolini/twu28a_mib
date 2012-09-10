
describe("Web IdeaBoardz", function() {

    it("should make ajax POST request with message in URL", function(){
       spyOn($, 'ajax');
       IdeaBoardz.WebIdeaBoardz.instance.createIdea("some");

        expect(($.ajax).mostRecentCall.args[0].type).toEqual("POST");
        expect(($.ajax).mostRecentCall.args[0].url).toEqual(IdeaBoardz.WebIdeaBoardz.instance.domain + "/points.json?point[section_id]=1&point[message]=some");
    });

    it("should escape special symbols when creating URL",function(){
        spyOn($, 'ajax');
        IdeaBoardz.WebIdeaBoardz.instance.createIdea("lalala/&fjf! ??&");

        expect(($.ajax).mostRecentCall.args[0].type).toEqual("POST");
        expect(($.ajax).mostRecentCall.args[0].url).toEqual(IdeaBoardz.WebIdeaBoardz.instance.domain + "/points.json?point[section_id]=1&point[message]=lalala%2F%26fjf!%20%3F%3F%26");
    });


    it("should call ajax with error callback",function(){
        // arrange
        spyOn($, 'ajax').andCallFake(function(options) {
            options.error();
        });

        var callback = jasmine.createSpy();

        // act

        IdeaBoardz.WebIdeaBoardz.instance.createIdea("lalala/&fjf! ??&", {
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
        IdeaBoardz.WebIdeaBoardz.instance.createIdea("idea", {
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
        IdeaBoardz.WebIdeaBoardz.instance.createIdea("idea", {
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
    
    it("should collect all the Ideas in a board when getIdeas is called", function(){
        var fakeJSON=[{"created_at":"2012/08/31 15:38:51 +0000","updated_at":"2012/08/31 15:39:06 +0000",
                "section_id":4,"id":53874,"message":"work on multiple stories \n\nwork with claim status story",
                "votes_count":4} ,

            {"created_at":"2012/08/31 15:39:45 +0000",
                "updated_at":"2012/08/31 16:05:39 +0000","section_id":4,"id":53876,
                "message":"good communication wiht BO grooming is good","votes_count":3}]  ;



        spyOn($, 'ajax').andCallFake(function(options){
            options.success(fakeJSON);
        });

        var ideaCollection = IdeaBoardz.WebIdeaBoardz.instance.getIdeas(16);
        console.log("in Test For Ideas");
        console.log(ideaCollection);
        expect(ideaCollection.ideas[0].id).toBe(53874);
        expect(ideaCollection.ideas[1].id).toBe(53876);
        expect(ideaCollection.ideas.length).toBe(2);
    });

});