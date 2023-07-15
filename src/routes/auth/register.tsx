/* eslint-disable @typescript-eslint/no-misused-promises */
import RegisterForm from "@/components/auth/register-form";
import { useLoginMutation, useRegisterMutation } from "@/services/api/user";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export interface RegisterMutationInput {
  name: string;
  email: string;
  password: string;
}

const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();
  const [loginUser] = useLoginMutation();

  const onSubmit = async (data: RegisterMutationInput): Promise<void> => {
    try {
      await registerUser(data).unwrap();
      await loginUser({ email: data.email, password: data.password }).unwrap();
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.error("message" in e?.data ? e?.data.message : "");
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
          <RegisterForm onSubmit={onSubmit} />

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
