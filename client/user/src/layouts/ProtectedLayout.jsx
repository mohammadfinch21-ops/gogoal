import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { useSelector } from "react-redux";
import MobileBottomNav from "../components/common/MobileBottomNav";

export default function ProtectedLayout() {

  const { isLoggedIn } = useSelector((state) => state.auth);

  const token = localStorage.getItem("token");

  if (!localStorage.getItem("isLoggedIn")) {
  return <Navigate to="/login" replace />;
}

  return (
  <div className="flex flex-col min-h-screen">
    <Navbar />

<main className="flex-grow pt-16 pb-24">
  <Outlet />
</main>

<MobileBottomNav />
  </div>
);
}