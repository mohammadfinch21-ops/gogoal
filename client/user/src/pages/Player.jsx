import { useLocation } from "react-router-dom";
import BackButton from "../components/common/BackButton.jsx";
export default function Player() {

  const { state } = useLocation();

  const player = state?.player;

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        اللاعب غير موجود
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-white p-6 flex items-center justify-center">

     <BackButton />

      <div className="bg-black border border-[#9DFF00] rounded-3xl p-8 w-full max-w-md shadow-[0_0_30px_#9DFF00]">

        <div className="flex flex-col items-center">

          <img
  src={
    player.profileImage ||
    "https://cdn-icons-png.flaticon.com/512/147/147144.png"
  }
  alt={player.name}
  className="w-36 h-36 rounded-full border-4 border-[#9DFF00] object-cover mb-6"
/>

          <h1 className="text-4xl font-extrabold text-[#9DFF00] mb-2">
            {player.name}
          </h1>

          <p className="text-gray-400 text-lg mb-6">
            {player.position || "لاعب"}
          </p>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-zinc-900 rounded-2xl p-4 text-center">
            <p className="text-gray-400">⚽ الأهداف</p>
            <h2 className="text-3xl font-bold text-[#9DFF00]">
              {player.goals || 0}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-4 text-center">
            <p className="text-gray-400">🎯 الأسيست</p>
            <h2 className="text-3xl font-bold text-[#9DFF00]">
              {player.assists || 0}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-4 text-center">
            <p className="text-gray-400">🏟️ المباريات</p>
            <h2 className="text-3xl font-bold text-[#9DFF00]">
              {player.matches || 0}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-4 text-center">
            <p className="text-gray-400">🏅 رجل المباراة</p>
            <h2 className="text-3xl font-bold text-[#9DFF00]">
              {player.manOfTheMatch || 0}
            </h2>
          </div>

        </div>

      </div>

    </div>
  );
}