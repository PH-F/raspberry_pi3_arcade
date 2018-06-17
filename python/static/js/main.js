var timeout = 1000;
var quiz_timeout = 25000;
var current = 0;
var currentTime;
var gameEndTime;
var correct = 0;
var wrong = 0;
var missed = 0;
var ready = false;
var questions;
var timer;
var question_mode = true;
var question_nr = 1;

/**
 * Wait for x seconds before calling the callback method.
 * @param time
 * @returns {Promise<any>}
 */
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * Give a random number between 1 and 4
 * @returns {number}
 */
function rand() {
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
function start() {
    // current = rand();
    // $.post( "/switchOn/" + current);
    animation1();
}

/**
 * Animate the 4 button 1, 2, 3, 4, 3 ,2 ,1, loop
 */
function animation1() {

    animationTime = 3500;

    $.post("/animation1");
    sleep(animationTime).then(() => {
        animation2();
    });
}

/**
 * Animate the 4 button 1234, ----, 1234 ----
 */
function animation2() {

    animationTime = 2000;

    $.post("/animation1");
    sleep(animationTime).then(() => {
        animation1();
    });
}

/**
 * Calculate the quizScore
 * @returns {number}
 */
function calculateScore() {
    let total = correct + wrong + missed;
    let incorrect = wrong + missed;
    return Math.floor(100 / (total / incorrect));
}

/**
 * Calculate the gameTotal
 * @returns {number}
 */
function calculateTotal() {
    let total = correct - wrong - missed;
    return total;
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
        $('#r' + current).html('&#9787;');
        //temp

        $.post("/blink/" + current, function (data) {
            if (ready) {
                $('#missed').text(++missed);
            }
            ready = true;
            console.log(current);
        });
        if (getTimestamp() < gameEndTime) {
            gameBlink();
        } else {
            location.href = 'game_result/' + calculateTotal();
        }
    });
}

function runQuiz() {

    $.getJSON("../static/json/questions.json", function (json) {
        questions = json;
        question();
    });

}

function progress_step() {
    var elem = document.getElementById("bar");
    var width = 1;
    timer = setInterval(frame, 240);
    function frame() {
        if (width >= 100) {
            clearInterval(timer);
            //timeout, answer => wrong!
            answer_wrong()

        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}

function question() {

    $('#bar').css('width','1%');
    $('#question_container').removeClass('hidden');
    $('#progress').removeClass('hidden');

    $('#correct').addClass('hidden');
    $('#wrong').addClass('hidden');
    $('#continue').addClass('hidden');

    progress_step();

    current = questions['q' + question_nr][0].answer;

    $('#question').html(questions['q' + question_nr][0].question);
    $('.answerr').html(questions['q' + question_nr][0].answer);
    $('.correct').html(questions['q' + question_nr][0].correct);
    $('.wrong').html(questions['q' + question_nr][0].wrong);

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            $('#question_options li:eq(' + j + ') span').text(questions['q' + question_nr][0].options[j]);
        }
    }
}

function answer_wrong() {
    wrong++;
    $('#question_container').addClass('hidden');
    $('#progress').addClass('hidden');
    $('#wrong').removeClass('hidden');
    $('#continue').removeClass('hidden');

    question_nr++;
}

function answer_correct() {
    correct++;
    $('#question_container').addClass('hidden');
    $('#progress').addClass('hidden');
    $('#correct').removeClass('hidden');
    $('#continue').removeClass('hidden');

    question_nr++;
}

function answer(question) {
    //if correct..
    //display correct block
    //else
    //display error block

    //on keypress... question++
}

/**
 * Translate a key-char to an application number
 * @param key int
 * @returns {number}
 */
function translatekey(key) {
    switch (key) {
        case 113:
            return 1;
            break;
        case 119:
            return 2;
            break;
        case 101:
            return 3;
            break;
        case 114:
            return 4;
            break;
    }
}


/**
 * Main navigation.
 */
$(function () {
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
