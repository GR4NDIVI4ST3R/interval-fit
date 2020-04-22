//* PRIMARY FUNCTION
function addTimer() {
    const nameInput = timerNameInput.value;
    let name = nameInput;
    let duration = 60000;
    let type = 'exercise';
    //! let duration = durationInput;
    //! let type = typeInput;

    // Failure
    if (hasValidCharacters(nameInput) === false) {
        showAlert('Please use the following: a-z, A-Z, 0-9, –, /, &, +, #, @, $, ?, or !', 'danger', timerNameInput);
        removeAlert(8000);
    }
    else if (nameInput.length >= 20) {
        showAlert('Chosen name must not exceed 20 characters.', 'danger', timerNameInput);
        removeAlert(6000);
    }

    // Success
    else {
        // Assign a default name if necessary
        if (isEmpty(nameInput)) {
            name = `Exercise ${currentRoutine.timers.length + 1}`;
        }
        // Add Timer
        currentRoutine.timers.push( new Timer(name, duration, type) );
        
        //! Empty the new-timer-form
        timerNameInput.value = '';
        //...

        // Show the screen with current routine's list of timers
        document.getElementById('add-routine-container').classList.add('hidden');
        document.getElementById('timer-list-container').classList.remove('hidden');

        console.log('RoutineList: %o', RoutineList);
        console.log('TimerList: %o', currentRoutine.timers);
    }
    //! if (_timerName.type == 'rest') {
    //!     _timerName.name == 'REST';
    //! }
}

function createTimerCard (_name, _duration, _type) {
    const template = document.querySelector('#timer-card-template');
    let newTimerCard = template.cloneNode(true);
    
    const timerNameLabel = newTimerCard.querySelector('.timer-name-label');
    const timerDurationLabel = newTimerCard.querySelector('.timer-duration-label');
    const timerTypeLabel = newTimerCard.querySelector('.timer-type-label');
    const deleteTimerHyperlink = newTimerCard.querySelector('.delete-timer-hyperlink');
    
    newTimerCard.removeAttribute("id");
    timerNameLabel.innerHTML = _name;
    timerDurationLabel.innerHTML = formatMilliseconds(_duration);
    timerTypeLabel.innerHTML = _type;
    deleteTimerHyperlink.innerHTML = 'Delete'
    
    timerCardsContainer.appendChild(newTimerCard);
    
    deleteTimerHyperlink.addEventListener('click', (element) => {
        //! Actually remove it from the currentRoutine.timers array
        // Remove the timer-card associated with this timer
        element.currentTarget.parentNode.remove();
    })
}
function removeTimerCards() {
    // Remove the timer card elements created from the last routine
    document.querySelectorAll('#timer-cards-container > :not(#timer-card-template)').forEach( (element) => element.remove());
}

function finishRoutine() {
    //! switch screens
    //! If currentRoutine isn't reset, then allow user to go back to where they left off
    if (currentRoutine.timers.length < 1) {
        showAlert('Please add a timer.', 'danger', timerCardsContainer);
        removeAlert(6000);
    }
    else if (currentRoutine.timers.length >= 50) {
        showAlert('There cannot be more than 50 timers in one routine.', 'danger', timerCardsContainer);
        removeAlert(6000);
    }
    else {
        // Finish the process by submitting the routine to the RoutineList
        RoutineList.push(currentRoutine);
        
        // Reset current routine now that it has been saved
        currentRoutine = new Routine('__EMPTY__');

        //! Empty any leftover input fields
        timerNameInput.value = '';
        //...

        // Clear the timer-cards off of the screen
        removeTimerCards();

        // Show the form for adding routines, and hide the list of timers
        document.getElementById('add-routine-container').classList.remove('hidden');
        document.getElementById('timer-list-container').classList.add('hidden');

        console.log('RoutineList: %o', RoutineList);
        console.log('TimerList: %o', currentRoutine.timers);
    }
}