//! Import Me
const textInputTemplate = document.createElement('text-input-template');
textInputTemplate.innerHTML =
`
<div class="input-container">
    <input class="text-input" type="text" placeholder=" " autocomplete="off" required>
    <div class="animated-underline"></div>
    <div class="animated-label">Name</div>

    <style>
    @import url('https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800');
    
    :root {
        /* Type */
        --bluish-black: #172B4D;
        --blue: #2E90FF;
        --grey6: #767676;
        --font-size: 1.1em;
        --font-size-on-focus: 1.1em;
        --text-padding: 4px;
        --animation-duration: 0.25s;
    }
    
    .input-container {
        width: 100%;
        height: auto;
        position: relative;
        overflow: hidden;
    }
    .input-container * {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: var(--font-size);
        color: var(--bluish-black);
    }
    .input-container .text-input {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box; /* ? Prevents the input box from exceeding the size of its parent container */
        
        outline: none;
        border: none;
        padding-top: 25px; /* Determines the size of .input-container b/c .input-container height is auto */
        padding-bottom: var(--text-padding); /* Better-looking line spacing */
    }
    
    /* input-underline */
    .input-container .animated-underline {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        pointer-events: none;
        border-bottom: 1px solid #000000;
    }
    .input-container .animated-underline::after {
        /* Final animated-underline */
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        bottom: -1px; /* Places line directly on top of other line by accounting for the border's thickness */
        border-bottom: 2px solid var(--blue);
    
        /* Initial animated-underline */
        transform: translateX(-100%);
        transition: transform var(--animation-duration) ease;
    }
    
    /* Initial animated-label */
    .input-container .animated-label {
        position: absolute;
        left: 0;
        bottom: 0;
        padding-bottom: var(--text-padding); /* Same bottom line spacing as the text input */
        color: var(--grey6);
        pointer-events: none;
        transition: all var(--animation-duration) ease;
    }
    
    /* Final animated-label */
    .input-container input:focus ~ .animated-label,
    .input-container input:not(:placeholder-shown) ~ .animated-label {
        /* Raise and resize the label when the input is clicked into [:focus] OR when there is text left in the input [:not(:placeholder-shown)] */
        transform: translateY(-100%); /* Moves the label up the same height as the label's font */
        padding-bottom: calc(2px);
        font-size: var(--font-size-on-focus);
        color: var(--blue);
    }
    
    /* Trigger animated-underline animation*/
    .input-container input:focus ~ .animated-underline:after,
    .input-container input:not(:placeholder-shown) ~ .animated-underline:after {
        transform: none;
    }
    </style>
</div>
`;

class textInput extends HTMLElement {
    constructor () {
        super();
        function elementHas(_attribute) {
            if ( typeof(_attribute) !== "undefined" && _attribute !== null && _attribute != "" ) return true;
            else return false;
        }
        function isFocused () {
            return ( document.activeElement === this.shadowRoot.querySelector('.text-input') );
        }

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(textInputTemplate.querySelector('.input-container').cloneNode(true));
        
        // Get Attributes
        const root = document.documentElement;
        const animatedLabel = this.shadowRoot.querySelector('.animated-label');
        const input = this.shadowRoot.querySelector('.text-input');
        const height = this.shadowRoot.querySelector('.animated-label').offsetHeight;//! Make it change padding: top of input
        this.type = this.getAttribute('type');
        this.value = this.getAttribute('value');
        this.label = this.getAttribute('label');
        this.placeholder = this.getAttribute('placeholder');
        //! --font-size: 1.1em;
        //! --font-size-on-focus: 1.1em;
        //! --text-padding: 4px;
        //! --animation-duration: 0.25s;
        //! root.style.setProperty('__BLANK',  + "px");
        //* Apply attributes appropriately to the element's sub-elements
        
        if ( elementHas(this.type) ) this.shadowRoot.querySelector('.text-input').type = this.type;
        if ( elementHas(this.value) ) this.shadowRoot.querySelector('.text-input').value = this.value;
        if ( elementHas(this.placeholder) ) {
            animatedLabel.textContent = "";
            input.placeholder = this.placeholder;
        } else {
            animatedLabel.textContent = ( elementHas(this.label) ) ? this.label : 'Name';
        }

        //! Logging
        console.log(`value ${this.value}, type ${this.type}, label ${this.label}, height ${this.height}, placeholder ${this.placeholder}`);
    }
}
window.customElements.define('text-input', textInput);