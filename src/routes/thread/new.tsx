/* eslint-disable @typescript-eslint/no-misused-promises */
import { useCreateThreadMutation } from "@/services/api/thread";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormData {
  title: string;
  body: string;
  category?: string;
}

const NewThread = (): JSX.Element => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();

  const [createThread] = useCreateThreadMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    try {
      await createThread(data);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h2 className="mb-8 text-xl font-semibold">Create New Thread</h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="title">
              Title
            </label>
            <span className="text-xs">Add a short, descriptive headline</span>
          </div>
          <input
            type="text"
            autoComplete="off"
            id="title"
            {...register("title", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="category">
              Category (optional)
            </label>
            <span className="text-xs">Choose a category for your thread</span>
          </div>
          <input type="text" id="category" autoComplete="off" {...register("category")} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="body">
              Content
            </label>
            <span className="text-xs">Please always adhere to the community guideline</span>
          </div>
          <textarea id="body" {...register("body", { required: true })} />
        </div>
        <div className="ml-auto space-x-4">
          <button
            className="p-2 text-sm"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </button>
          <button className="bg-black p-2 text-sm text-white">Add Thread</button>
        </div>
      </form>
    </div>
  );
};

export default NewThread;
