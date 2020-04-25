//* NICE TO HAVES:
// TODO: Expanding pause icon animation (from center screen, low opacity, high speed animation, activates when timer paused)
// TODO: When app switches to the timer screen, count 'timeLabel' up from zero and reverse sand animation as if it were filling up
// TODO: Make a Settings icon that links to ./settings-screen
// TODO: Sand Animation!
// TODO: If currentRoutine isn't reset, then allow user to go back to where they left off
// TODO: Make Montserrat offline by linking it as an included css file

//* GLOBALS
// HTML ELEMENTS
const routineNameInput = document.getElementById('routine-name-input');
const submitRoutineBtn = document.getElementById('submit-routine-btn');
const finishRoutineBtn = document.getElementById('finish-routine-btn');

const timerNameInput = document.getElementById('timer-name-input');
const addTimerBtn = document.getElementById('add-timer-btn');
const submitTimerBtn = document.getElementById('submit-timer-btn');

const timerCardsContainer = document.getElementById('timer-cards-container');

var canvas;
var context;

// VARIABLES/OBJECTS
var lastScreen = 'home-screen';
var currentRoutine = new Routine('__EMPTY__');
var currentTimer = {};

const RoutineList = [/* Routine Objects */];
function Routine(_name) {
    this.name = _name;
    this.timers = [];
}

// Routine.timers is where the Timer objects are stored
function Timer(_name, _duration, _type) {
    this.name = _name; // Exercise name to put on screen
    this.duration = _duration;
    this.type = _type; // Exercise Timer | Stretch Timer | Rest Timer
}

// FUNCTIONS
function nameUsed(_array, _name) {
    let result;
    _array.forEach( element => {if (element.name == _name) result = true} );
    return result;
}

//* APP CONTROL OBJECT
const App = {
    screens: [],
    init: function () {
        // Add screens to App Object
        App.screens = document.querySelectorAll('.screen');

        // For each screen navigation button, add an event listener that calls the nav function
        document.querySelectorAll('.nav-btn').forEach((btn)=>{
            btn.addEventListener('click', App.nav);
        });
        document.querySelectorAll('.nav-hyperlink').forEach((link)=>{
            link.addEventListener('click', App.nav);
        });

        submitRoutineBtn.addEventListener('click', () => addRoutine());
        submitTimerBtn.addEventListener('click', () => addTimer());
        finishRoutineBtn.addEventListener('click', () => finishRoutine());

        App.loadScript(document.querySelector('.active').id);
    },

    // Navigate to the next screen according to the <a target=""> attribute of the nav button
    nav: function (e) {
        e.preventDefault(); // Prevent the link from opening the page in a new window
        
        let targetScreen = e.currentTarget.getAttribute('target'); // e.currentTarget is the <a href> element that the click event listener is attached to
        App.changeScreen(targetScreen);
    },
    // Navigate to another screen
    changeScreen: function (targetScreen) {        
        // Unload all screens
        App.unload();

        // Then load the target screen
        document.getElementById(targetScreen).classList.add('active');
        App.loadScript(targetScreen);
        lastScreen = targetScreen;
        
        // history.pushState({}, targetScreen, `#${targetScreen}`);
        // document.getElementById(targetScreen).dispatchEvent(app.show);
    },
    unload: function () {
        document.querySelector('.active').classList.remove('active');
        
        //! Clear event listeners, call functions that stop screen functionality, reset variables, etc.
        clearTimerCards();
        //! clearRoutineCards();

        endTimer(); // Unload timer-screen
    },
    loadScript: function (_screen) {
        switch (_screen) {
            case 'home-screen':
                break;

            case 'add-routine-screen':
                // Detect if there are no timers, then show the no-timers-alert accordingly
                if (currentRoutine.timers.length < 1) {
                    document.getElementById('no-timers-alert').classList.remove('hidden');
                } else {
                    currentRoutine.timers.forEach( timer => createTimerCard(timer.name, timer.duration, timer.type) );
                    document.getElementById('no-timers-alert').classList.add('hidden');
                }
                if (_screen != lastScreen) {
                    document.location.hash = '';
                    document.location.hash ='finish-routine-btn';
                }

                break;

            case 'add-timer-screen':
                break;

            case 'timer-screen':
                App.loadCanvas();
                loadTimerScreen();
                break;
                //! Update to include other screens
        }
    },
    
    loadCanvas: function (_canvasId) {
        let screen = document.querySelector('.active');
        canvas = (typeof(_canvasId) === 'string') ? document.getElementById(_canvasId) : document.querySelector('canvas');
        canvas.width = screen.offsetWidth;
        canvas.height = screen.offsetHeight;
        context = canvas.getContext('2d');
    },
    //TODO: Unload function that clears all of the even listeners of the previous screen
    //* REFERENCE
    //window.removeEventListener();
    /*<html>
    <body>

    <ul id='myList1'><li>Coffee</li><li>Tea</li></ul>

    <p></p>

    <button onclick='myFunction()'>Try it</button>
    <button onclick='f()'>f it</button>

    <script>
    var itm;
    var cln;
    function myFunction() {
    itm = document.getElementById('myList1');
    cln = itm.cloneNode(true);
    itm.addEventListener('click', e => {
        document.querySelector('p').innerHTML += ' !';
    });

    }
    function f() {
    itm.parentNode.replaceChild(cln, itm);
    }
    </script>

    </body>
    </html>
    */
};

document.addEventListener('DOMContentLoaded', App.init);