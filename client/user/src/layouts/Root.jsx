import Navbar from "../components/layout/Navbar";
{/*import Footer from "../components/layout/Footer";*/}
import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
const Root = () => {
  return (
  <div>
    <Navbar />
    <main className="flex-grow pt-16">
      <Outlet />
    </main>
    <Footer />
  </div>
);
};

export default Root;