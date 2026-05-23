const MyTickets = () => {

  const username = localStorage.getItem("username");
  const selectedSeat = localStorage.getItem("selectedSeat");

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">

      <div className="bg-zinc-900 p-10 rounded-3xl border border-green-500 w-[500px] text-center">

        <h1 className="text-5xl font-bold text-green-400 mb-8">
          🎫 تذاكري
        </h1>

        <p className="text-2xl mb-4">
          👤 المستخدم: {username}
        </p>

        <p className="text-2xl mb-4">
          🪑 المقعد: {selectedSeat}
        </p>

        <p className="text-2xl">
          ⚽ المباراة: GoGoal Team
        </p>

      </div>

    </div>
  );
};

export default MyTickets;