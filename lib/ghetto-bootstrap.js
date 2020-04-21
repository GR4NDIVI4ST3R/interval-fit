function showAlert(_message, _alertType, _location, _delay) { // This is a refactored function taken from "https://codepen.io/bradtraversy/pen/OrmKWZ"
    const div = document.createElement('div');
    div.className = `alert alert-${_alertType}`;
    div.appendChild(document.createTextNode(_message));
    const container = _location.parentNode; //! Insert alert according to current version of app
    container.insertBefore(div, _location);
}
function removeAlert(_delay) {
    if (typeof(_delay) == 'number') setTimeout(() => document.querySelector('.alert').remove(), _delay);
    else document.querySelector('.alert').remove();
}