import { useState } from "react";
import { Navigate } from "react-router-dom";
const Tickets = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

if (!isLoggedIn) {
  return <Navigate to="/login" />;
}
    const [selectedSeat, setSelectedSeat] = useState("");
    const handleBooking = () => {

  localStorage.setItem("selectedSeat", selectedSeat);

  alert("✅ تم حجز التذكرة بنجاح");
};
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">

      <div style={{ width: "700px", height: "500px" }} className="bg-zinc-900 min-w-[600px] min-h-[450px] rounded-3xl border border-green-400 p-10 text-center flex flex-col items-center justify-center">

        <h1 className="text-4xl font-bold text-green-400 mb-6">
          🎟️ حجز التذاكر
        </h1>

        <h2 className="text-2xl mb-4">
          GoGoal FC 
        </h2>

        <p className="text-gray-400 mb-2">
          الجمعة - 8:00 مساءً
        </p>

        <p className="text-gray-500 mb-6">
          ملعب المدينة الدولي
        </p>
        <p className="text-green-400 font-bold mb-6">
  ⏳ المباراة بعد: 12 يوم | 6 ساعات
</p>

      <div className="mt-10 flex justify-center">
        

</div>
  <button
    onClick={handleBooking}
    style={{
      width: "320px",
      height: "80px",
      fontSize: "32px",
      fontWeight: "bold",
      borderRadius: "20px",
      background: "green",
      color: "white",
      border: "none",
      cursor: "pointer"
    }}
  >
    تأكيد الحجز
  </button>

  <div className="flex justify-center gap-4 mt-6">

  <button
  onClick={() => setSelectedSeat("A1")}
  style={{ backgroundColor: "red" }}
  className={`text-white px-5 py-4 rounded-xl ${
    selectedSeat === "A1" ? "border-4 border-white" : ""
  }`}
>
  A1
</button>

 <button
  onClick={() => setSelectedSeat("A2")}
  style={{ backgroundColor: "green" }}
  className={`text-white px-5 py-4 rounded-xl ${
    selectedSeat === "A2" ? "border-4 border-white" : ""
  }`}
>
  A2
</button>

<button
  onClick={() => setSelectedSeat("A3")}
  style={{ backgroundColor: "yellow" }}
  className={`text-white px-5 py-4 rounded-xl ${
    selectedSeat === "A3" ? "border-4 border-white" : ""
  }`}
>
  A3
</button>

  <button
  onClick={() => setSelectedSeat("A4")}
  style={{ backgroundColor: "green" }}
  className={`text-white px-5 py-4 rounded-xl ${
    selectedSeat === "A4" ? "border-4 border-white" : ""
  }`}
>
  A4
</button>

<p className="text-white text-center text-2xl mt-6">
  المقعد المختار: {selectedSeat}
</p>
</div>

      </div>

    </div>
  );
};

export default Tickets;