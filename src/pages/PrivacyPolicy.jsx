import "./LegalPages.css";

const PrivacyPolicy = () => {
  return (
    <div className="legal-container">
      <h1>Privacy Policy</h1>

      <div className="legal-meta">
        <p><strong>Website:</strong> https://www.marvelousmart.com</p>
      </div>

      <p>
        Marvelous Mart is committed to protecting your personal information and respecting
        your privacy.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>Name, email address, and phone number</li>
        <li>Shipping and billing address</li>
        <li>Payment details (processed securely via Stripe)</li>
        <li>Order history, IP address, and device information</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To process orders and payments</li>
        <li>To send order confirmations and updates</li>
        <li>To improve our website and services</li>
        <li>To comply with legal obligations</li>
      </ul>

      <h2>Payment Security</h2>
      <p>
        We do not store credit or debit card information. All payment transactions are
        securely handled by <strong>Stripe</strong>, which complies with PCI-DSS standards.
      </p>

      <h2>Data Sharing</h2>
      <p>
        We do not sell or rent personal data. Your information may be shared only with
        trusted service providers such as payment processors and shipping partners.
      </p>

      <h2>Cookies</h2>
      <p>
        We use cookies to enhance user experience, analyze website performance,
        and improve our services.
      </p>

      <h2>Your Rights</h2>
      <p>
        You may request access, correction, or deletion of your personal data by contacting us.
      </p>

      <h2>Contact Us</h2>
      <p>
        Email: <strong>support@marvelousmart.com</strong>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
