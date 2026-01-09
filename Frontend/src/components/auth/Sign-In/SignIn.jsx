import { useForm } from "react-hook-form";
import { LoginForm } from "./LoginForm";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { callLoginUserApi } from "@/services";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (getdata) => {
    console.log("Login Data:", getdata);
    // Call your API here
    const data = await callLoginUserApi(getdata);
    console.log("Login Response:", data);

    if (data?.success) {
      toast.success("Account login successfully!");
      navigate("/tasks/list");
    } else {
      toast.error(data?.message || "Failed to login account");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 ">
      <div className="w-full max-w-sm ">
        <LoginForm
          register={register}
          onSubmit={handleSubmit(onSubmit)}
          errors={errors}
        />
      </div>
    </div>
  );
}
