//* APP-SCOPED GLOBALS
var endTimer = function () {};

function loadTimerScreen() {
    //* GLOBALS
    let time = currentTimer.duration;
    let isCountingDown = false;
    // let hasEnded = false;
    let secInterval;
    const timeLabel = document.getElementById('timeLabel');
    timeLabel.innerHTML = formatMilliseconds(time);
    //TODO: Create and update the name of the timer when the timer is loaded using a span at the top of the screen

    //* ANIMATION OBJECTS
    class SecondsAnimation {
        constructor () {
            this.x = (canvas.width / 2);
            this.y = (canvas.height / 2);
            this.radius = (canvas.height < canvas.width) ? (canvas.height * ( 5 / 16 )) : (canvas.width * ( 5 / 16 ));
            this.thickness = 10;
            this.color = 'rgb(255, 255, 255, 0.95)';
            this.angle = (2 * Math.PI);
            this.increment = (2 * Math.PI) / 100;
    
            this.draw();
        }
    
        draw () {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, (-Math.PI / 2), ( (-Math.PI / 2) - this.angle ), true);
            context.lineWidth = this.thickness;
            context.strokeStyle = this.color;
            context.stroke();
        }
        update () {
            this.angle -= this.increment;
            if (this.angle <= 0) {
                this.angle += (2 * Math.PI);
            }
            context.clearRect(0, 0, canvas.width, canvas.height);
            this.draw();
        }    
    }
    
    //* TIMER AND ANIMATION FUNCTIONALITY
    // Starting and Stopping the Timer
    let Seconds = new SecondsAnimation();
    function startTimer () {
        secInterval = setInterval(function () {
            // Prevent the timer from counting below zero seconds
            if (time <= 0) {
                nextTimer();
            }
            else {
                time -= 10; // In milliseconds
                console.log('Time is counting down');
                timeLabel.innerHTML = formatMilliseconds(time);
                Seconds.update();
            }
    
        }, 10);
        isCountingDown = true;
    }
    function pauseTimer () {
        isCountingDown = false;
        clearInterval(secInterval);
    }
    function toggleTimer() {
        if (isCountingDown === false) {
            startTimer();
        }
        else {
            pauseTimer();
        }
    }

    function nextTimer() {
        let index = Array.from(currentRoutine.timers).indexOf(currentTimer);
        if (index !== currentRoutine.timers.length - 1) {
            currentTimer = currentRoutine.timers[index + 1];
            App.changeScreen('timer-screen');
            canvas.click();
        } else {
            endTimer();
            App.changeScreen('routine-screen');
        }
    }

    endTimer = function () {
        pauseTimer();
        context.clearRect(0, 0, canvas.width, canvas.height);
        // hasEnded = true;
        canvas.removeEventListener('click', toggleTimer);
        // Change ${currentTimer} to the next timer in the routine
    }

    // When Screen Tapped or Clicked, toggle timer countdown
    canvas.addEventListener('click', toggleTimer);
}