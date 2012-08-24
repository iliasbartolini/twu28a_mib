$(document).bind('pageinit', function(){

    $('#discardBtn').unbind("click").bind('click',function() {
        $('.alert').remove();
        $('.addStickyForm textarea').val("").animate( { height:"170px" }, { queue:false, duration:500 });
    });

    $('#submitBtn').unbind("click").bind('click', function() {
        if ($(".alert").length > 0){
            $(".alert").fadeOut( function() {
                addSuccessAlert();
            });
        } else {
            addSuccessAlert();
        }
        return false;
    });

    $('#sectionBoard').bind('pageshow',function(event) {
        $('.sectionBox a').unbind("click").bind('click', function() {
            $('#sectionName').text($(this).text());
        });
    });
});

function addSuccessAlert(){
    $('.addStickyForm textarea').val("").animate( { height:"170px" }, { queue:false, duration:500 });
    $('.alert').remove();
    $('<div class="alert success">Your idea has been posted</div>').hide().insertBefore('.addStickyForm');
    $('.alert').fadeIn();
}