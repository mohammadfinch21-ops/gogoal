import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import toast from "react-hot-toast";
import BackButton from "../components/common/BackButton.jsx";

export default function Booking() {

  const location = useLocation();
  const navigate = useNavigate();

  const [ticketType, setTicketType] = useState("لاعب");

const match = location.state?.match || "Tuesday";

const price = ticketType === "لاعب" ? 5 : 3;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

     <BackButton />

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md text-center">

        {/* اختيار نوع التذكرة */}

<div className="flex justify-center gap-4 my-6">

  <button
    onClick={() => setTicketType("لاعب")}
    className={`px-6 py-3 rounded-xl font-bold transition-all ${
      ticketType === "لاعب"
        ? "bg-green-500 text-white"
        : "bg-gray-200 text-black"
    }`}
  >
    ⚽ لاعب
  </button>

  <button
    onClick={() => setTicketType("حارس")}
    className={`px-6 py-3 rounded-xl font-bold transition-all ${
      ticketType === "حارس"
        ? "bg-green-500 text-white"
        : "bg-gray-200 text-black"
    }`}
  >
    🥅 حارس
  </button>

</div>

<div className="text-7xl mb-4">
  {ticketType === "حارس" ? "🥅" : "⚽"}
</div>

<h2 className="text-3xl font-bold mb-4">
  تذكرة {ticketType}
</h2>

<p className="text-6xl font-extrabold text-primary mb-6">
  {price} JD
</p>
       <button
  onClick={async () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const ticketsSnapshot = await getDocs(
  collection(db, "tickets")
);

const tickets = ticketsSnapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

    const alreadyBooked = tickets.some(
      (ticket) =>
        ticket.ownerId === user.id &&
        ticket.match === match
    );

    if (alreadyBooked) {
      toast.error("لديك تذكرة محجوزة مسبقًا لهذه المباراة 🎟️");
      return;
    }

    const newTicket = {
      type: ticketType,
      price,
      match,
      name: user.name,
      phone: user.phone,
      age: user.age,
      position: user.position,
      ownerId: user.id,
      bookedAt: new Date().toLocaleString(),
    };

    await addDoc(collection(db, "tickets"), newTicket);
    toast.success("تم حجز تذكرتك بنجاح ⚽🎟️");
    navigate("/");
  }}
  className="btn bg-black text-white border-none hover:bg-gray-800 w-full"
>
  تأكيد الدفع
</button>
      </div>

    </div>
    
  );
  
}
