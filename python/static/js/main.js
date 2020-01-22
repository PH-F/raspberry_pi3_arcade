// Configuarable
var margin = 30;
var inActiveSeconds = 120;

// Private
var inactiveTimer;
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

function v(id, def) {
    val = document.getElementById('code1').value;
    if(val == '') {
        val = def;
    }
    return val;
}

function addCode(code) {
    console.log(code);
    if (v('code1','') == '') {
        document.getElementById('code1').value = code;
    } else if (v('code2','') == '') {
        document.getElementById('code2').value = code;
    } else if (v('code3','') == '') {
        document.getElementById('code3').value = code;
    } else {
        //
    }

}

function goNext(code) {
    if (code == 2) {
        if (v('code1','') != '') {
            document.getElementById('code2').focus();
        }
    }
    if (code == 3) {
        if (v('code2','') != '') {
            document.getElementById('code3').focus();
        }
    }
    if (code == 4) {
        location.href = '/game/' + v('code1','9') + '/' + v('code2','9') + '/' + v('code1','9');
    }
}