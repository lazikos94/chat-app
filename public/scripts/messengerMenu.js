$(function()
{
    $('.menuToggle').on('click', function()
    {
        $('.menu').slideToggle(300, function()
        {
            if($(this).css('display') === 'none')
            {
                $(this).removeAttr('style');
            }
        });
    });
});


$(function()
{
    $( "sendbtn" ).click(function() {
        $("chat_history").html('<button id="boundOnPageLoaded">Click Me</button>');
    });
});