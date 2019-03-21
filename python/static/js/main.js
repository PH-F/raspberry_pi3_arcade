var question_show_seconds = 15;


var timeout = question_show_seconds * 100;
var current = 0;
var currentTime;
var gameEndTime;
var correct = 0;
var wrong = 0;
var missed = 0;
var ready = false;
var questions;
var timer;
var inactiveTimer;
var question_mode = true;
var question_nr = 1;
var answers;
var currentAnswer = 0;
var page = "";
var audioElement = document.createElement('audio');
var audioElement2 = document.createElement('audio');

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
    return Math.floor(Date.now() / 1000) + (seconds);
}

function playAudio(file, repeat, meanwhile) {
    if(meanwhile) {
        audioElement2.setAttribute('src', file);
        audioElement2.play();
    }else {
        audioElement.setAttribute('src', file);
        audioElement.play();
        if (repeat) {
            audioElement.addEventListener('ended', function () {
                this.play();
            }, false);
        }
    }
}

/**
 * Start the game by clicking the highlighted ky.
 */
function start(page) {
    if(page == "quiz"){

    }
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
    return Math.floor(correct * (100 / total));
}

/**
 * Calculate the gameTotal
 * @returns {number}
 */
function calculateTotal() {
    let total = correct; // - wrong - missed;
    return total;
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

/**
 * recursive function that runs until time's up.
 * It blinks the lights random.
 */
function gameBlink() {

    answers[currentAnswer] = 0;
	$('#sec_left').text( gameEndTime - getTimestamp(0) );
    
    // console.clear();
    sleep(timeout).then(() => {
        current = rand();

        //color screen buttons
        $('.btnoff').show();
        $('.btnon').hide();
        $('#r' + current + ' .btnoff').hide();
        $('#r' + current + ' .btnon').show();

        $.post("/blink/" + current, function (data) {
            if (ready) {
                $('#missed').text(++missed);
            }
            ready = true;
            console.log(current);
        });
        if (getTimestamp(0) < gameEndTime) {
            currentAnswer++;
            gameBlink();
        } else {

            correct = 0;
            answers.forEach(function(val){
                correct = correct + val;
            });

            location.href = 'game_result/' + calculateTotal();
        }
    });
}

/**
 * Load the questions Json and display the 1st question.
 */
function runQuiz() {

    $.getJSON("../static/json/questions.json", function (json) {
        questions = json;
        question();
    });

}

/**
 * Initialize the progressbar and run this with for 24 sec 24000 ms (240 * 100)
 */
function progress_step() {
    var elem = document.getElementById("bar");
    var width = 1;
    timer = setInterval(step, question_show_seconds * 10);

    /**
     * step for each percentage, if 100% is reached clear the timer
     * and go to the answer=wrong view.
     */
    function step() {
        if (width >= 100) {
            clearInterval(timer);
            //timeout, answer => wrong!
            answer_wrong();
            question_mode = false;

        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}

/**
 * Display the question with answer options and call the progressbar
 */
function question() {

    clearTimeout(inactiveTimer);
    switchOff(4);
    switchOff(17);
    switchOff(27);
    switchOff(22);

    $('#bar').css('width','1%');
    $('#question_container').removeClass('hidden');
    $('#progress').removeClass('hidden');
    $('#correct').addClass('hidden');
    $('#wrong').addClass('hidden');
    $('#continue').addClass('hidden');

    $('#question').html(questions['q' + question_nr][0].question);
    $('.correct').html(questions['q' + question_nr][0].correct);
    $('.wrong').html(questions['q' + question_nr][0].wrong);

    current = questions['q' + question_nr][0].answer;

    $('#question_nr').html('vraag ' + question_nr);

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if(questions['q' + question_nr][0].options[j] == '') {
                $('#question_options li:eq(' + j + ')').hide();
            }else{
                $('#question_options li:eq(' + j + ')').show();
            }
            $('#question_options li:eq(' + j + ') span').text(questions['q' + question_nr][0].options[j]);
        }
    }

    progress_step();
}

/**
 * Display the answer=wrong container
 */
function answer_wrong() {
    playAudio('../static/audio/fout-invader.wav', false, true);

    wrong++;
    question_nr++;
    $('#question_container').addClass('hidden');
    $('#progress').addClass('hidden');
    $('#wrong').removeClass('hidden');
    $('#continue').removeClass('hidden');
}

/**
 * Display the answer=correct container
 */
function answer_correct() {
    playAudio('../static/audio/goed-invader.wav', false, true);

    correct++;
    question_nr++;
    $('#question_container').addClass('hidden');
    $('#progress').addClass('hidden');
    $('#correct').removeClass('hidden');
    $('#continue').removeClass('hidden');
}

/**
 * Implement what happens whn you press a key on the quiz page when the quis is active.
 * @param keyCode
 */
function questionKeyHandler (keyCode) {
    if (question_mode) {

        //stop progressbar
        clearInterval(timer);
        question_mode = false;
        inactiveTimer = setTimeout(function(){ self.location.href = '/'; }, 60000);

        switchOff(4);
        switchOff(17);
        switchOff(27);
        switchOff(22);

        if (current == translatekey(keyCode)) {
            answer_correct()
        } else {
            answer_wrong()
        }

    } else {

        switchOn(4);
        switchOn(17);
        switchOn(27);
        switchOn(22);

        if (question_nr > 6) {
            location.href = 'quiz_result/' + calculateScore();
        } else {
            question_mode = true;
            question();
        }

    }
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

    if(page=="") {
        //After 90 sec always return to index!
        sleep(120000).then(() => {
            location.href = '/'
        });
    }

    $(document).keypress(function (e) {
        console.log(e.which);
        if (e.which == 50) { //3
            location.href = '/quiz'
        } else if (ready) {
            keyHandler(e.which)
        }
    });
});
