import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";
const Login = () => {
  const [phone, setPhone] = useState("");
const [pin, setPin] = useState("");

  const handleLogin = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));

  const users = querySnapshot.docs.map((doc) => ({
    firebaseId: doc.id,
    ...doc.data(),
  }));

  const foundUser = users.find(
    (user) =>
      String(user.phone).trim() === String(phone).trim() &&
      String(user.pin).trim() === String(pin).trim()
  );

  if (foundUser) {
    localStorage.setItem("user", JSON.stringify(foundUser));
    localStorage.setItem("isLoggedIn", "true");

    toast.success(`أهلاً ${foundUser.name} 🎉`, {
      duration: 4000,
    });

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  } else {
    toast.error("رقم الهاتف أو PIN غير صحيح ❌", {
      duration: 4000,
    });
  }
};

return (
  <div className="min-h-screen bg-black flex justify-center items-center text-white">

    <div className="bg-zinc-900 p-10 rounded-3xl w-[500px] border border-green-400 text-center">

      <h1 className="text-5xl font-bold text-green-400 mb-8">
        🔐 تسجيل الدخول
      </h1>

      <input
        type="tel"
        placeholder="رقم الهاتف"
        dir="rtl"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-4 rounded-xl text-white text-right mb-4 bg-black border border-green-500"
      />

      <input
        type="password"
        placeholder="PIN مكون من 4 أرقام"
        dir="rtl"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        className="w-full p-4 rounded-xl text-white text-right mb-6 bg-black border border-green-500"
      />

      <button
        onClick={handleLogin}
        className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-2xl text-2xl font-bold"
      >
        تسجيل الدخول
      </button>
<p className="text-gray-400 mt-6">
  ليس لديك حساب؟{" "}
  <Link
    to="/signup"
    className="text-green-400 hover:text-green-300 font-bold"
  >
    إنشاء حساب
  </Link>
</p>
      </div>
      
    </div>
    
  ); 
  
};

export default Login;