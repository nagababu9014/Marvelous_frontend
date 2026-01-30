import "./Login.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useCart } from "../context/CartContext";
import api from "../api/axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchCartCount } = useCart();
  const [showPassword, setShowPassword] = useState(false);

const { refreshUser } = useContext(AuthContext);

  const params = new URLSearchParams(location.search);
  const next = params.get("next") || "/";

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  /* ===========================
     NORMAL LOGIN (UNCHANGED)
     =========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      toast.success(
        `Hey ${res.data.user.username}, welcome to Marvels Merchandise 👋`
      );
      await refreshUser(); // 🔥 THIS LINE FIXES EVERYTHING

      // 🔥 redirect first
      navigate(next, { replace: true });

      // 🔄 fetch cart after redirect
      setTimeout(() => {
        fetchCartCount();
      }, 0);


    } catch {
      toast.error("Invalid credentials");
    }
  };

  /* ===========================
     GOOGLE LOGIN → JWT (NEW)
     =========================== */
  useEffect(() => {
    /* global google */
    if (!window.google) return;

    google.accounts.id.initialize({
      client_id: "887094962913-7h033et7vp0blp05ncdecc8e21jc0lg4.apps.googleusercontent.com",
      callback: async (response) => {
        try {
          const res = await api.post("users/google-login/", {
            token: response.credential,
          });

          localStorage.setItem("access", res.data.access);
          localStorage.setItem("refresh", res.data.refresh);

          toast.success("Logged in with Google 🎉");
          await refreshUser(); // 🔥 REQUIRED

          navigate(next, { replace: true });

          setTimeout(() => {
            fetchCartCount();
          }, 0);


        } catch {
          toast.error("Google login failed");
        }
      },
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      {
        theme: "outline",
        size: "large",
        width: "100%",
      }
    );
  }, []);

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>

        {next === "/checkout" && (
          <p className="login-hint">
            Please login to continue checkout
          </p>
        )}

        <input
          placeholder="Email"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
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
    required
  />

  <span
    className="password-toggle"
    onClick={() => setShowPassword((prev) => !prev)}
    title={showPassword ? "Hide password" : "Show password"}
  >
    {showPassword ? "🙈" : "👁️"}
  </span>
</div>

        <p
          className="auth-link"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot password?
        </p>


        <button type="submit">Login</button>

        <div className="divider">OR</div>

        {/* 🔥 GOOGLE BUTTON (NO redirect, NO session) */}
        <div id="google-btn"></div>

        <p className="auth-footer">
          New user?{" "}
          <span
            className="auth-link"
            onClick={() => navigate("/signup")}
          >
            Create an account
          </span>
        </p>
      </form>
    </div>
  );
}
