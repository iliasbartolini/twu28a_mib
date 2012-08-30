
describe("Web IdeaBoardz", function() {

    it("should make ajax POST request with message in URL", function(){
       spyOn($, 'ajax');
       IdeaBoardz.WebIdeaBoardz.instance.createIdea("some");

        expect(($.ajax).mostRecentCall.args[0].type).toEqual("POST");
        expect(($.ajax).mostRecentCall.args[0].url).toEqual("http://10.10.15.130:3000/points.json?point[section_id]=2&point[message]=some");
    });

    it("should escape special symbols when creating URL",function(){
        spyOn($, 'ajax');
        IdeaBoardz.WebIdeaBoardz.instance.createIdea("lalala/&fjf! ??&");

        expect(($.ajax).mostRecentCall.args[0].type).toEqual("POST");
        expect(($.ajax).mostRecentCall.args[0].url).toEqual("http://10.10.15.130:3000/points.json?point[section_id]=2&point[message]=lalala%2F%26fjf!%20%3F%3F%26");
    });

    it("should call ajax with error function",function(){
        spyOn($, 'ajax').andCallFake(function(options){

        });


    });

});