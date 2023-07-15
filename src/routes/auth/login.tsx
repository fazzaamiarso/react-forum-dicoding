/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useLoginMutation } from "@/services/api/user";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import LoginForm from "@/components/auth/login-form";

export interface LoginMutationInput {
  email: string;
  password: string;
}

const Login = (): JSX.Element => {
  const navigate = useNavigate();

  const [loginUser] = useLoginMutation();

  const onSubmit = async (data: LoginMutationInput): Promise<void> => {
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
          <LoginForm onSubmit={onSubmit} />
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

