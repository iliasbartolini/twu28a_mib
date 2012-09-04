
describe("Web IdeaBoardz", function() {

    it("should make ajax POST request with message in URL", function(){
       spyOn($, 'ajax');
       IdeaBoardz.WebIdeaBoardz.instance.createIdea("some");

        expect(($.ajax).mostRecentCall.args[0].type).toEqual("POST");
        expect(($.ajax).mostRecentCall.args[0].url).toEqual(IdeaBoardz.WebIdeaBoardz.instance.domain + "/points.json?point[section_id]=20&point[message]=some");
    });

    it("should escape special symbols when creating URL",function(){
        spyOn($, 'ajax');
        IdeaBoardz.WebIdeaBoardz.instance.createIdea("lalala/&fjf! ??&");

        expect(($.ajax).mostRecentCall.args[0].type).toEqual("POST");
        expect(($.ajax).mostRecentCall.args[0].url).toEqual(IdeaBoardz.WebIdeaBoardz.instance.domain + "/points.json?point[section_id]=20&point[message]=lalala%2F%26fjf!%20%3F%3F%26");
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

    it("should create new BoardModel when getBoard is called", function(){
        var fakeJSON={
            "name":"mibimmmm",
            "id":16,
            "description":"blah",
            "sections":[{"name":"What went well","id":33},{"name":"What can be improved","id":34},{"name":"Action Items","id":35}]
        }

        spyOn($, 'ajax').andCallFake(function(options){
            options.success(fakeJSON);
        });

        var board= IdeaBoardz.WebIdeaBoardz.instance.getBoard("mibimmmm", 16);

        expect(board.name).toBe("mibimmmm");
        expect(board.id).toBe(16);
    });

});