import "./LegalPages.css";

const RefundPolicy = () => {
  return (
    <div className="legal-container">
      <h1>Refund Policy</h1>

      <div className="legal-meta">
        <p><strong>Website:</strong> https://www.marvelousmart.com</p>
      </div>

      <h2>Refund Eligibility</h2>
      <ul>
        <li>Refund requests must be submitted within 7 days of product delivery</li>
        <li>Products must be unused, unworn, and returned in original packaging</li>
        <li>Proof of purchase is required</li>
      </ul>

      <h2>Non-Refundable Items</h2>
      <ul>
        <li>Clearance or sale items</li>
        <li>Gift cards</li>
        <li>Customized or personalized products</li>
      </ul>

      <h2>Refund Process</h2>
      <p>
        Once we receive and inspect the returned product, approved refunds will be
        processed to the original payment method within 5–10 business days via{" "}
        <strong>Stripe</strong>.
      </p>

      <h2>Shipping Costs</h2>
      <p>
        Shipping charges are non-refundable unless the product received is defective,
        damaged, or incorrect.
      </p>
    </div>
  );
};

export default RefundPolicy;
