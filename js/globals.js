//* ELEMENTS
const routineNameInput = document.getElementById('routine-name-input');
const nameRoutineBtn = document.getElementById('name-routine-btn');
const submitRoutineBtn = document.getElementById('submit-routine-btn');

const timerNameInput = document.getElementById('timer-name-input');
const addTimerBtn = document.getElementById('add-timer-btn');
const submitTimerBtn = document.getElementById('submit-timer-btn');

const timerCardsContainer = document.getElementById('timer-cards-container');
const routineCardsContainer = document.getElementById('routine-cards-container');

//* VARIABLES
var lastScreen = 'home-screen';
var currentRoutine = new Routine('__EMPTY__');
var currentTimer = {};

var canvas;
var context;

//* OBJECTS
const RoutineList = [/* Routine Objects Go Here*/];
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