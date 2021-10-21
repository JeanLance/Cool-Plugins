$(document).ready(function(){
            
    for (var i = 01; i <= 30; i++) {            // Plugin For Card Flipper
        $("#card"+i+"").flip();
    }

    var clickIdentifier = false;                // Run Conditions If True And Disable Click Method If False. Used To Identify If How Many Cards Are Flipepd. Becomes False If Two Cards Are Flipped
    var turnIdentifier = true;                  // Idetifier Of Which Flipped Cards Turn (1st Or 2nd)
    var firstImage = "";                        // First Card's Image
    var firstId = "";                           // Id of First Card Selected
    var secondImage = "";                       // Second Card's Image
    var secondId = "";                          // Id of Second Card Selected
    var flipStart;                              // Start The Function Of Flipping Unmatched Card
    var flipTimer = 0;                          // Counter Before Flipping The Unmatched Card
    var flipAll = "";
    var flipAllTimer = 0;

    var counter = 0;
    var curPer = 'p0';
    $('.card-wrapper').click(function(){
        if (clickIdentifier == true) {
            if (turnIdentifier == true) {
                firstImage = ($(this).children('.back').children().attr('src'));
                firstId = $(this).attr('id');
                turnIdentifier = false;
            }
            else {
                secondImage = ($(this).children('.back').children().attr('src'));
                secondId = $(this).attr('id');
                if (firstImage != secondImage) {
                    console.log("Not Equal");
                    flipStart = setInterval(flipIfNotSame, 1000);
                    firstImage = "";
                    secondImage = "";
                    clickIdentifier = false;
                    $('.overlay').css("display", "block");                  // Display An Overlay To Disable User To Flip Cards When There's Still Flipped Cards
                }
                else {
                    console.log("Equal!");
                    counter += 10;                                          // Add Score
                    firstImage = "";
                    secondImage = "";
                    $('#'+firstId).off();                                   // Remove Event Listener When Cards Matched
                    $('#'+secondId).off();                                  // Remove Event Listener When Cards Matched
                    $('.overlay').css("display", "none");                   // Hide Overlay
                }
                turnIdentifier = true;
                
                /* Score/Progress of Game */
                
                if (counter < 110) {
                    var perc = "p"+counter;

                    if (counter > 50) {
                        $('#score-circle').addClass('over50');
                        console.log("been HERE");
                    }
                    
                    $('#score-circle').removeClass(curPer);
                    $('#score-circle').addClass(perc);
                    $('#score').text(counter+'%');
                    curPer = perc;
                }
                else {
                    return false;
                }
            }
        }
        else {
            return false;
        }
    });
    
    function flipIfNotSame() { // Flip The Cards If Not The Same
        flipTimer++;
        if (flipTimer == 1) {
            $('.overlay').css("display", "none");
            $('#'+firstId).click();
            $('#'+secondId).click();
            clickIdentifier = true;
            flipTimer = 0;
            clearInterval(flipStart);
        }
    }

    $('#startButton').click(function(){
        $(this).parent().toggle();
        $('.card-wrapper').click();
        $('.overlay').css("display", "block");
        flipAll = setInterval(flipAllCard, 1000);
        
    })

    function flipAllCard() {
        flipAllTimer++;
        if (flipAllTimer == 2) {
            $('.card-wrapper').click();
            clearInterval(flipAll);
            $('.overlay').css("display", "none");
            clickIdentifier = true; // Start the Game!
        }
    }
});