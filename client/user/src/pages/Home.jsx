import { Link } from "react-router-dom";
import Carousel from "../components/common/Carousel";
import useTurfData from "../hooks/useTurfData";
import TurfCard from "../components/turf/TurfCard";
import TurfCardSkeleton from "../components/ui/TurfCardSkeleton";
import { useSelector } from "react-redux";
import banner1 from "/banner-1.png"
import banner2 from "/banner-2.jpeg"
import banner3 from "/banner-3.jpeg"
import { useEffect, useState } from "react";
import { db } from "../firebase";

import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Home = () => {
  const [tickets, setTickets] = useState([]);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  const { turfs, loading } = useTurfData();
  const slides = [ banner1, banner2, banner3];

const [tuesdayTimeLeft, setTuesdayTimeLeft] = useState({});
const [fridayTimeLeft, setFridayTimeLeft] = useState({});
const [matches, setMatches] = useState([]);
useEffect(() => {

  const fetchData = async () => {

    // المباريات
    const snapshot = await getDocs(
      collection(db, "matches")
    );

    const matchesData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setMatches(matchesData);

    // التذاكر
    const ticketsSnapshot = await getDocs(
      collection(db, "tickets")
    );

    setTickets(
      ticketsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );

  };

  fetchData();

}, []);
const tuesdayMatch = matches.find((m) => m.id === "tuesday");
const fridayMatch = matches.find((m) => m.id === "friday");

const tuesdayPlayers =
  tickets.filter((ticket) => ticket.match === "Tuesday").length;

const fridayPlayers =
  tickets.filter((ticket) => ticket.match === "Friday").length;

useEffect(() => {
  const calculateTimeLeft = (matchDate) => {
    const now = new Date();
    const difference = matchDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
    };
  };

  const updateCountdowns = () => {

  if (tuesdayMatch?.date) {
    setTuesdayTimeLeft(
      calculateTimeLeft(
        new Date(`${tuesdayMatch.date}T20:00:00`)
      )
    );
  }

  if (fridayMatch?.date) {
    setFridayTimeLeft(
      calculateTimeLeft(
        new Date(`${fridayMatch.date}T20:00:00`)
      )
    );
  }

};

  updateCountdowns();

  const timer = setInterval(updateCountdowns, 1000);

  return () => clearInterval(timer);
}, [matches]);

const TicketCard = ({ match, icon }) => (
  <div className="rounded-3xl p-8 w-full max-w-sm mx-auto text-center bg-black border border-green-500 shadow-2xl">

    <div className="text-6xl mb-4">
      {icon}
    </div>

    <h3 className="font-bold text-3xl mb-4 text-green-400">
      {match === "Tuesday"
        ? "مباراة الثلاثاء ⚽"
        : "مباراة الجمعة ⚽"}
    </h3>

    <p className="text-gray-400 mb-6">
      اختر لاعب أو حارس داخل صفحة الحجز
    </p>

    <Link
      to={localStorage.getItem("isLoggedIn") === "true" ? "/auth/booking" : "/login"}
      state={{ match }}
      className="mt-4 flex items-center justify-center w-full bg-[#9DFF00] hover:bg-[#7CFF00] text-black text-xl font-bold rounded-2xl py-4 transition-all duration-300 shadow-[0_0_25px_#9DFF00]"
    >
      احجز مكانك
    </Link>

  </div>
);
  return (
    <div className="min-min-h-[70vh] md:min-h-screen bg-base-100 text-base-content">
      <div className="hero min-h-[55vh] bg-base-200 overflow-hidden rounded-b-3xl shadow-[0_20px_60px_rgba(34,197,94,0.25)] -mt-0">
        <div className="hero-content relative flex-col animate-slide-in-right">
        <div className="absolute inset-0 opacity-20">
  <img
    src={slides[3 * Math.random() | 0]}
    alt="background banner"
    className="w-full h-full object-cover"
  />
</div>

          <div className="w-full animate-zoom-in">
            <div
  className="flex flex-col items-center gap-6 relative z-20"
>

  <img
    src="/gogoal-logo.png"
    alt="GoGoal"
    className="w-44 h-44 md:w-52 md:h-52 rounded-3xl shadow-[0_0_50px_#22c55e]"
  />

  <span
  className="
    text-5xl
    md:text-6xl
    font-black
    italic
    tracking-normal
    leading-none
  "
  style={{
    fontFamily: "Orbitron",
  }}
>

  <h1 className="text-6xl md:text-7xl font-extrabold text-center mb-6 tracking-wide">
  <span className="text-white">Go</span>
  <span className="text-[#9DFF00] drop-shadow-[0_0_20px_#9DFF00]">
    Goal
  </span>
</h1>

</span>

</div>
            <p className="text-gray-200 text-xl md:text-2xl text-center mb-8 font-semibold">
              احجز مكانك الآن وادخل أجواء أقوى مباريات GoGoal ⚽🔥
            </p>
        
            <button
  onClick={() => {

    const section =
      document.getElementById("ticketCards");

    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  }}
  className="mt-4 btn w-full bg-[#9DFF00] hover:bg-[#7CFF00] border-none text-black text-xl font-bold rounded-2xl h-16 transition-all duration-300 hover:scale-105 shadow-[0_0_25px_#9DFF00]"
>
 احجز مكانك
</button>

          </div>
        </div>
      </div>

      <div className="py-16 px-6 bg-base-200">

  <h2 className="text-4xl font-bold text-center mb-10 text-green-500">
    المباريات القادمة
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

    {/* Tuesday Match */}
    
    <div style={{ scrollMarginTop: "120px" }} className="card bg-black shadow-2xl border border-green-500">

      <div className="card-body">
     
        <h2 id="tuesdayTickets" className="card-title text-2xl text-green-400">
          مباراة الثلاثاء ⚽
        </h2>

        <p>📅 {tuesdayMatch?.date}</p>

        <p>📍{tuesdayMatch?.stadium || "جاري التحميل"}</p>

        <div className="mt-4">

          <div className="flex justify-between text-sm mb-1">
            <span>اللاعبون</span>
            <span>{tuesdayPlayers} / 14</span>
          </div>

          <progress
            className="progress progress-success w-full"
            value={tuesdayPlayers}
            max="14"
          ></progress>

          <p className="text-green-500 text-sm mt-2">
            متبقي {14 - tuesdayPlayers} أماكن
          </p>
<div className="flex flex-wrap gap-2 md:gap-4 mt-4 justify-center">

  <div className="bg-black border border-green-500 rounded-2xl px-3 md:px-4 py-3 text-center w-20 md:w-24">
    <p className="text-2xl md:text-3xl font-bold text-green-400">
      {tuesdayTimeLeft.days || 0}
    </p>

    <span className="text-sm text-gray-400">
      يوم
    </span>
  </div>

  <div className="bg-black border border-green-500 rounded-2xl px-3 md:px-4 py-3 text-center w-20 md:w-24">
    <p className="text-2xl md:text-3xl font-bold text-green-400">
      {tuesdayTimeLeft.hours || 0}
    </p>

    <span className="text-sm text-gray-400">
      ساعة
    </span>
  </div>

  <div className="bg-black border border-green-500 rounded-2xl px-3 md:px-4 py-3 text-center w-20 md:w-24">
    <p className="text-2xl md:text-3xl font-bold text-green-400">
      {tuesdayTimeLeft.minutes || 0}
    </p>

    <span className="text-sm text-gray-400">
      دقيقة
    </span>
  </div>

</div>
        </div>
      {tuesdayMatch?.isOpen ? (
       <button
  onClick={() => {
    document.getElementById("tuesdayTicketCard")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }}
  className="mt-4 btn w-full bg-[#9DFF00] hover:bg-[#7CFF00] border-none text-black text-xl font-bold rounded-2xl h-16 transition-all duration-300 hover:scale-105 shadow-[0_0_25px_#9DFF00]"
>
 احجز مكانك
</button>
  ) : (
  <button className="btn bg-gray-600 border-none text-white mt-4" disabled>
    الحجز مغلق
  </button>
)}
      </div>

    </div>

    {/* Thursday Match */}
    <div style={{ scrollMarginTop: "120px" }} className="card bg-black shadow-2xl border border-green-500">

      <div className="card-body">
      
        <h2 id="fridayTickets" className="card-title text-2xl text-green-400">
          مباراة الجمعة ⚽
        </h2>
        <p>📅 {fridayMatch?.date}</p>

        <p>📍{fridayMatch?.stadium || "جاري التحميل"}</p>

        <div className="mt-4">

          <div className="flex justify-between text-sm mb-1">
            <span>اللاعبون</span>
            <span>{fridayPlayers} / 14</span>
          </div>

          <progress
            className="progress progress-success w-full"
            value={fridayPlayers}
            max="14"
          ></progress>

          <p className="text-green-500 text-sm mt-2">
            متبقي {14 - fridayPlayers} أماكن
          </p>
<div className="flex flex-wrap gap-2 md:gap-4 mt-4 justify-center">

  <div className="bg-black border border-green-500 rounded-2xl px-3 md:px-4 py-3 text-center w-20 md:w-24">
    <p className="text-2xl md:text-3xl font-bold text-green-400">
      {fridayTimeLeft.days || 0}
    </p>

    <span className="text-sm text-gray-400">
      يوم
    </span>
  </div>

  <div className="bg-black border border-green-500 rounded-2xl px-3 md:px-4 py-3 text-center w-20 md:w-24">
    <p className="text-2xl md:text-3xl font-bold text-green-400">
      {fridayTimeLeft.hours || 0}
    </p>

    <span className="text-sm text-gray-400">
      ساعة
    </span>
  </div>

  <div className="bg-black border border-green-500 rounded-2xl px-3 md:px-4 py-3 text-center w-20 md:w-24">
    <p className="text-2xl md:text-3xl font-bold text-green-400">
      {fridayTimeLeft.minutes || 0}
    </p>

    <span className="text-sm text-gray-400">
      دقيقة
    </span>
  </div>

</div>
        </div>
       {fridayMatch?.isOpen ? (
       <button
  onClick={() => {
    document.getElementById("fridayTicketCard")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }}
   className="mt-4 btn w-full bg-[#9DFF00] hover:bg-[#7CFF00] border-none text-black text-xl font-bold rounded-2xl h-16 transition-all duration-300 hover:scale-105 shadow-[0_0_25px_#9DFF00]"
>
احجز مكانك
</button>
) : (
  <button className="btn bg-gray-600 border-none text-white mt-4" disabled>
    الحجز مغلق
  </button>
)}
      </div>

    </div>
   
  <div

  className="py-16 px-6"
>
<div className="text-center mb-12">

  <h2 className="text-4xl font-bold mb-10 text-green-500">
    بطاقات الحجز ⚽
    
  </h2>

</div>
  {tickets.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    
      {tickets.map((ticket, index) => {
      const userData =
  JSON.parse(localStorage.getItem("user")) || {};
  
        return (
          
          
          <div
            key={index}
            className="bg-black border border-green-500 rounded-3xl p-6 shadow-xl"
          >
          
          
            <h3 className="text-2xl font-bold text-green-400 mb-4">
              {ticket.name}
            </h3>

            <p className="text-gray drop-shadow-lg mb-2">
              🎫 {ticket.type}
            </p>
<p className="text-gray-400 mb-2">
  📅 المباراة: {ticket.match === "Tuesday" ? "الثلاثاء" : "الجمعة"}
</p>
            <p className="text-gray-400 mb-2">
              🎯 المركز: {ticket.position}
            </p>

            <p className="text-gray-400 mb-2">
              🎂 العمر: {ticket.age}
            </p>

           <p
  className={`text-sm mt-4 ${
    ticket.status === "paid"
      ? "text-green-400"
      : "text-yellow-400"
  }`}
>
  {ticket.status === "paid"
    ? "✅ تم تأكيد الدفع"
    : "⏳ بانتظار الدفع"}
</p>
           
       {localStorage.getItem("isLoggedIn") &&
 ticket.ownerId &&
 userData.id === ticket.ownerId && (

  <button
  onClick={async () => {
    console.log("ticket id:", ticket.id);

    await deleteDoc(
      doc(db, "tickets", ticket.id)
    );

    setTickets(
      tickets.filter((t) => t.id !== ticket.id)
    );
  }}
  className="mt-4 inline-flex items-center justify-center bg-[#f80303] hover:bg-[#f80606] text-black font-bold rounded-2xl px-2 py-2 transition-all duration-300 shadow-[0_0_25px_#9DFF00]"
>
  
  إلغاء التذكرة
</button>

)}
          </div>

        );

      })}

    </div>

  ) : (

    <p className="text-center text-gray-400">
      لا يوجد حجوزات حالياً
    </p>

  )}

</div>

  </div>

</div>


   
     
<div id="ticketCards" className="container mx-auto py-20 px-4">
  <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
    أسعار التذاكر
  </h2>

  <div className="flex justify-center">
  <h3 className="inline-block text-3xl font-bold text-center text-green-400 mb-6 bg-black border border-green-500 rounded-2xl py-3 px-8">
    تذاكر مباراة الثلاثاء ⚽
  </h3>
</div>

 <div id="tuesdayTicketCard" className="flex justify-center mb-14">
  <TicketCard match="Tuesday" icon="🎟️" />
</div>

  <div className="flex justify-center">
  <h3 className="inline-block text-3xl font-bold text-center text-green-400 mb-6 bg-black border border-green-500 rounded-2xl py-3 px-8">
    تذاكر مباراة الجمعة ⚽
  </h3>
</div>

  <div id="fridayTicketCard" className="flex justify-center mb-14">
  <TicketCard match="Friday" icon="🎟️" />
</div>


</div>
</div>
      
  );
};

export default Home;
