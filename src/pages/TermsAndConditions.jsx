import "./LegalPages.css";

const TermsAndConditions = () => {
  return (
    <div className="legal-container">
      <h1>Terms & Conditions</h1>

      <div className="legal-meta">
        <p><strong>Website:</strong> https://www.marvelousmart.com</p>
      </div>

      <p>
        Welcome to <strong>Marvelous Mart</strong> (“we”, “our”, “us”). By accessing or using
        marvelousmart.com, you agree to be bound by these Terms & Conditions.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 18 years old to place an order or use the site under parental supervision.
      </p>

      <h2>2. Products & Services</h2>
      <p>
        Marvelous Mart is a US-based e-commerce platform offering fashion and lifestyle
        products for kids, men, and women. Product details and prices may change without notice.
      </p>

      <h2>3. Orders & Payments</h2>
      <ul>
        <li>Payments are processed securely via Stripe</li>
        <li>Credit and debit cards supported by Stripe are accepted</li>
        <li>You authorize us to charge your selected payment method</li>
      </ul>

      <h2>4. Shipping & Delivery</h2>
      <p>Delivery timelines are estimates and may vary due to external factors.</p>

      <h2>5. Returns & Refunds</h2>
      <p>Please refer to our Refund Policy for more details.</p>

      <h2>6. Intellectual Property</h2>
      <p>All website content is the intellectual property of Marvelous Mart.</p>

      <h2>7. Limitation of Liability</h2>
      <p>We are not liable for indirect or consequential damages.</p>

      <h2>8. Governing Law</h2>
      <p>These terms are governed by the laws of the United States of America.</p>
    </div>
  );
};

export default TermsAndConditions;
