// <gobi-productlist></gobi-productlist>
import "./project.js";

class ProjectList extends HTMLElement {
    constructor() {
        super(); 
        this.innerHTML = `
        <style> 
        .projectList{
            display:flex;
            flex-direction: ${ this.getAttribute("direction") }; 
            gap:2ch;
            flex-wrap: wrap;}

        .projectList > project{
            flex: 1 1;
        }
      </style>
    <div class="projectList">
        <project></project>
        <project></project>
        <project></project>
    </div>`;
    }
    connectedCallback() {

    }
    disconnectedCallback() {

    }
    attributeChangedCallback(attrName, oldVal, newVal) {

    }
}

window.customElements.define('projectList', ProjectList);