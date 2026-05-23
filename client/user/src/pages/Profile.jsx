import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import BackButton from "../components/common/BackButton.jsx";


const Profile = () => {
  const localUser =
  JSON.parse(localStorage.getItem("user")) || {};

const [user, setUser] = useState(localUser);
const [uploadingImage, setUploadingImage] = useState(false);
  useEffect(() => {

    
  const fetchUser = async () => {

    if (!localUser?.id) return;

    const usersSnapshot = await getDocs(collection(db, "users"));

    const foundUser = usersSnapshot.docs
  .map((doc) => ({
    firebaseId: doc.id,
    ...doc.data(),
  }))
  .find((u) => u.id === localUser.id);

    if (foundUser) {

      setUser(foundUser);

      localStorage.setItem(
        "user",
        JSON.stringify(foundUser)
      );

    }

  };

  fetchUser();

}, []);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name || "");
  const [editedAge, setEditedAge] = useState(user.age || "");
  const [editedPosition, setEditedPosition] = useState(user.position || "");
const [tickets, setTickets] = useState([]);

const handleImageChange = async (e) => {
  const file = e.target.files[0];

  if (!file) return;
  
  setUploadingImage(true);
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "gogoal_upload");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dp3jlc36a/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const uploadedImage = await res.json();
  
  if (!uploadedImage.secure_url) {
  alert("فشل رفع الصورة");
  setUploadingImage(false);
  return;
}
  const updatedUser = {
    ...user,
    profileImage: uploadedImage.secure_url,
  };

  await updateDoc(doc(db, "users", user.firebaseId), {
    profileImage: uploadedImage.secure_url,
  });

  localStorage.setItem("user", JSON.stringify(updatedUser));
  setUser(updatedUser);
  setUploadingImage(false);
};
  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center p-6">

  <BackButton />

      <div className="bg-black text-white rounded-3xl shadow-2xl p-10 w-full max-w-md border border-green-500">

        <div className="flex flex-col items-center gap-4 text-center">

          {user?.profileImage ? (

  <img
  src={user.profileImage}
  alt="الصورة الشخصية"
  className="w-28 h-28 rounded-full object-cover border-4 border-green-500 mx-auto"
/>
  

) : (

  <div className="w-28 h-28 rounded-full bg-green-500 flex items-center justify-center text-4xl font-bold">
    {user?.name?.charAt(0) || "G"}
  </div>

)}

          <h1 className="text-3xl font-bold text-green-400">
            {user?.name || "مستخدم"}
          </h1>

          <p className="text-gray-400">
            {user?.phone || "لا يوجد رقم هاتف"}
          </p>
         
         <button
  onClick={() => setIsEditing(!isEditing)}
  className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-none mt-2"
>
  تعديل الصفحة الشخصية
</button>
{isEditing && (

  <div className="flex flex-col gap-4 mt-6 w-full">

    <input
      type="text"
      value={editedName}
      onChange={(e) => setEditedName(e.target.value)}
      placeholder="الاسم"
      className="input input-bordered w-full bg-black text-white"
    />

    <input
      type="number"
      value={editedAge}
      onChange={(e) => setEditedAge(e.target.value)}
      placeholder="العمر"
      className="input input-bordered w-full bg-black text-white"
    />

    <input
      type="text"
      value={editedPosition}
      onChange={(e) => setEditedPosition(e.target.value)}
      placeholder="المركز"
      className="input input-bordered w-full bg-black text-white"
    />
<input
  type="file"
  accept="image/*"
  onChange={handleImageChange}
  disabled={uploadingImage}
  className="file-input file-input-bordered w-full bg-black text-white"
/>

  {uploadingImage && (
  <p className="text-[#9DFF00] text-sm">
    جاري رفع الصورة...
  </p>
)}

    <button
      onClick={() => {

       const updatedUser = {
  ...user,
  name: editedName,
  age: editedAge,
  position: editedPosition,
};

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        localStorage.removeItem("newProfileImage");

        setIsEditing(false);

        window.location.reload();
      }}
      className="btn bg-green-500 hover:bg-green-600 border-none text-white"
    >
      حفظ التعديلات
    </button>

  </div>

)}

          <div className="mt-8 w-full">

  <div className="grid grid-cols-2 gap-4 mb-8">
    <div className="bg-base-200 rounded-2xl p-4 text-center">
      <p className="text-gray-400 mb-2">العمر</p>
      <h3 className="text-2xl font-bold text-green-400">
        {user?.age || "-"}
      </h3>
    </div>

    <div className="bg-base-200 rounded-2xl p-4 text-center">
      <p className="text-gray-400 mb-2">المركز</p>
      <h3 className="text-2xl font-bold text-green-400">
        {user?.position || "-"}
      </h3>
    </div>
  </div>

  <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">
    إحصائيات اللاعب ⚽
  </h2>

  <div className="grid grid-cols-2 gap-4">

    <div className="bg-base-300 rounded-2xl p-4 text-center">
      <p className="text-gray-400">⚽ الأهداف</p>
      <h3 className="text-2xl font-bold text-green-400">
        {user?.goals || 0}
      </h3>
    </div>

    <div className="bg-base-300 rounded-2xl p-4 text-center">
      <p className="text-gray-400">🎯 الأسيست</p>
      <h3 className="text-2xl font-bold text-green-400">
        {user?.assists || 0}
      </h3>
    </div>

    <div className="bg-base-300 rounded-2xl p-4 text-center">
      <p className="text-gray-400">🏟️ المباريات</p>
      <h3 className="text-2xl font-bold text-green-400">
        {user?.matches || 0}
      </h3>
    </div>

    <div className="bg-base-300 rounded-2xl p-4 text-center">
      <p className="text-gray-400">⭐ المستوى</p>
      <h3 className="text-2xl font-bold text-yellow-400">
        {user?.level || "Bronze"}
      </h3>
    </div>

    <div className="bg-base-300 rounded-2xl p-4 text-center">
      <p className="text-gray-400">🟨 صفراء</p>
      <h3 className="text-2xl font-bold text-yellow-400">
        {user?.yellowCards || 0}
      </h3>
    </div>

    <div className="bg-base-300 rounded-2xl p-4 text-center">
      <p className="text-gray-400">🟥 حمراء</p>
      <h3 className="text-2xl font-bold text-red-500">
        {user?.redCards || 0}
      </h3>
    </div>

    <div className="bg-base-300 rounded-2xl p-4 text-center">
      <p className="text-gray-400">🏅 رجل المباراة</p>
      <h3 className="text-2xl font-bold text-green-400">
        {user?.manOfTheMatch || 0}
      </h3>
    </div>

    <div className="bg-base-300 rounded-2xl p-4 text-center">
      <p className="text-gray-400">👑 رجل الشهر</p>
      <h3 className="text-2xl font-bold text-green-400">
        {user?.manOfTheMonth || 0}
      </h3>
    </div>

  </div>
</div>
        </div>

        

      </div>

    </div>

  
  );

};

export default Profile;