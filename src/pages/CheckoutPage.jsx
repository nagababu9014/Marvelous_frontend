import { useEffect, useState } from "react";
import api from "../api/axios";
import "./CheckoutPage.css";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [checkoutData, setCheckoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const isAuthenticated = false; // replace with real auth later

  // ✅ email state (REQUIRED)
  const [email, setEmail] = useState("");

  // ✅ address state
  const [address, setAddress] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    zip_code: ""
  });
useEffect(() => {
  const isAuthenticated = !!localStorage.getItem("access");

  if (!isAuthenticated) {
    navigate("/login?next=/checkout");
    return;
  }

  api.get("cart/checkout/").then(res => {
    setCheckoutData(res.data);
    setLoading(false);
  });

  api.get("orders/addresses/").then(res => {
    setSavedAddresses(res.data);
    if (res.data.length > 0) {
      setSelectedAddressId(res.data[0].id);
    }
  });
}, []);


const selectAddress = async (id) => {
  await api.post("orders/select-address/", { address_id: id });
  setSelectedAddressId(id);
  setShowNewAddressForm(false);
};
const saveNewAddress = async () => {
  const res = await api.post("orders/save-address/", address);
  setSelectedAddressId(res.data.address_id);
  setShowNewAddressForm(false);

  setAddress({
    first_name: "",
    last_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    zip_code: ""
  });

  const updated = await api.get("orders/addresses/");
  setSavedAddresses(updated.data);
};


  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

const placeOrder = async () => {
  if (!selectedAddressId) {
    alert("Please select address");
    return;
  }

  try {
    const res = await api.post("orders/create/", {
      address_id: selectedAddressId
    });

    navigate(`/payment/${res.data.order_id}`);
  } catch (err) {
    alert("Unable to place order");
  }
};







  if (loading) return <p className="loading">Loading checkout...</p>;

  return (
    <div className="checkout-page">

      {/* LEFT */}
      <div className="checkout-left">
        <h2>Shipping Address</h2>
        <h3>Select Delivery Address</h3>

{savedAddresses.length === 0 && (
  <p>No saved addresses</p>
)}

{savedAddresses.map(addr => (
  <div
    key={addr.id}
    className={`saved-address ${
      selectedAddressId === addr.id ? "active" : ""
    }`}
  >
    <p>
      <b>{addr.first_name} {addr.last_name}</b><br />
      {addr.address_line1}, {addr.city}, {addr.state} - {addr.zip_code}<br />
      Phone: {addr.phone}
    </p>

    <button onClick={() => selectAddress(addr.id)}>
      Deliver Here
    </button>
  </div>
))}

  <button onClick={() => setShowNewAddressForm(true)}>
  + Add New Address
</button>

{showNewAddressForm && (
  <div className="address-form">
    <input name="first_name" placeholder="First Name" onChange={handleAddressChange} />
    <input name="last_name" placeholder="Last Name" onChange={handleAddressChange} />
    <input name="phone" placeholder="Phone Number" onChange={handleAddressChange} />
    <input name="address_line1" placeholder="Street Address" onChange={handleAddressChange} />
    <input name="address_line2" placeholder="Apt / Suite (Optional)" onChange={handleAddressChange} />
    <input name="city" placeholder="City" onChange={handleAddressChange} />
    <input name="state" placeholder="State" onChange={handleAddressChange} />
    <input name="zip_code" placeholder="ZIP Code" onChange={handleAddressChange} />

    <button onClick={saveNewAddress}>
      Save & Use Address
    </button>
  </div>
)}
{!isAuthenticated && (
  <input
    type="email"
    placeholder="Email Address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
)}






        <h2>Review your order</h2>

        {checkoutData.items.map((item, index) => (
          <div key={index} className="checkout-item">
            <div>
              <h4>{item.product}</h4>
              <p>${item.price}</p>
              <p>Qty: {item.quantity}</p>
            </div>
            <div className="checkout-subtotal">
              ${item.subtotal}
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT */}
      <div className="checkout-summary">
        <h3>Order Summary</h3>

        <div className="summary-row">
          <span>Items Total</span>
          <span>${checkoutData.total_amount}</span>
        </div>

        <div className="summary-row">
          <span>Delivery</span>
          <span>FREE</span>
        </div>

        <hr />

        <div className="summary-total">
          <span>Order Total</span>
          <span>${checkoutData.total_amount}</span>
        </div>

<button
  className="place-order-btn"
  onClick={placeOrder}
  disabled={!selectedAddressId}
>

  Place Order
</button>

      </div>

    </div>
  );
};

export default CheckoutPage;
