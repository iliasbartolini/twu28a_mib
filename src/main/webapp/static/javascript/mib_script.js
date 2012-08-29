$(document).ready( function(){
    $('#submitBtn').click(function(){
        var ideaText = $('#ideaText').val();
        createIdea(ideaText);
        return false;
    });
});


function createIdea(message) {
    if(message=="")
        return null;

    var jsonObj; // code smells: multiple assignment
    var requestUrl= "http://10.10.15.130:3000/points.json?point[section_id]=2&point[message]=" + message ;

    $.ajax({
        type: 'POST',
        url: requestUrl,
        sync: true,
        complete: function(xhr, status){
            console.log(xhr);
            jsonObj=eval('(' +  xhr.getResponseHeader("Location") + ')');
        }
    });

    return {
        message: message
    };
};

