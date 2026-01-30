import { BrowserRouter } from "react-router-dom";
import AppContent from "./AppContent";
import { AuthProvider } from "./context/AuthContext";

export default function AppWrapper() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
