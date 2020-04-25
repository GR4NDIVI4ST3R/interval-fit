//! Import Me
const textInputTemplate = document.createElement('text-input-template');
textInputTemplate.innerHTML =
`
<style>

</style>

`;

class numberPicker extends HTMLElement {
    constructor () {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(textInputTemplate.content.cloneNode(true));
        
        // Get Attributes
        this.value = this.getAttribute('value');
        this.type = this.getAttribute('type');
        this.labelEnable = this.hasAttribute('label-enable');
        this.label = this.getAttribute('label');
        this.height = console.log(document.querySelector('.animated-label').offsetHeight);//! Make it change padding: top of input
        this.isFocused = () => ( document.activeElement === document.querySelector('input') );
        //! --font-size: 1.1em;
        //! --font-size-active: 1.1em;
        //! --text-padding: 4px;
        //! --animation-duration: 0.25s;

        // Apply attributes appropriately to the element's sub-elements
        this.shadowRoot.querySelector('input').value = this.value;
        this.shadowRoot.querySelector('input').type = this.type;
        this.shadowRoot.querySelector('.label').textContent = this.label;
        //! Make thing

    }
}
window.customElements.define('text-input', numberPicker);
