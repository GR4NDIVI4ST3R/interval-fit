//* APP PLAN!!!
/*
Routine creation:
    Add workout timers and rest timers
    
*/

// OTHER FUNCTIONS
function hasValidCharacters(_input) {
    // Regex.label = /[a-z A-Z 0-9 ? ! @ # / \$ \& \+ \-]/g;
    if ( isEmpty(_input.replace(Regex.label, "")) ) { // "replace()" does not change the string it is called on. It returns a new string.
        return true;
    }
    else {
        return false;
    }
}

//* PRIMARY FUNCTIONS
function addRoutine() {
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
        // Create Routine but don't push it to the list until it's finished
        currentRoutine = new Routine(name);
        
        // Show the list of timers belonging to the newly created routine
        document.getElementById('add-routine-container').classList.add('hidden');
        document.getElementById('timer-display-container').classList.remove('hidden');
        document.querySelector('#routine-label').innerHTML = name;
        
        // Make the input box empty
        routineNameInput.value = '';
    }
    console.log(RoutineList);
}