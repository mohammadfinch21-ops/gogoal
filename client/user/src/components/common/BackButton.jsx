import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-24 right-4 z-[999] bg-[#9DFF00] hover:bg-[#7CFF00] text-black font-bold px-5 py-3 rounded-2xl transition-all duration-300 shadow-[0_0_20px_#9DFF00]"
    >
      ← رجوع
    </button>
  );
}

export default BackButton;