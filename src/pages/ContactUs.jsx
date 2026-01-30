import "./ContactUs.css";
import { FaComments, FaSms, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ContactHelp = () => {
  return (
    <section className="help-section">
      <div className="help-container">
        <h2>Need some help?</h2>

        <p className="help-desc">
          Our Customer Experience team can be reached Monday – Friday (8am – 6pm CT)
          and Saturday (10am – 7pm CT).
        </p>

        <div className="help-options">
          <div className="help-item">
            <FaComments />
            <h4>Live Chat</h4>
            <a href="#">START A CHAT NOW</a>
          </div>

          <div className="help-item">
            <FaSms />
            <h4>Text Us</h4>
            <a href="tel:8338326827">833-832-6827</a>
          </div>

          <div className="help-item">
            <FaPhoneAlt />
            <h4>Call</h4>
            <a href="tel:8338326827">833-Marvelous</a>
          </div>

          <div className="help-item">
            <FaEnvelope />
            <h4>Email</h4>
            <a href="mailto:support@marvelousmerchandise.com">
              GET A RESPONSE IN 48 HOURS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHelp;
