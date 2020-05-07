/*
'general-library.js' by Xavior Pautin
This is a work in progress with the hope that it may make my life easier.
If you have suggestions, shoot me a message or request on GitHub.
*/

//* General Functions
function randomFloat(min, max) {
    // num = random decimal * domain + shift to left or right
    num = Math.random() * (max - min) + min;
    return num;
}
function randomInt(min, max) {
    num = Math.floor(Math.random() * (max - min + 1) + min);
    return num;
}

function isEmpty(_string) {
    if (_string.trim().length === 0) {
        return true;
    }
    else {
        return false;
    }
}

//* Regex
const Regex = {
    pass: /[a-z A-Z 0-9 ? ! @ # % / * + = \( \) \^ \$ \& \-]/g,
    passMin: /[a-z A-Z 0-9 ? ! @ # % / * + = \( \) \^ \$ \& \-] {6,}$ /g,
    label: /[a-z A-Z 0-9 ? ! @ # / % \$ \& \+ \-]/g,
}

//* node.js
// function consoleUpdate(_message){
//     process.stdout.clearLine();
//     process.stdout.cursorTo(0);
//     process.stdout.write(_message);
// }

//* Time Processing Functions
function formatSeconds (_seconds) {
    let mins = Math.floor(_seconds / 60);
    let secs = _seconds % 60;
    let formattedTime = `${mins}:${secs}`;
    if (mins === 0) {
        formattedTime = `${secs}`;
    }
    if (secs < 10) {
        // ${pos} is the index of ${formattedTime} that I want to insert a '0'
        let pos = formattedTime.length - 1;
        formattedTime = `${formattedTime.slice(0, pos)}0${formattedTime.slice(pos)}`;
    }
    return formattedTime;
}

function formatMilliseconds (_milliseconds) {
    let _seconds = Math.ceil(_milliseconds / 1000);
    let mins = Math.floor(_seconds / 60);
    let secs = _seconds % 60;
    let formattedTime = `${mins}:${secs}`;
    if (mins === 0) {
        formattedTime = `${secs}`;
    }
    if (secs < 10) {
        // ${pos} is the index of ${formattedTime} that I want to insert a '0'
        let pos = formattedTime.length - 1;
        formattedTime = `${formattedTime.slice(0, pos)}0${formattedTime.slice(pos)}`;
    }
    return formattedTime;
}