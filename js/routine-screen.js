// Add event listener for all routine tiles that detects if they are clicked
// if (clickIntent is to edit the routine) then...
// else beginRoutine()
function createRoutineCard (_name, _timerCount) {
    const template = document.getElementById('routine-card-template');
    const newCard = template.cloneNode(true);
    const routineNameLabel = newCard.querySelector('.routine-name-label');
    const timerCountLabel = newCard.querySelector('.timer-count-label');
    const deleteBtn = newCard.querySelector('.delete-btn');
    
    newCard.removeAttribute("id");
    newCard.classList.remove("hidden");
    routineNameLabel.innerHTML = _name;
    timerCountLabel.innerHTML = (_timerCount == 1) ? (_timerCount + ` Timer`) : (_timerCount + ` Timers`);
    deleteBtn.innerHTML = 'Delete';
    
    routineCardsContainer.appendChild(newCard);
    
    deleteBtn.addEventListener('click', (event) => {
        // Select the targeted timer-card element
        event.stopPropagation();
        let element = event.currentTarget.parentNode;
        
        // Find the index of the timer card and remove it from the currentRoutine.timers list
        let index = Array.from(routineCardsContainer.children).indexOf(element);
        RoutineList.splice(index, 1);
        
        // Remove the timer-card element associated with this timer
        element.remove();

        // Refresh the screen to show the no-timers-alert in case the user deletes the last timer
        App.changeScreen('routine-screen');

        console.log('RoutineList: %o', RoutineList);
    });

    newCard.addEventListener('click', beginRoutine);
}
function clearRoutineCards() {
    // To refresh the page, remove all routine card elements before re-pasting them
    document.querySelectorAll('#routine-cards-container > *').forEach( (element) => element.remove());
}
function beginRoutine() {
    console.log('\n', currentRoutine)
}
// document.querySelectorAll('.routine-card').forEach( (card) => {
//     card.addEventListener('click', beginRoutine);
// });