import { LitElement, html, css } from 'lit';

class NotificationComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: fixed;
      top: 10px;
      right: 10px;
      padding: 10px;
      background-color: #007bff;
      color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      display: none;
    }

    :host([wc-show]) {
      display: block;
    }
  `;

  static properties = {
    wcShow: { type: Boolean, attribute: 'wc-show' },
    message: { type: String }
  };

  constructor() {
    super();
    this.wcShow = false;
    this.message = '';
  }

  showNotification(message) {
    this.message = message;
    this.wcShow = true;

    setTimeout(() => {
      this.wcShow = false;
    }, 3000);
  }

  render() {
    return html`${this.message}`;
  }
}

customElements.define('notification-component', NotificationComponent);
