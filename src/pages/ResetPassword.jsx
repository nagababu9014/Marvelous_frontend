import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import "./Login.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🚫 Prevent direct access
  if (!email) {
    navigate("/forgot-password");
    return null;
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("users/auth/reset/verify-otp/", {
        email,
        otp,       // ✅ REAL OTP
        password,  // ✅ NEW PASSWORD
      });

      toast.success("Password reset successful ✅");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid OTP or expired");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form
  className="auth-form"
  onSubmit={handleResetPassword}
  autoComplete="off"
>
  <h2>Reset Password</h2>

  {/* EMAIL (READ ONLY) */}
  <input
    type="email"
    value={email}
    disabled
    autoComplete="off"
    style={{ background: "#f3f4f6" }}
  />

  {/* OTP */}
  <input
    type="text"
    name="otp"
    placeholder="Enter OTP"
    value={otp}
    onChange={(e) => setOtp(e.target.value)}
    autoComplete="one-time-code"
    required
  />

  {/* PASSWORD */}
  <div className="password-wrapper">
    <input
      type={showPassword ? "text" : "password"}
      name="new-password"
      placeholder="New password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      autoComplete="new-password"
      required
    />
    <span
      className="eye-icon"
      onClick={() => setShowPassword((p) => !p)}
    >
      {showPassword ? "🙈" : "👁️"}
    </span>
  </div>

  <button type="submit" disabled={loading}>
    {loading ? "Resetting..." : "Reset Password"}
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
