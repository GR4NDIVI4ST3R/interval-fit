//* APP CONTROL OBJECT
// [const App] is Based on the Single Page Application tutorial by Steve Griffith: https://youtu.be/wlVmmsMD28w
const App = {
    screens: [],
    init: function () {
        // Add screens to App Object
        App.screens = document.querySelectorAll('.screen');

        // For each screen navigation button, add an event listener that calls the nav function
        document.querySelectorAll('.nav-btn').forEach((btn)=>{
            btn.addEventListener('click', App.nav);
        });
        document.querySelectorAll('.nav-anchor').forEach((link)=>{
            link.addEventListener('click', App.nav);
        });

        App.loadScript(document.querySelector('.active').id);
    },

    //* Navigate to a different screen according to the <a target=""> attribute of the nav button
    nav: function (e) {
        e.preventDefault(); // Prevent the link from opening the page in a new window
        
        let targetScreen = e.currentTarget.getAttribute('target'); // e.currentTarget is the <a href> element that the click event listener is attached to
        App.changeScreen(targetScreen);
    },

    // The following code is entirely my own

    //* Navigate to a different screen
    changeScreen: function (targetScreen) {        
        // Clear event listeners, call functions that stop screen functionality, reset variables, etc.
        clearTimerCards();
        clearRoutineCards();
        endTimer();

        // Then load the target screen
        document.querySelector('.active').classList.remove('active');
        document.getElementById(targetScreen).classList.add('active');
        App.loadScript(targetScreen);
        lastScreen = targetScreen;
    },
    
    loadScript: function (_screen) {
        switch (_screen) {
            case 'routine-screen':
                if (RoutineList.length < 1) {
                    document.getElementById('no-routines-alert').classList.remove('hidden');
                } else {
                    RoutineList.forEach( routine => createRoutineCard(routine.name, routine.timers.length) );
                    document.getElementById('no-routines-alert').classList.add('hidden');
                }
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
                    document.location.hash ='submit-routine-btn';
                }

                break;

            case 'add-timer-screen':
                break;

            case 'timer-screen':
                App.loadCanvas();
                loadTimerScreen();
                break;
        }
    },
    
    loadCanvas: function (_canvasId) {
        let screen = document.querySelector('.active');
        canvas = (typeof(_canvasId) === 'string') ? document.getElementById(_canvasId) : document.querySelector('canvas');
        canvas.width = screen.offsetWidth;
        canvas.height = screen.offsetHeight;
        context = canvas.getContext('2d');
    },
};
document.addEventListener('DOMContentLoaded', App.init);