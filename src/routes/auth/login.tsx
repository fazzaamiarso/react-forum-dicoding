/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
import TextField from "@/components/text-field";
import { useLoginMutation } from "@/services/api/user";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import clsx from "clsx";

interface FormData {
  email: string;
  password: string;
}

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ reValidateMode: "onSubmit" });
  const [loginUser] = useLoginMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await loginUser(data).unwrap();
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
            Sign into your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
              className={clsx(
                "flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm",
                "hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              )}
            >
              Login
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="font-semibold leading-6 text-violet-600 hover:text-violet-500"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
