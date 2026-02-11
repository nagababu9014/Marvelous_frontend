import { useEffect, useState } from "react";
import api from "../api/axios";
import "./MyOrdersPage.css";
import { useNavigate } from "react-router-dom";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  useEffect(() => {
    api.get("orders/")
      .then(res => {
        setOrders(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.map(order => (
        <div key={order.id} className="order-card">
          <div className="order-left">
            <h4>
              Order • <span className="order-date">
                Ordered on {formatDate(order.created_at)}
              </span>
            </h4>

            {order.items?.map((item, index) => (
              <div key={index} className="order-item">
                <img src={item.image} alt={item.name} />
                <div className="order-item-info">
                  <p className="item-name">{item.name}</p>
                  <p className="item-qty">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}

            <p className="order-msg">
              Order status: <b>{order.order_status}</b>
            </p>

            <button
              className="track-btn"
              onClick={() => navigate(`/order/${order.id}/track`)}
            >
              Track Order
            </button>
          </div>

          <div className="order-total">
            ${order.total_amount}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrdersPage;
