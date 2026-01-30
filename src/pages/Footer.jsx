import "./Footer.css";
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

        {/* LINKS */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/cart">Cart</a>
          <a href="/my-orders">My Orders</a>
        </div>

        <div className="footer-links">
          <h4>Customer Care</h4>
          <a href="/contact">Contact Us</a>
          <a href="#">Shipping Policy</a>
          <a href="#">Returns & Refunds</a>
          <a href="#">Privacy Policy</a>
        </div>

        {/* SOCIAL */}
        <div className="footer-social">
          <h4>Follow Us On</h4>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              className="instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://wa.me/918000000000"
              target="_blank"
              className="whatsapp"
            >
              <FaWhatsapp />
            </a>

            <a
              href="mailto:support@marvelousmerchandise.com"
              className="email"
            >
              <FaEnvelope />
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              className="x"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Marvelous Merchandise. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
