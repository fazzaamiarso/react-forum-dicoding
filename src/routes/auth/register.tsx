/* eslint-disable @typescript-eslint/no-misused-promises */
import TextField from "@/components/text-field";
import { useLoginMutation, useRegisterMutation } from "@/services/api/user";
import { useForm, type SubmitHandler } from "react-hook-form";
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
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await registerUser(data);
    await loginUser({ email: data.email, password: data.email });
    navigate("/");
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
              {...register("name", { required: true })}
            />
            <TextField
              {...register("email", { required: true })}
              type="email"
              label="Email"
              id="email"
              autoComplete="email"
            />
            <TextField
              {...register("password", { required: true, minLength: 6 })}
              label="Password"
              type="password"
              autoComplete="current-password"
              id="password"
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
