import { Link } from "react-router-dom";
import FormField from "../../components/common/FormField";
import useSignUpForm from "../../hooks/useSignUpForm";
import Button from "../../components/common/Button";
import { updateDoc, doc } from "firebase/firestore";
import { useState } from "react";

const SignUp = () => {
  const { register, handleSubmit, errors, onSubmit, setValue } = useSignUpForm();
  const [uploadingImage, setUploadingImage] = useState(false);
  return (
    <div className="flex items-center justify-center min-h-screen py-10 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300"> 
        <div className="card-body gap-2">
          <h2 className="card-title justify-center">انشاء الحساب</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
  label="الاسم الكامل"
  name="name"
  type="text"
  register={register}
  error={errors.name}
/>

<FormField
  label="رقم الهاتف"
  name="phone"
  type="tel"
  register={register}
  error={errors.phone}
/>

<FormField
  label="PIN"
  name="pin"
  type="password"
  register={register}
  error={errors.pin}
/>

<FormField
  label="تأكيد PIN"
  name="confirmPin"
  type="password"
  register={register}
  error={errors.confirmPin}
/>
            <div className="form-control mt-6">

<FormField
  label="العمر"
  name="age"
  type="number"
  register={register}
  error={errors.age}
/>

<div className="form-control">
  <label className="label">
    <span className="label-text">المركز</span>
  </label>

  <select
    {...register("position")}
    className="select select-bordered w-full"
  >
    <option value="">اختر المركز</option>
    <option value="مهاجم">مهاجم</option>
    <option value="وسط">وسط</option>
    <option value="مدافع">مدافع</option>
    <option value="حارس">حارس</option>
  </select>
</div>

<div className="form-control">
  <label className="label">
    <span className="label-text">الصورة الشخصية</span>
  </label>

  <input
  type="file"
  accept="image/*"
  onChange={async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const data = new FormData();

    data.append("file", file);

    data.append(
      "upload_preset",
      "gogoal_upload"
    );
    setUploadingImage(true);
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
    console.log(uploadedImage);
    setValue(
  "profileImage",
  uploadedImage.secure_url,
  { shouldValidate: true }
);

setUploadingImage(false);

  }}
  className="file-input file-input-bordered w-full bg-black text-white"
/>
</div>

<button
  type="submit"
  disabled={uploadingImage}
  className="btn bg-green-500 hover:bg-green-600 text-white border-none w-full"
>
  {uploadingImage ? "جاري رفع الصورة..." : "سجل"}
</button>
            </div>
          </form>
          <div className="text-center mt-4">
            <Link to="/login" className="link link-hover">
              هل لديك حساب بالفعل? تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
