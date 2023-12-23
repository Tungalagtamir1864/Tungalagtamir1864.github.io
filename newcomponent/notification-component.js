class NotificationComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: none;
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 10px;
          background-color: #28a745;
          color: #fff;
          border-radius: 4px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
      </style>
      <div id="notificationContent">Хүсэлт илгээгдлээ</div>
    `;
  }

  showNotification(message) {
    const notificationContent = this.shadowRoot.getElementById('notificationContent');
    if (notificationContent) {
      notificationContent.textContent = message || 'Хүсэлт илгээгдлээ';
      this.style.display = 'block';
      setTimeout(() => {
        this.style.display = 'none';
      }, 3000);
    } else {
      console.error('Энэ хуудасанд хүсэлт илгээгдлээг нь үзүүлэхийн тулд "notificationContent" id-тэй элемент хэрэгтэй байна.');
    }
  }
}

customElements.define('notification-component', NotificationComponent);