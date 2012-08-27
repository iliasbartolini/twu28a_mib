$(document).ready( function(){

    $('#discardBtn').unbind("click").bind('click',function() {
        $('.alert').remove();
        $('.addStickyForm textarea').val("").animate( { height:"170px" }, { queue:false, duration:500 });
    });

    $('#submitBtn').unbind("click").bind('click', function() {
        addSuccessAlert();
        return false;
    });
});

function addSuccessAlert(){
    $('.alert').remove();
    $('.addStickyForm textarea').val("").animate( { height:"170px" }, { queue:false, duration:500 });
    $('<div class="alert success">Your idea has been posted</div>').insertBefore('.addStickyForm');
}