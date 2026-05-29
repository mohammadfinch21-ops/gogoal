import Navbar from "../components/layout/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import MobileBottomNav from "../components/common/MobileBottomNav";

const Root = () => {
  return (
    <div>
      <Navbar />

      <main className="flex-grow pt-16 pb-20">
        <Outlet />
      </main>

      <MobileBottomNav />

      <Footer />
    </div>
  );
};

export default Root;