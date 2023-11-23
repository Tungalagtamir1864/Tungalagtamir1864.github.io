// <gobi-product></gobi-product>
import html from "./utility.js";

class Project extends HTMLElement {
  constructor() {
    this.imgLink = ob.imgLink;
    this.companyName = ob.companyName;
    this.location = ob.location;
    this.date = ob.date;

    super();
    this.innerHTML = html`
        <article class="project_item">
            <img src="${this.imgLink}" alt="">
            <div class="project_text">
                <h3>${this.companyName}</h3>
                <p> ${this.location}</p>                        
                <p>${this.date}</p> 
            <div>
        </article>`;
  }
  connectedCallback() {


  }
  disconnectedCallback() {}
  attributeChangedCallback(attrName, oldVal, newVal) {}
}

window.customElements.define("project", Project);
const projectData = new pro("https://api.jsonbin.io/v3/b/6554e0d454105e766fd0637f");
