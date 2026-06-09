import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TurfCard = ({ turf }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
 return (
  <div className="card bg-base-100 shadow-xl animate-bounce-fade-in">
    
    <figure>
      <img
        src={turf.image}
        alt={turf.name}
        className="w-full h-48 object-cover"
      />
    </figure>

    <div className="card-body">

  <h2 className="card-title text-xl">
    {turf.name}
  </h2>

  <p className="text-gray-400">
    {turf.location}
  </p>

  <p className="mt-2 text-sm">
    🕒 {turf.openTime} - {turf.closeTime}
  </p>

  <div className="mt-4">

    <div className="flex justify-between text-sm mb-1">
      <span>اللاعبون</span>

      <span>
        {turf.players || 12} / {turf.maxPlayers || 14}
      </span>
    </div>

    <progress
      className="progress progress-success w-full"
      value={turf.players || 12}
      max={turf.maxPlayers || 14}
    ></progress>

    <p className="text-green-500 text-sm mt-2">
      متبقي {(turf.maxPlayers || 14) - (turf.players || 12)} أماكن
    </p>

  </div>

  <div className="card-actions justify-end mt-4">

    <Link
      to={isLoggedIn ? `/auth/turf/${turf._id}` : `/turf/${turf._id}`}
      className="btn bg-green-500 hover:bg-green-600 text-white border-none"
    >
  احجز مكانك
    </Link>

  </div>

</div>

  </div>
);
};

export default TurfCard;
