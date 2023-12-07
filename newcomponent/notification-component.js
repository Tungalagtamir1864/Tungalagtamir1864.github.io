

class NotificationComponent extends LitElement {
  static styles = css`

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
