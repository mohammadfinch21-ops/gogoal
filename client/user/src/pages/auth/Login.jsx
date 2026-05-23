import useLoginForm from "../../hooks/useLoginForm";
import FormField from "../../components/common/FormField";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";

const Login = () => {
  const { register, handleSubmit, errors, onSubmit, loading } = useLoginForm();

  return (
    <div dir="rtl">
     <div className="flex items-center justify-center  min-h-screen max-md:p-4 bg-base-200 p-4 ">
      <div className="card w-full border md:w-96  bg-base-100 shadow-xl  ">
        <div className="card-body">
          <h2 className="card-title justify-center">تسجيل الدخول</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="text-right">
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
            <div className="form-control mt-6">
              <Button type="submit" className="btn btn-block btn-primary" loading={loading}>
                تسجيل الدخول
              </Button>
            </div>
          </form>
          <div className="text-center mt-4">
            <Link to="/signup" className="link link-hover">
              ليس لديك حساب؟ إنشاء حساب
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
  
};

export default Login;
