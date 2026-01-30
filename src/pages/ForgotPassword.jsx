import { useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("users/auth/reset/send-otp/", { email })

      toast.success("OTP sent to your email 📧");
      navigate("/reset-password", { state: { email } });
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSendOTP}>
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        <p className="auth-footer">
          Back to{" "}
          <span className="auth-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
