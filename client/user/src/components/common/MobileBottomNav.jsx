import { NavLink, useNavigate } from "react-router-dom";
import { Home, Trophy, Ticket, User } from "lucide-react";

const MobileBottomNav = () => {
  const navigate = useNavigate();

  const goToTickets = () => {
    navigate("/");

    setTimeout(() => {
      const section = document.getElementById("ticketCards");
      section?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const itemClass = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-1 py-2 text-[12px] font-bold transition-all duration-300 ${
      isActive
        ? "text-[#9DFF00] scale-110"
        : "text-white/80 hover:text-[#9DFF00]"
    }`;

  const iconClass = "drop-shadow-[0_0_8px_#9DFF00]";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999] md:hidden bg-black/95 border-t border-[#9DFF00] pb-2">
      <div className="grid grid-cols-4 text-center drop-shadow-[0_0_8px_#9DFF00]">

        <NavLink
  to="/auth/profile"
  onClick={() => window.scrollTo(0, 0)}
  className={itemClass}
>
          <User size={22} className={iconClass} />
          <span>الصفحة الشخصية</span>
        </NavLink>

        <button
          onClick={goToTickets}
          className="flex flex-col items-center justify-center gap-1 py-2 text-[12px] font-bold text-white/80 hover:text-[#9DFF00] transition-all duration-300"
        >
          <Ticket size={22} className={iconClass} />
          <span>الحجوزات</span>
        </button>

        <NavLink
  to="/auth/leaderboard"
  onClick={() => window.scrollTo(0, 0)}
  className={itemClass}
>
          <Trophy size={22} className={iconClass} />
          <span>المتصدرون</span>
        </NavLink>

        <NavLink
  to="/"
  onClick={() => window.scrollTo(0, 0)}
  className={itemClass}
>
          <Home size={22} className={iconClass} />
          <span>الرئيسية</span>
        </NavLink>

      </div>
    </div>
  );
};

export default MobileBottomNav;