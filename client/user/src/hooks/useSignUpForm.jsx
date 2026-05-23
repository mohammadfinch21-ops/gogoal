import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const registerSchema = yup.object().shape({
  name: yup.string().required("الاسم مطلوب"),

  phone: yup
    .string()
    .required("رقم الهاتف مطلوب")
    .matches(/^07\d{8}$/, "رقم الهاتف يجب أن يبدأ بـ 07 ويتكون من 10 أرقام"),

  pin: yup
    .string()
    .required("PIN مطلوب")
    .matches(/^\d{4}$/, "PIN يجب أن يكون 4 أرقام"),

  confirmPin: yup
    .string()
    .required("أكد PIN")
    .oneOf([yup.ref("pin")], "PIN غير متطابق"),
});

const useSignUpForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      profileImage: "",
    },
  });

  const onSubmit = async (data) => {
    try {
    
      const existingUserQuery = query(
  collection(db, "users"),
  where("phone", "==", data.phone)
);

const existingUserSnapshot = await getDocs(existingUserQuery);

if (!existingUserSnapshot.empty) {
  toast.error("هذا الحساب مسجل مسبقًا 🚫");
  return;
}

      const userData = {
        createdAt: Date.now(),
        id: Date.now(),
        name: data.name,
        phone: data.phone,
        pin: data.pin,
        age: data.age || "",
        position: data.position || "",
        profileImage: data.profileImage || "",

        goals: 0,
        assists: 0,
        matches: 0,
        yellowCards: 0,
        redCards: 0,
        manOfTheMatch: 0,
        manOfTheMonth: 0,
        level: "Bronze",
        isAdmin: false,
      };

      const docRef = await addDoc(collection(db, "users"), userData);

      const finalUser = {
        ...userData,
        firebaseId: docRef.id,
      };

      localStorage.setItem("user", JSON.stringify(finalUser));
      localStorage.setItem("isLoggedIn", "true");

      toast.success("تم إنشاء الحساب بنجاح");

      window.location.href = "/";
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء إنشاء الحساب");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    setValue,
  };
};

export default useSignUpForm;