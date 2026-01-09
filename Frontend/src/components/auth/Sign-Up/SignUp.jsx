import { useForm } from "react-hook-form";
import { SignupForm } from "./SignUpForm";
import { callRegisterUserApi } from "@/services";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password"); // for confirm password validation

  const navigate = useNavigate();

  const onSubmit = async (getdata) => {
    console.log("Signup Data:", getdata);

    const data = await callRegisterUserApi(getdata);

    console.log("API Response:", data);

    if (data?.success) {
      toast.success("Account created successfully!");
      navigate("/tasks/list");
    } else {
      toast.error(data?.message || "Failed to create account");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <SignupForm
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
        passwordValue={password}
      />
    </div>
  );
}
