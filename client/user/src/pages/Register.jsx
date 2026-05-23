import { useState } from "react";
const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    const userData = {
  id: Date.now(),
  name,
  email,
  age,
  position,
};

    localStorage.setItem("user", JSON.stringify(userData));

    alert("✅ تم إنشاء الحساب بنجاح");
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center text-white">
      <div className="bg-zinc-900 p-10 rounded-3xl w-[500px] border border-green-400 text-center">

        <h1 className="text-5xl font-bold text-green-400 mb-8">
          📝 إنشاء حساب
        </h1>

        <input
          type="text"
          placeholder="اسم المستخدم"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 mb-4 rounded-xl text-black text-xl"
        />

        <input
          type="tel"
          placeholder="رقم الهاتف"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-4 mb-4 rounded-xl text-black text-xl"
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 mb-6 rounded-xl text-black text-xl"
        />

        <button
          onClick={handleRegister}
          className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-2xl text-2xl font-bold"
        >
          إنشاء الحساب
        </button>

      </div>
    </div>
  );
};

export default Register;