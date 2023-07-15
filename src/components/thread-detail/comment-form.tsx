import { useForm, type SubmitHandler } from "react-hook-form";
import TextArea from "../textarea";
import type { CommentMutationInput } from "@/routes/thread/detail";

interface CommentFormProps {
  onSubmit: SubmitHandler<CommentMutationInput>;
  threadId: string;
}

const CommentForm = ({ threadId, onSubmit }: CommentFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<CommentMutationInput>({
    defaultValues: { threadId },
  });

  const submitHandler: SubmitHandler<CommentMutationInput> = async (data) => {
    await onSubmit(data);
    resetField("content");
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-2">
      <input type="hidden" {...register("threadId")} />
      <TextArea
        {...register("content", { required: "Required" })}
        label="Add Comment"
        id="content"
        rows={5}
        className="rounded-sm border-zinc-300 bg-zinc-100"
        error={errors.content?.message}
      />
      <button className="rounded-sm bg-violet-600 p-2 text-sm text-white transition-colors hover:bg-violet-500">
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
