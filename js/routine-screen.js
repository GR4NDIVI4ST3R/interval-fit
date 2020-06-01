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
        // Prevent the click event from bubbling to the parent element
        event.stopPropagation();

        // Select the targeted card element
        let element = event.currentTarget.parentNode;
        
        // Find the index of the card and remove it from the RoutineList array
        let index = Array.from(routineCardsContainer.children).indexOf(element);
        RoutineList.splice(index, 1);
        
        // Remove the routine-card element associated with this card
        element.remove();

        // Refresh the screen to show the no-routines-alert in case the user deletes the all of their routines
        App.changeScreen('routine-screen');

        console.log('RoutineList: %o', RoutineList);
    });

    newCard.addEventListener('click', (e) => {
        // Select the targeted card element
        let element = event.currentTarget;
        
        // Find the index of the routine card
        let index = Array.from(routineCardsContainer.children).indexOf(element);
        
        currentRoutine = RoutineList[index];
        currentTimer = currentRoutine.timers[0];
        beginRoutine();
    });
}
function clearRoutineCards() {
    // To refresh the page, remove all routine card elements before re-pasting them
    document.querySelectorAll('#routine-cards-container > *').forEach( (element) => element.remove());
}

function beginRoutine() {
    App.changeScreen('timer-screen');
}