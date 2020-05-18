//* GENERAL FUNCTIONS / LOW-LEVEL ABSTRACTIONS
function hasValidCharacters(_input) {
    // Regex.label = /[a-z A-Z 0-9 ? ! @ # / \$ \& \+ \-]/g;
    if ( isEmpty(_input.replace(Regex.label, "")) ) { // "replace()" does not change the string it is called on. It returns a new string.
        return true;
    }
    else {
        return false;
    }
}
function nameUsed(_array, _name) {
    let result;
    _array.forEach( element => {if (element.name == _name) result = true} );
    return result;
}
function resetInputs() {
    // Empty the new-timer-form
    timerNameInput.value = '';
    document.getElementById('seconds-input').value = ''; //! Change to durationInput
    document.getElementById('minutes-input').value = ''; //! Change to durationInput
    //! typeInput.value = 'SELECT TYPE';
}
function clearTimerCards() {
    // Remove the timer card elements created from the last routine
    document.querySelectorAll('#timer-cards-container > :not(#timer-card-template)').forEach( (element) => element.remove());
}

//* MID-TIER ABSTRACTIONS
function nameRoutine() {
    const input = routineNameInput.value;
    let name = input.toUpperCase();;

    // Failure
    if (hasValidCharacters(input) === false) {
        showAlert('Please use the following: a-z, A-Z, 0-9, –, /, &, +, #, @, $, ?, or !', 'danger', routineNameInput);
        removeAlert(8000);
    }
    else if (input.length >= 20 ) {
        showAlert('Chosen name should not exceed 20 characters.', 'danger', routineNameInput);
        removeAlert(6000);
    }
    else if ( nameUsed(RoutineList, name) ) {
        // If the new routine's name matches the name of another routine, throw error message
        showAlert('Chosen name matches that of another routine. Please choose another name.', 'danger', routineNameInput);
        removeAlert(6000);
    }

    // Success
    else {
        // Assign a default name if necessary
        if (isEmpty(input)) {
            name = `ROUTINE ${RoutineList.length + 1}`;
        }
        // Create a temporary Routine that isn't pushed to the list until the user presses submit
        currentRoutine = new Routine(name);
        
        // Show the list of timers belonging to the newly created routine
        document.getElementById('name-routine-form').classList.add('hidden');
        document.getElementById('timer-list').classList.remove('hidden');
        document.querySelector('#routine-label').innerHTML = name;
        
        // Make the input box empty
        routineNameInput.value = '';
    }
    console.log(RoutineList);
}

function addTimer() {
    //! Have the custom element.value property output the minutes and the seconds already converted to milliseconds
    if (isNaN( parseFloat(document.getElementById('seconds-input').value) )) {
        document.getElementById('seconds-input').value = 0;
    }
    if (isNaN( parseFloat(document.getElementById('minutes-input').value) )) {
        document.getElementById('minutes-input').value = 0;
    }
    //! let duration = durationInput;
    //! Change duration to match custom element
    const duration = ( parseFloat(document.getElementById('seconds-input').value) + (document.getElementById('minutes-input').value * 60) ) * 1000; // Convert the inputs to milliseconds
    let name = timerNameInput.value; // New value
    let type = 'exercise';
    //! let type = typeInput;

    // Failure
    if (duration <= 0) {
        showAlert('Timer duration must not be less than or equal to zero.', 'danger', timerNameInput);
        removeAlert(8000);
        document.getElementById('seconds-input').value = '';
        document.getElementById('minutes-input').value = '';
    }
    else if (hasValidCharacters(timerNameInput.value) === false) {
        showAlert('Please use the following: a-z, A-Z, 0-9, –, /, &, +, #, @, %, $, ?, or !', 'danger', timerNameInput);
        removeAlert(10000);
    }
    else if (timerNameInput.value.length > 50) { //! BUG: If name is one really long word, it spills out of the box
        showAlert('Chosen name must not exceed 50 characters.', 'danger', timerNameInput);
        removeAlert(8000);
    }
    //! else if (durationInput.isEmpty()) {
    //!     //show alert to enter a duration
    //! }

    // Success
    else {
        // Assign a default name if necessary
        if (isEmpty(timerNameInput.value)) {
            name = `Exercise ${currentRoutine.timers.length + 1}`;
        }
        // Add Timer
        currentRoutine.timers.push( new Timer(name, duration, type) );
        
        // Alert the reader that the timer was created
        // But don't change screens so they can add a bunch at a time
        showAlert(`Success! ${name} created!`, 'success', timerNameInput);
        removeAlert(3000);

        resetInputs();

        console.log('Timers: %o', currentRoutine.timers);
    }
    //! if (_timerName.type == 'rest') {
    //!     _timerName.name == 'REST';
    //! }
}

function createTimerCard (_name, _duration, _type) {
    const template = document.getElementById('timer-card-template');
    let newTimerCard = template.cloneNode(true);
    const timerNameLabel = newTimerCard.querySelector('.timer-name-label');
    const timerDurationLabel = newTimerCard.querySelector('.timer-duration-label');
    const timerTypeLabel = newTimerCard.querySelector('.timer-type-label');
    const deleteBtn = newTimerCard.querySelector('.delete-btn');
    
    newTimerCard.removeAttribute("id");
    newTimerCard.classList.remove("hidden");
    timerNameLabel.innerHTML = _name;
    timerDurationLabel.innerHTML = formatMilliseconds(_duration);
    timerTypeLabel.innerHTML = _type;
    deleteBtn.innerHTML = 'Delete';
    
    timerCardsContainer.appendChild(newTimerCard);
    
    deleteBtn.addEventListener('click', (event) => {
        // Select the targeted timer-card element
        let element = event.currentTarget.parentNode;
        
        // Find the index of the timer card and remove it from the currentRoutine.timers list
        let index = Array.from( timerCardsContainer.children ).indexOf( element );
        currentRoutine.timers.splice(index, 1);
        
        // Remove the timer-card element associated with this timer
        element.remove();

        // Refresh the screen to show the no-timers-alert in case the user deletes the last timer
        App.changeScreen('add-routine-screen');
    });
}

function submitRoutine() {
    //! switch screens
    //! If currentRoutine isn't reset, then allow user to go back to where they left off
    // Failure
    if (currentRoutine.timers.length < 1) {
        showAlert('Please add a timer.', 'danger', addTimerBtn);
        removeAlert(1500);
    }
    else if (currentRoutine.timers.length >= 50) {
        showAlert('There cannot be more than 50 timers in one routine. Having more than 50 timers is unhealthy.', 'danger', addTimerBtn);
        removeAlert(8000);

        // Move to bottom of screen so user can see the submit-routine-btn, as well as, the alert
        document.location.hash = '';
        document.location.hash ='submit-routine-btn';
    }

    // Success
    else {
        // Submit the routine to the RoutineList
        RoutineList.push(currentRoutine);
        
        // Reset current routine now that it has been saved
        currentRoutine = new Routine('__EMPTY__');

        // Clear the timer-cards off of the screen
        clearTimerCards();
        document.getElementById('no-timers-alert').classList.remove('hidden');
        
        resetInputs();
        
        // Show the form for adding routines, and hide the list of timers
        document.getElementById('name-routine-form').classList.remove('hidden');
        document.getElementById('timer-list').classList.add('hidden');

        console.log('CurrentRoutine: %o', currentRoutine);
        console.log('RoutineList: %o', RoutineList);
        console.log('TimerList: %o', currentRoutine.timers);
    }
}

nameRoutineBtn.addEventListener('click', () => nameRoutine());
submitTimerBtn.addEventListener('click', () => addTimer());
submitRoutineBtn.addEventListener('click', () => submitRoutine());