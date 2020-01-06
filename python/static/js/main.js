// Configuarable
var coordinates = ["102,51", "462,54", "99,382", "464,384"];
var margin = 20;
var pointSize = 20;
var inActiveSeconds = 120;


// Private
var mousePos;
var timer;
var timestamp = 0;
var inactiveTimer;
var correct = [];
var inactiveTime = (inActiveSeconds * 1000);

/**
 * Translate a key-char to an application number
 * @param key int
 * @returns {number}
 */
function translatekey(key) {
    switch (key) {
        case 115: /*s*/
            return 1;
            break;
        case 114: /*r*/
            return 4;
            break;
    }
}

function drawCoordinates(x, y, enableMonitor) {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.fillStyle = "#ff2626"; // Red color

    if (enableMonitor) {
        monitor(x, y);
    }

    ctx.beginPath();
    ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
    ctx.fill();
}

function monitor(x, y) {

    coordinates.forEach(function (coordinate, index) {
        var xy = coordinate.split(",");
        if (parseInt(xy[0]).between(x - margin, x + margin) && parseInt(xy[1]).between(y - margin, y + margin)) {
            if (!correct.includes(index)) {
                correct.push(index);
            }
        }
    });

}

function clear() {
    var canvasTemp = document.getElementById("canvas").getContext("2d");
    canvasTemp.clearRect(0, 0, 690, 651);
}

function verify() {
    clearInterval(inactiveTimer);
    clear();
    correct.forEach(function (item) {
        xy = coordinates[item].split(",");
        drawCoordinates(parseInt(xy[0]), parseInt(xy[1]), false);
    });

    if (coordinates.length == correct.length) {
        playAudio('../static/audio/ok.wav', false, false);
        setTimeout(function () {
            location.href = '/result'
        }, 1000);
    } else {
        playAudio('../static/audio/wrong.wav', false, false);
        inactiveTimer = setTimeout(function () {
            self.location.href = '/';
        }, inactiveTime);
    }

}

function answer() {

    // forEach does not have a break. Use Array#some.
    // This works because some returns true as soon as any of the callbacks, executed in array order, return true,
    // short-circuiting the execution of the rest. Some, its inverse every (which will stop on a return false), and
    // forEach are all ECMAScript Fifth Edition methods which will need to be added to the Array.prototype on browsers
    // where they're missing. ``` [1, 2, 3].some(function(el) {console.log(el);return el === 2;}); ```

    var newTimestamp = getCurrentTimeStamp();
    console.log((timestamp - newTimestamp));
    if (timestamp > 0 && (newTimestamp - timestamp) < 500) {
        self.location.href = '/';
        return;
    } else {
        coordinates.some(function (item, index) {
            if (!correct.includes(index)) {
                correct.push(index);
                return true;
            }
        });

        timestamp = newTimestamp;
    }

}