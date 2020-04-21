//* NICE TO HAVES:
// TODO: Expanding pause icon animation (from center screen, low opacity, high speed animation, activates when timer paused)
// TODO: When app switches to the timer screen, count 'timeLabel' up from zero and reverse sand animation as if it were filling up
// TODO: Make a Settings icon that links to ./settings-screen
// TODO: Sand Animation!

//* GLOBALS
// HTML ELEMENTS
const routineNameInput = document.getElementById('routine-name-input');
const submitRoutineBtn = document.getElementById('submit-routine-btn');
var canvas;
var context;

// VARIABLES/OBJECTS
var currentRoutine;
var currentTimer;

const RoutineList = [/* Routine Objects */];
function Routine(_name) {
    this.name = _name;
    this.timers = [];
}

// Routine.timers is where the Timer objects are stored
function Timer() {
    this.duration; // User inputs this
    this.name; // Exercise name to put on screen
    this.type; // Exercise Timer | Stretch Timer | Rest Timer
}

// FUNCTIONS
function nameUsed(_list, _name) {
    let result;
    _list.forEach( element => {if (element.name == _name) result = true} );
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
        
        console.log(targetScreen);
        // history.pushState({}, targetScreen, `#${targetScreen}`);
        // document.getElementById(targetScreen).dispatchEvent(app.show);
    },
    unload: function () {
        document.querySelector('.active').classList.remove('active');
        
        //! Clear event listeners, call functions that stop screen functionality, reset variables, etc.
        endTimer(); // Unload timer-screen
    },
    loadScript: function (_screen) {
        switch (_screen) {
          case 'home-screen':

              break;
          case 'add-routine-screen':

              break;
          case 'timer-screen':
              App.loadCanvas();
              loadTimerScreen();
              console.log('timer-screen loaded')
              break;
        }
    },
    
    loadCanvas: function (_canvasId) {
        let screen = document.querySelector('.active');
        console.log(screen);
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