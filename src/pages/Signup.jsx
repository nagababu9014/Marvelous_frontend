import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/auth";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signupUser(form);

      toast.success("Account created successfully 🎉 Please login");
      navigate("/login");
    } catch (err) {
      const error =
        err.response?.data?.email ||
        err.response?.data?.password ||
        "Signup failed. Try again.";

      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Create Account</h2>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

<div className="password-wrapper">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={form.password}
    onChange={(e) =>
      setForm({ ...form, password: e.target.value })
    }
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
          {loading ? "Creating account..." : "Signup"}
        </button>

        {/* 🔥 GOOGLE SIGNUP HINT */}
        <p className="signup-hint">
          Prefer quick signup?{" "}
          <span
            className="google-link"
            onClick={() => navigate("/login")}
          >
            Continue with Google
          </span>
        </p>

        <p className="signup-footer">
          Already have an account?{" "}
          <span
            className="signup-link"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
