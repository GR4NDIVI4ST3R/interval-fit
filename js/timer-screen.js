//* APP-SCOPED GLOBALS
var endTimer = function () {};

function loadTimerScreen() {
    //* GLOBALS
    let time = ( 5 * 1000 ); //! Change to: let time = currentTimer.duration;
    let isCountingDown = false;
    // let hasEnded = false;
    let secInterval;
    const timeLabel = document.getElementById('timeLabel');
    timeLabel.innerHTML = formatMilliseconds(time);
    
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
                endTimer();
                //!nextTimer();
                //! App.changeScreen(currentTimer);
                App.changeScreen('add-routine-screen');
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

    //! function nextTimer() {
    //     let index = currentRoutine.timers[indexof(currentTimer)];
    //     if (index !== currentRoutine.timers.length - 1) {
    //         currentTimer = currentRoutine.timers[index + 1];
    //     } else {
    //         //! Routine has ended, what now?
    //     }
    // }
    endTimer = function () {
        pauseTimer();
        context.clearRect(0, 0, canvas.width, canvas.height);
        // hasEnded = true;
        canvas.removeEventListener('click', toggleTimer);
        // Change ${currentTimer} to the next timer in the routine
    }

    // When Screen Tapped or Clicked, toggle timer countdown
    canvas.addEventListener('click', toggleTimer);
    
    // Screen Resize
    // window.addEventListener('resize', function() {
    //     canvas.width = canvas.parentNode.offsetWidth;
    //     canvas.height = canvas.parentNode.offsetHeight;
        
    //     pauseTimer();
    //     Seconds = (hasEnded === false) ? new SecondsAnimation() : context.clearRect(0, 0, canvas.width, canvas.height);
    //     time = Math.ceil(time / 1000) * 1000; // Round up to nearest whole second
    // });
}