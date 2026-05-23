import { CalendarDays, Ticket, Timer } from "lucide-react";
import Profile from "./pages/Profile";
import { CalendarDays, Ticket, Timer } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* HERO SECTION */}
      <div className="relative h-screen flex flex-col items-center justify-center text-center px-6">

        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>

        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold text-green-500 mb-4">
            GoGoal
          </h1>

          <p className="text-xl text-gray-300 mb-8">
            Book your next football match ticket instantly
          </p>

          <button className="bg-green-500 hover:bg-green-600 transition px-8 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-green-500/40">
            Book Ticket
          </button>
        </div>
      </div>

      {/* NEXT MATCH */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-green-400">
          Upcoming Match
        </h2>

        <div className="bg-zinc-900 rounded-3xl p-8 border border-green-500/20 shadow-xl">

          <div className="flex items-center justify-between flex-wrap gap-6">

            <div>
              <h3 className="text-3xl font-bold mb-2">
                GoGoal FC vs Kings FC
              </h3>

              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <CalendarDays size={18} />
                Friday - 8:00 PM
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <Timer size={18} />
                Stadium Arena
              </div>
            </div>

            <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-2xl font-bold">
              <Ticket size={20} />
              Buy Ticket
            </button>

          </div>
        </div>
      </section>

      {/* PLAYER PROFILE */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-green-400">
          Player Profile
        </h2>

        <div className="bg-zinc-900 rounded-3xl p-8 border border-green-500/20 shadow-xl flex flex-col md:flex-row items-center gap-8">

          <img
            src="https://i.pravatar.cc/300"
            alt="player"
            className="w-40 h-40 rounded-full border-4 border-green-500"
          />

          <div>
            <h3 className="text-3xl font-bold mb-2">
              Ahmed Ali
            </h3>

            <p className="text-green-400 text-lg mb-4">
              Forward Player ⚽
            </p>

            <div className="grid grid-cols-2 gap-4 text-gray-300">
              <div className="bg-black/40 p-4 rounded-xl">
                Goals: 24
              </div>

              <div className="bg-black/40 p-4 rounded-xl">
                Matches: 18
              </div>

              <div className="bg-black/40 p-4 rounded-xl">
                Assists: 11
              </div>

              <div className="bg-black/40 p-4 rounded-xl">
                Rating: 9.2
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}