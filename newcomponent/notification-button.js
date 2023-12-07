import { LitElement, html, css } from 'lit';

class NotificationButton extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-top: 10px;
    }
  `;

  render() {
    return html`
      <button @click="${this.showNotification}">Notification Button</button>
    `;
  }

  showNotification() {
    const notificationElement = document.createElement('notification-component');
    document.body.appendChild(notificationElement);
    notificationElement.showNotification('Амжилттай гаргасан notification');
  }
}

customElements.define('notification-button', NotificationButton);
