import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderTracking } from "../api/orders";
import "./orderTracking.css";

const STATUS_FLOW = [
  "PLACED",
  "CONFIRMED",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED"
];

export default function OrderTrackingPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrderTracking(id)
      .then(res => setOrder(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!order) return <p className="loading">Loading tracking...</p>;

  return (
    <div className="tracking-container">
      <h2>Order Tracking</h2>

      <div className="order-meta">
        <p><b>Order ID:</b> #{order.order_id}</p>
        <p><b>Payment:</b> {order.payment_status}</p>
        <p><b>Status:</b> {order.order_status}</p>
      </div>

      <div className="timeline">
        {STATUS_FLOW.map(status => {
          const history = order.tracking.find(h => h.status === status);
          const isCompleted = !!history;

          return (
            <div
              key={status}
              className={`timeline-step ${isCompleted ? "done" : ""}`}
            >
              <div className="circle" />
              <div className="content">
                <p className="status">{status.replaceAll("_", " ")}</p>
                {history && (
                  <span className="time">
                    {new Date(history.time).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
