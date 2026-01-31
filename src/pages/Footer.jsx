import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <h2>Marvelous Merchandise</h2>
          <p>
            Premium fashion & lifestyle products crafted for comfort,
            quality, and everyday elegance.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/my-orders">My Orders</Link>
        </div>

        {/* CUSTOMER CARE */}
        <div className="footer-links">
          <h4>Customer Care</h4>
          <Link to="/contact">Contact Us</Link>
          <Link to="/terms-and-conditions">Terms & Conditions</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/refund-policy">Returns & Refunds</Link>
          <Link to="/cancellation-policy">Cancellation Policy</Link>
        </div>

        {/* SOCIAL */}
        <div className="footer-social">
          <h4>Follow Us On</h4>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://wa.me/918000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp"
            >
              <FaWhatsapp />
            </a>

            <a
              href="mailto:support@marvelousmart.com"
              className="email"
            >
              <FaEnvelope />
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="x"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Marvelous Mart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
