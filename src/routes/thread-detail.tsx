import { useGetThreadByIdQuery } from "@/api/thread";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";

const ThreadDetail = (): JSX.Element => {
  const { threadId } = useParams();

  const { data } = useGetThreadByIdQuery(threadId ?? "", { skip: threadId === null });

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold">{data?.title}</h2>
      </div>
      <p>{parse(data?.body ?? "")}</p>
    </div>
  );
};

export default ThreadDetail;
