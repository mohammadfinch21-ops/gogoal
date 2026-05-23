import { createBrowserRouter } from "react-router-dom";

import Root from "./layouts/Root";
import ProtectedLayout from "./layouts/ProtectedLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/auth/SignUp";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import MyTickets from "./pages/MyTickets";
import Booking from "./pages/Booking";

import Turf from "./components/turf/Turf";
import TurfDetails from "./components/turf/TurfDetails";
import Reservation from "./components/Reservation";
import TurfBookingHistory from "./components/turf/TurfBookingHistory";

import BecomeOwner from "./features/becomeOwner/BecomeOwner";

import NotFound from "./components/common/NotFound";
import Leaderboard from "./pages/Leaderboard";
import Admin from "./pages/Admin";
import Player from "./pages/Player";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,

    children: [
      {
        index: true,
        element: <Home />,
      },

     
      {
        path: "register",
        element: <Register />,
      },

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "signup",
        element: <SignUp />,
      },


      {
        path: "mytickets",
        element: <MyTickets />,
      },

    ],
  },

  {
    path: "/auth",
    element: <ProtectedLayout />,
    errorElement: <NotFound />,
    children: [

       {
  path: "profile",
  element: <Profile />,
},

{
  path: "booking",
  element: <Booking />,
},

{
  path: "leaderboard",
  element: <Leaderboard />,
},

{
  path: "admin",
  element: <Admin />,
},
{
  path: "player",
  element: <Player />,
},
      {
        path: "turfs",
        element: <Turf />,
      },

      {
        path: "turf/:id",
        element: <TurfDetails />,
      },

      {
        path: "reserve/:id",
        element: <Reservation />,
      },

      {
        path: "become-owner",
        element: <BecomeOwner />,
      },

      {
        path: "booking-history",
        element: <TurfBookingHistory />,
      },

    ],
  },
]);

export default router;