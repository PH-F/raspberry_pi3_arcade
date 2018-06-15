var timeout = 1000;
var current = 0;
var currentTime;
var gameEndTime;
var correct = 0;
var wrong = 0;
var missed = 0;
var ready = false;

/**
 * Wait for x seconds before calling the callback method.
 * @param time
 * @returns {Promise<any>}
 */
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * Give a random number between 1 and 4
 * @returns {number}
 */
function rand () {
    let min = 1;
    let max = 4;
    let val = Math.floor(Math.random() * (max - min + 1) + min);
    return val == current ? rand() : val;
}

/**
 * Get Current timestamp increment with X seconds
 * @param seconds
 * @returns {*}
 */
function getTimestamp(seconds) {
    return Math.floor(Date.now() / 1000) + (seconds)
}

/**
 * Start the game by clicking the highlighted ky.
 */
function startGame() {
    // current = rand();
    // $.post( "/switchOn/" + current);
    switchOn();
}

/**
 * Animate the 4 button 1, 12, 123, 1234, 234 ,34 ,4, loop
 */
function animation1() {
    $.post( "/switchOn/1");
    sleep(timeout).then(() => {
        $.post("/switchOn/2");
        sleep(timeout).then(() => {
            $.post("/switchOn/3");
            sleep(timeout).then(() => {
                $.post("/switchOn/4");
                sleep(timeout).then(() => {
                    //---------------------
                    $.post( "/switchOff/1");
                    sleep(timeout).then(() => {
                        $.post("/switchOff/2");
                        sleep(timeout).then(() => {
                            $.post("/switchOff/3");
                            sleep(timeout).then(() => {
                                $.post("/switchOff/4");
                                sleep(timeout).then(() => {
                                    animate();
                                });
                            });
                        });
                    });
                    //---------------------
                });
            });
        });
    });
}
/**
 * Calculate the gamescode
 * @returns {number}
 */
function calculateScore() {
    let total = correct + wrong + missed;
    let incorrect = wrong + missed;
    return Math.floor(100 / ( total / incorrect ));
}

/**
 * recursive function that runs until time's up.
 * It blinks the lights random.
 */
function gameBlink() {
    console.clear();
    sleep(timeout).then(() => {
        current = rand();

        //temp
        $('#r1').html('&#9786;');
        $('#r2').html('&#9786;');
        $('#r3').html('&#9786;');
        $('#r4').html('&#9786;');
        $('#r'+current).html('&#9787;');
        //temp

        $.post( "/blink/" + current, function( data ) {
            if(ready){
                $('#missed').text(++missed);
            }
            ready = true;
            console.log(current);
        });
        if(getTimestamp() < gameEndTime) {
            gameBlink();
        } else {
            location.href = 'game_result/' + calculateScore();
        }
    });
}

/**
 * Translate a key-char to an application number
 * @param key int
 * @returns {number}
 */
function translatekey(key) {
    switch(key) {
        case 113: return 1; break;
        case 119: return 2; break;
        case 101: return 3; break;
        case 114: return 4; break;
    }
}


/**
 * Main navigation.
 */
$(function() {
    $(document).keypress(function (e) {
        if (e.which == 49) { //1
            location.href = '/game'
        } else if (e.which == 50) { //2
            location.href = '/movie'
        } else if (e.which == 51) { //3
            location.href = '/quiz'
        } else if (ready) {
            keyHandler(e.which)
        }
    });
});
