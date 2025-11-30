class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: #f8fafc;
          padding: 1.5rem;
          text-align: center;
          margin-top: 2rem;
          border-top: 1px solid #e5e7eb;
        }
        p {
          color: #64748b;
          font-size: 0.875rem;
          margin: 0;
        }
      </style>
      <footer>
        <p>© 2023 Lolos PTN Bareng. All rights reserved.</p>
      </footer>
    `;
  }
}
customElements.define('custom-footer', CustomFooter);
