import { HTMLElement, html, css } from 'lit';

  class NotificationButton extends HTMLElement {
    constructor() {
        super();
        this.#render();
    }

    #render() { 

        this.innerHTML = `
        <style>


        </style>
        <input type="submit" value="Илгээх" ${this.getAttribute("likes")}>`
         

    }
    connectedCallback() {

    }
    static get observedAttributes() {
    }
    attributeChangedCallback(name, oldVal, newVal) {
       
    }
}

window.customElements.define('NotificationButton', NotificationButton);