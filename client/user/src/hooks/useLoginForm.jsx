import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosInstance from "./useAxiosInstance";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const loginSchema = yup.object().shape({

  phone: yup
    .string()
    .required("رقم الهاتف مطلوب")
    .matches(
      /^07\d{8}$/,
      "رقم الهاتف يجب أن يبدأ بـ 07 ويتكون من 10 أرقام"
    ),

  pin: yup
    .string()
    .required("PIN مطلوب")
    .matches(
      /^\d{4}$/,
      "PIN يجب أن يكون 4 أرقام"
    ),

});

const useLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/user/auth/login", data);
      const result = await response.data;
      toast.success(result.message);
      dispatch(login(result.token));
      console.log(result);
      localStorage.setItem("token", result.token);
      navigate("/auth", { replace: true });
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.token}`;
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    loading,
  };
};

export default useLoginForm;
