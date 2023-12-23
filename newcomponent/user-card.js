// user-card.js
import './notification-component.js';

class UserCard extends HTMLElement {
  static get observedAttributes() {
    return ['dark-mode'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          --button-bg: #007BFF;
          --button-text: #fff;
        }

        input[type="submit"] {
          padding: 10px;
          background-color: var(--button-bg);
          color: var(--button-text);
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        input[type="submit"]:hover {
          background-color: orange;
        }
      </style>
      <input type="submit" value="Илгээх">
    `;
    this.shadowRoot
      .querySelector('input[type="submit"]')
      .addEventListener('click', (e) => {
        console.log('New Super Button object has been instantiated.');

        // NotificationComponent-ийг олох
        const notificationComponent = this.closest('user-card').querySelector('notification-component');
        if (notificationComponent) {
          notificationComponent.showNotification('Хүсэлт илгээгдлээ');
        } else {
          console.error('NotificationComponent-ийг олох боломжгүй байна.');
        }
      });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'dark-mode') {
      if (newValue === 'true') {
        this.setDarkMode();
      } else {
        this.setLightMode();
      }
    }
  }

  setDarkMode() {
    this.shadowRoot.style.setProperty('--button-bg', '#333');
    this.shadowRoot.style.setProperty('--button-text', '#fff');
  }

  setLightMode() {
    this.shadowRoot.style.setProperty('--button-bg', '#007BFF');
    this.shadowRoot.style.setProperty('--button-text', '#fff');
  }
}

customElements.define('user-card', UserCard);