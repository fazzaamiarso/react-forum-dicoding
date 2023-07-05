/* eslint-disable @typescript-eslint/no-misused-promises */
import TextArea from "@/components/textarea";
import TextField from "@/components/text-field";
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
        <TextField
          {...register("title", { required: true })}
          label="Title"
          type="text"
          autoComplete="off"
          id="title"
          description="Add a short, descriptive headline"
        />
        <TextField
          {...register("category")}
          label="Category"
          type="text"
          autoComplete="off"
          id="category"
          description="Choose a category for your thread (optional)"
        />
        <TextArea
          {...register("body", { required: true })}
          id="body"
          rows={7}
          label="Content"
          description="Please always adhere to the community guideline"
        />
        <div className="ml-auto space-x-4">
          <button
            className="p-2 text-sm"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </button>
          <button className="rounded-sm bg-violet-600 p-2 text-sm text-white transition-colors hover:bg-violet-500">
            Add Thread
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewThread;
