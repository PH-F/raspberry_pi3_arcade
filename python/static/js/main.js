var timeout = 1000;
var current = 0;
var correct = 0;
var wrong = 0;
var missed = 0;
var ready = false;

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
function rand () {
    var val;
    min = 1;
    max = 4;
    val = Math.floor(Math.random() * (max - min + 1) + min);
    return val == current ? rand() : val;
}

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

        $.post( "/switchOn/" + current, function( data ) {
            if(ready){
                $('#missed').text(++missed);
            }
            ready = true;
            console.log(current);
        });
        change();
    });
}

function translatekey(key) {
    switch(key) {
        case 113: return 1; break;
        case 119: return 2; break;
        case 101: return 3; break;
        case 114: return 4; break;
    }
}

$(function() {
    $(document).keypress(function (e) {
        if (e.which == 49) { //1
            location.href = '/game'
        } else if (e.which == 50) { //2\
            location.href = '/movie'
        } else if (e.which == 51) { //2
            location.href = '/quiz'
        } else if (ready) {
            keyHandler(e.which)
        }
    });
}