import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) return;

    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        localStorage.removeItem("isLoggedIn");
        toast.error("انتهت الجلسة، يرجى تسجيل الدخول مرة أخرى ⏳");
        window.location.href = "/login";
      }, 15 * 60 * 1000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    toast.success("👋 تم تسجيل الخروج");
    window.location.href = "/";
  };
  
  const menuItemClass =
    "block rounded-2xl px-5 py-4 bg-white/10 border border-white/10 text-white hover:bg-[#9DFF00] hover:text-black transition-all duration-300 font-bold";
   const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="navbar bg-black px-2 md:px-6 text-white fixed top-0 z-50 shadow-md animate-slide-in-top">
      <div className="navbar-start">
        <div className="relative">
  <button
    type="button"
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    className="btn btn-ghost lg:hidden"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h8m-8 6h16"
      />
    </svg>
  </button>

  {isMenuOpen && (
    <ul className="absolute top-14 right-0 z-[999] p-4 shadow-2xl bg-[#111827]/95 backdrop-blur-md border border-[#9DFF00] rounded-3xl w-60 text-right">
      <li className="list-none">
        {isLoggedIn ? (
          <button
            onClick={() => {
              setIsMenuOpen(false);
              handleLogout();
            }}
            className={`${menuItemClass} w-full text-right`}
          >
            تسجيل الخروج
          </button>
        ) : (
          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className={menuItemClass}
          >
            تسجيل الدخول
          </Link>
        )}
      </li>
    </ul>
  )}
</div>

        <Link to="/" className="flex items-center gap-1 md:gap-2 min-w-fit">
          <img
            src="/gogoal-logo.png"
            alt="GoGoal"
            className="w-9 h-9 md:w-10 md:h-10 object-contain"
          />

          <span
            className="text-sm md:text-2xl font-black italic tracking-tight"
            style={{ fontFamily: "Orbitron" }}
          >
            <span className="text-white">Go</span>
            <span className="text-lime-400 drop-shadow-[0_0_8px_#84cc16]">
              Goal
            </span>
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">الرئيسية</Link>
          </li>

          <li>
            <Link to="/auth/profile" onClick={() => window.scrollTo(0, 0)}>
              الصفحة الشخصية
            </Link>
          </li>

          <li>
            <Link to="/auth/leaderboard">المتصدرون</Link>
          </li>

          <li>
            {isLoggedIn ? (
              <button onClick={handleLogout}>تسجيل الخروج</button>
            ) : (
              <Link to="/login">تسجيل الدخول</Link>
            )}
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-1 md:gap-3">
        <a
          href="#ticketCards"
          className="btn bg-[#9DFF00] hover:bg-[#7CFF00] border-none text-black font-bold rounded-2xl px-3 md:px-6 py-3 transition-all duration-300 hover:scale-105 shadow-[0_0_15px_#9DFF00]"
        >
         احجز مكانك
        </a>
      </div>
    </div>
  );
};

export default Navbar;