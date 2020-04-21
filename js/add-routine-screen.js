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
            name = `Routine${RoutineList.length + 1}`;
        }
        // Add Routine
        RoutineList.push( new Routine(name) );
        
        // Show Allert Banner
        showAlert(`Success! ${name} was created.`, 'success', routineNameInput);
        removeAlert(5000);

        //TODO: Switch to add-timer-screen
    }
    console.log(RoutineList);
}

submitRoutineBtn.addEventListener('click', (e) => {addRoutine()});