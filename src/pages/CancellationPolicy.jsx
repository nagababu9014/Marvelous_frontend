import "./LegalPages.css";

const CancellationPolicy = () => {
  return (
    <div className="legal-container">
      <h1>Cancellation Policy</h1>

      <div className="legal-meta">
        <p><strong>Website:</strong> https://www.marvelousmart.com</p>

      </div>

      <h2>Order Cancellation</h2>
      <p>
        Orders can be cancelled within <strong>12 hours</strong> of placement.
        Cancellation requests made after this period may not be accepted.
      </p>

      <h2>Shipped Orders</h2>
      <p>
        Once an order has been shipped, it cannot be cancelled under any circumstances.
      </p>

      <h2>Cancellation Refunds</h2>
      <p>
        Approved cancellations will be refunded to the original payment method
        within <strong>5–7 business days</strong>.
      </p>
    </div>
  );
};

export default CancellationPolicy;
