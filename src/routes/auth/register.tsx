/* eslint-disable @typescript-eslint/no-misused-promises */
import TextField from "@/components/text-field";
import { useLoginMutation, useRegisterMutation } from "@/services/api/user";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();
  const [loginUser] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await registerUser(data).unwrap();
      await loginUser({ email: data.email, password: data.password }).unwrap();
      navigate("/");
    } catch (e: any) {
      toast.error(e?.data.message);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-violet-400">
            Create an Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Name"
              id="name"
              autoComplete="off"
              {...register("name", { required: "Name can't be empty!" })}
              error={errors.name?.message}
            />
            <TextField
              {...register("email", {
                required: "Email can't be empty!",
              })}
              type="email"
              label="Email"
              id="email"
              autoComplete="email"
              error={errors.email?.message}
            />
            <TextField
              {...register("password", {
                required: "Password can't be empty!",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              })}
              label="Password"
              type="password"
              autoComplete="current-password"
              id="password"
              error={errors.password?.message}
            />
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-semibold leading-6 text-violet-600 hover:text-violet-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
