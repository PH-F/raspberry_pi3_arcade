var ready = false;
var audioElement = document.createElement('audio');
var audioElement2 = document.createElement('audio');

Number.prototype.between = function (a, b) {
    var min = Math.min(a, b),
        max = Math.max(a, b);

    return this >= min && this <= max;
};

/**
 * Wait for x seconds before calling the callback method.
 * @param time
 * @returns {Promise<any>}
 */
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * Get Current timestamp increment with X seconds
 * @param seconds
 * @returns {*}
 */
function getTimestamp(seconds) {
    return Math.floor(Date.now() / 1000) + (seconds);
}

function playAudio(file, repeat, meanwhile) {
    if (meanwhile) {
        audioElement2.setAttribute('src', file);
        audioElement2.play();
    } else {
        audioElement.setAttribute('src', file);
        audioElement.play();
        if (repeat) {
            audioElement.addEventListener('ended', function () {
                this.play();
            }, false);
        }
    }
}

function switchOn(pin) {

    $.post("/switchOn/" + pin, function (data) {
        ready = true;
        console.log(data);
    });
}

function switchOff(pin) {
    $.post("/switchOff/" + pin, function (data) {
        ready = true;
        console.log(data);
    });

}

function getPosition(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    drawCoordinates(x, y, true);
}

function getCurrentTimeStamp() {
    var date = new Date();
    return date.getTime();
}

/**
 * Main navigation.
 */
$(function () {
    $(document).keypress(function (e) {
        // console.log(e.which);
        if (e.which == 50) { //3
            location.href = '/'
        } else if (ready) {
            keyHandler(e.which)
        }
    });
});