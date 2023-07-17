/* eslint-disable @typescript-eslint/no-misused-promises */
import { type SubmitHandler, useForm } from "react-hook-form";
import TextField from "../text-field";
import type { RegisterMutationInput } from "@/routes/auth/register";

interface RegisterFormProps {
  onSubmit: SubmitHandler<RegisterMutationInput>;
}
const RegisterForm = ({ onSubmit }: RegisterFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterMutationInput>();

  return (
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
          validate: {
            matchPattern: (v) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              "Email address must be a valid address",
          },
        })}
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
  );
};

export default RegisterForm;
