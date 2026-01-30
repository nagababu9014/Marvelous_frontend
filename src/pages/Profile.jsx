import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { User, Mail, ShieldCheck } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login");
      return;
    }

    api.get("users/me/")
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.clear();
        navigate("/login");
      });
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-card">

        <div className="profile-header">
          <div className="avatar">
            <User size={40} />
          </div>
          <h2>{user.username || "User"}</h2>
          <p className="verified">
            <ShieldCheck size={16} /> Verified account
          </p>
        </div>

        <div className="profile-info">
          <div className="info-row">
            <Mail size={18} />
            <span>{user.email}</span>
          </div>

          <div className="info-row">
            <User size={18} />
            <span>{user.username || "Google User"}</span>
          </div>
        </div>

        <div className="profile-actions">
          <button onClick={() => navigate("/my-orders")}>
            View Orders
          </button>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
