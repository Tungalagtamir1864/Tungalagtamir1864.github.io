customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<input type="submit" value="Илгээх">`;
    this.shadowRoot.firstElementChild.onclick =
      e => alert("АМЖИЛТТАЙ ИЛГЭЭГДЛЭЭ");
  }
});


window.customElements.define('user-card', user-card);