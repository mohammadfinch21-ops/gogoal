import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/common/BackButton.jsx";
const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const playersSnapshot = await getDocs(collection(db, "users"));

      const sortedPlayers = playersSnapshot.docs
  .map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  // نخفي اللاعبين اللي كل احصائياتهم صفر
  .filter(
    (player) =>
      (player.goals || 0) > 0 ||
      (player.assists || 0) > 0 ||
      (player.matches || 0) > 0
  )

  .sort(
    (a, b) =>
      (b.goals || 0) - (a.goals || 0) ||
      (b.assists || 0) - (a.assists || 0) ||
      (b.matches || 0) - (a.matches || 0)
  );

setPlayers(sortedPlayers);
    };

    fetchData();
  }, []);

  const topThree = players.slice(0, 3);
  const restPlayers = players.slice(3);

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">

     <BackButton />

      <h1 className="text-3xl md:text-5xl font-bold text-center text-green-500 mb-12">
        المتصدرون 🏆
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

        <div className="bg-yellow-500 text-black rounded-3xl p-8 text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">🥇 المركز الأول</h2>
          <img
  src={
    topThree[0]?.profileImage ||
    "https://cdn-icons-png.flaticon.com/512/147/147144.png"
  }
  alt={topThree[0]?.name}
  className="w-28 h-28 rounded-full border-4 border-white mx-auto mb-4 object-cover shadow-[0_0_20px_white]"
/>

<h3 className="text-2xl font-bold">
  <button
    onClick={() =>
      navigate("/auth/player", {
        state: { player: topThree[0] },
      })
    }
    className="text-black font-extrabold hover:text-white transition-all duration-300"
  >
    {topThree[0]?.name || "غير موجود"}
  </button>
</h3>
          <p className="mt-4 text-xl">⚽ {topThree[0]?.goals || 0} هدف</p>
          <p className="text-xl">🎯 {topThree[0]?.assists || 0} أسيست</p>
        </div>

        <div className="bg-gray-300 text-black rounded-3xl p-8 text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">🥈 المركز الثاني</h2>
          <img
  src={
    topThree[1]?.profileImage ||
    "https://cdn-icons-png.flaticon.com/512/147/147144.png"
  }
  alt={topThree[1]?.name}
  className="w-28 h-28 rounded-full border-4 border-white mx-auto mb-4 object-cover shadow-[0_0_20px_white]"
/>

<h3 className="text-2xl font-bold">
  <button
    onClick={() =>
      navigate("/auth/player", {
        state: { player: topThree[1] },
      })
    }
    className="text-black font-extrabold hover:text-white transition-all duration-300"
  >
    {topThree[1]?.name || "غير موجود"}
  </button>
</h3>
          <p className="mt-4 text-xl">⚽ {topThree[1]?.goals || 0} هدف</p>
          <p className="text-xl">🎯 {topThree[1]?.assists || 0} أسيست</p>
        </div>

        <div className="bg-orange-700 text-black rounded-3xl p-8 text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">🥉 المركز الثالث</h2>
          <img
  src={
    topThree[2]?.profileImage ||
    "https://cdn-icons-png.flaticon.com/512/147/147144.png"
  }
  alt={topThree[2]?.name}
  className="w-28 h-28 rounded-full border-4 border-white mx-auto mb-4 object-cover shadow-[0_0_20px_white]"
/>

<h3 className="text-2xl font-bold">
  <button
    onClick={() =>
      navigate("/auth/player", {
        state: { player: topThree[2] },
      })
    }
    className="text-black font-extrabold hover:text-white transition-all duration-300"
  >
    {topThree[2]?.name || "غير موجود"}
  </button>
</h3>
          <p className="mt-4 text-xl">⚽ {topThree[2]?.goals || 0} هدف</p>
          <p className="text-xl">🎯 {topThree[2]?.assists || 0} أسيست</p>
        </div>

      </div>

      <div className="overflow-x-auto">
        <table className="table bg-black text-white rounded-3xl">
          <thead>
            <tr className="text-green-400 text-lg">
              <th>#</th>
              <th>اللاعب</th>
              <th>الأهداف ⚽</th>
              <th>الأسيست 🎯</th>
              <th>المباريات 🏟️</th>
              <th>المستوى ⭐</th>
            </tr>
          </thead>

          <tbody>
            {restPlayers.map((player, index) => (
              <tr key={player.id}>
                <td className="font-bold text-green-400">
                  #{index + 4}
                </td>
                <td>
  <button
    onClick={() =>
      navigate("/auth/player", {
        state: { player },
      })
    }
    className="text-[#9DFF00] font-bold hover:underline"
  >
    {player.name || "-"}
  </button>
</td>
                <td>{player.goals || 0}</td>
                <td>{player.assists || 0}</td>
                <td>{player.matches || 0}</td>
                <td>{player.level || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Leaderboard;