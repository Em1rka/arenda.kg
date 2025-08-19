import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Catalog from "@/pages/Catalog";
import HowItWorks from "@/pages/HowItWorksPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import OwnerProfile from "./pages/OwnerProfile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/ownerprofile" element={<OwnerProfile/>} />
    </Routes>
  );
}
