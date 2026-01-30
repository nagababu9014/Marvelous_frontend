import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const logout = async () => {
    try {
      // optional backend logout (safe to fail)
      await api.post("users/logout/", {
        refresh: localStorage.getItem("refresh"),
      });
    } catch {}

    // clear tokens
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    // update app state
    setUser(null);

    toast.success("Logged out successfully 👋");

    navigate("/login", { replace: true });
  };

  return <button onClick={logout}>Logout</button>;
}
