import { useEffect, useState } from "react";
import { db } from "../firebase";
import {collection,getDocs,deleteDoc,doc,updateDoc,} from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import BackButton from "../components/common/BackButton.jsx";

export default function Admin() {

const user =
  JSON.parse(localStorage.getItem("user"));

const [search, setSearch] = useState("");


if (user?.phone !== "0788246916") {
  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white text-4xl font-bold">
      🚫 غير مصرح لك
    </div>
  );
}

  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const ticketsSnapshot = await getDocs(collection(db, "tickets"));
      const usersSnapshot = await getDocs(collection(db, "users"));
        const matchesSnapshot = await getDocs(collection(db, "matches"));

setMatches(
  matchesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
);

      setTickets(
        ticketsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );

      setUsers(
  usersSnapshot.docs.map((doc) => ({
    firebaseId: doc.id,
    ...doc.data(),
  }))
);
    };

    fetchData();
  }, []);
const updatePlayerStat = async (player, field, amount) => {
  const currentValue = Number(player[field] || 0);
  const newValue = Math.max(currentValue + amount, 0);

  await updateDoc(doc(db, "users", player.firebaseId), {
    [field]: newValue,
  });

  setUsers(
    users.map((u) =>
      u.firebaseId === player.firebaseId
        ? { ...u, [field]: newValue }
        : u
    )
  );
};
  return (
    <div className="min-h-screen bg-base-100 text-base-content p-6">

      <BackButton />

      <h1 className="text-4xl font-bold text-green-500 text-center mb-8">
        لوحة التحكم
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-black border border-green-500 rounded-2xl p-6 text-center">
          <h2 className="text-xl text-gray-400">عدد المستخدمين</h2>
          <p className="text-5xl font-bold text-green-400">{users.length}</p>
        </div>

        <div className="bg-black border border-green-500 rounded-2xl p-6 text-center">
          <h2 className="text-xl text-gray-400">عدد الحجوزات</h2>
          <p className="text-5xl font-bold text-green-400">{tickets.length}</p>
        </div>

        <div className="bg-black border border-green-500 rounded-2xl p-6 text-center">
          <h2 className="text-xl text-gray-400">إجمالي المبيعات</h2>
          <p className="text-5xl font-bold text-green-400">
            {tickets.reduce((total, ticket) => total + Number(ticket.price || 0), 0)} JD
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-green-500 mb-6">
        الحجوزات
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {tickets.map((ticket) => (

          <div
            key={ticket.id}
            className="bg-black border border-green-500 rounded-2xl p-4 max-w-xs w-full"
          >
            <h3 className="text-2xl font-bold text-green-400 mb-3">
              {ticket.name}
            </h3>

            <p>📱 الهاتف: {ticket.phone || "غير موجود"}</p>
            <p>🎫 النوع: {ticket.type}</p>
            <p>⚽ المباراة: {ticket.match === "Tuesday" ? "الثلاثاء" : "الجمعة"}</p>
            <p>📍 المركز: {ticket.position}</p>
            <p>💰 السعر: {ticket.price} JD</p>
            <p>🕒 التاريخ: {ticket.bookedAt}</p>
            <button
              onClick={async () => {
                await deleteDoc(doc(db, "tickets", ticket.id));
                setTickets(tickets.filter((t) => t.id !== ticket.id));
              }}
              className="btn bg-red-500 text-white border-none hover:bg-red-600 mt-4"
            >
              حذف
            </button>
          </div>
        ))}
      </div>   

       
     <h2 className="text-3xl font-bold text-green-500 mt-16 mb-6">
  إدارة اللاعبين ⚽
</h2>
<div className="mb-6 flex justify-start">
  <input
    type="text"
    placeholder="ابحث عن لاعب..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="input input-bordered w-full md:w-96 bg-black text-white border-green-500"
  />
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">

  {users
  .filter((user) =>
    user.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((user) => (

    <div
      key={user.firebaseId}
      className="bg-black border border-green-500 rounded-2xl p-4 max-w-xs w-full"
    >

      <h3 className="text-2xl font-bold text-green-400 mb-4">
        {user.name}
      </h3>


     <div className="grid grid-cols-1 gap-3 mt-4">

  {[
    ["goals", "⚽ الأهداف"],
    ["assists", "🎯 الأسيست"],
    ["matches", "🏟️ المباريات"],
    ["yellowCards", "🟨 صفراء"],
    ["redCards", "🟥 حمراء"],
    ["manOfTheMatch", "🏅 رجل المباراة"],
    ["manOfTheMonth", "👑 رجل الشهر"],
  ].map(([field, label]) => (
    <div
      key={field}
      className="flex items-center justify-between bg-zinc-900 rounded-xl px-3 py-2"
    >
      <span cclassName="font-bold">
  {label} {user[field] || 0}
</span>

      <div className="flex gap-2">
        <button
          onClick={() => updatePlayerStat(user, field, -1)}
          className="btn btn-sm bg-red-500 text-white border-none"
        >
          -
        </button>

        <button
          onClick={() => updatePlayerStat(user, field, 1)}
          className="btn btn-sm bg-green-500 text-white border-none"
        >
          +
        </button>
      </div>
    </div>
  ))}

</div>

    </div>

  ))}

</div>

<h2 className="text-3xl font-bold text-green-500 mt-16 mb-6">
  إدارة المباريات ⚽
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {matches.map((match) => (

    <div
      key={match.id}
      className="bg-black border border-green-500 rounded-2xl p-4 max-w-md"
    >

      <h3 className="text-2xl font-bold text-green-400 mb-4">
        {match.name}
      </h3>

      <p className="mb-2">
        📅 التاريخ: {match.date}
      </p>

      <p className="mb-4">
        ⏰ الوقت: {match.time}
      </p>
        
      <p className="mb-4">
  🏟️ الملعب: {match.stadium}
</p>

      <button
        onClick={async () => {

          const newDate = prompt("اكتب التاريخ الجديد", match.date);

          if (!newDate) return;

          await updateDoc(doc(db, "matches", match.id), {
            date: newDate,
          });

          setMatches(
            matches.map((m) =>
              m.id === match.id
                ? { ...m, date: newDate }
                : m
            )
          );
        }}
        className="btn bg-green-500 text-white border-none hover:bg-green-600 w-full"
      >
        تعديل التاريخ
      </button>
      
     <button
  onClick={async () => {

    const newStadium = prompt(
      "اكتب اسم الملعب الجديد",
      match.stadium
    );

    if (!newStadium) return;

    await updateDoc(doc(db, "matches", match.id), {
      stadium: newStadium,
    });

    setMatches(
      matches.map((m) =>
        m.id === match.id
          ? { ...m, stadium: newStadium }
          : m
      )
    );

  }}
  className="btn bg-blue-500 text-white border-none hover:bg-blue-600 w-full mt-3"
>
  تعديل الملعب
</button>

<button
  onClick={async () => {
    const newStatus = !match.isOpen;

    await updateDoc(doc(db, "matches", match.id), {
      isOpen: newStatus,
    });

    setMatches(
      matches.map((m) =>
        m.id === match.id
          ? { ...m, isOpen: newStatus }
          : m
      )
    );
  }}
  className={`btn text-white border-none w-full mt-3 ${
    match.isOpen
      ? "bg-red-500 hover:bg-red-600"
      : "bg-green-500 hover:bg-green-600"
  }`}
>
  {match.isOpen ? "إغلاق الحجز" : "فتح الحجز"}
</button>

    </div>

  ))}

</div>
    </div>

  );
}