import parse from "html-react-parser";
import { useGetAllThreadsQuery } from "@/api/thread";
import { Link } from "react-router-dom";

const Home = (): JSX.Element => {
  const { data } = useGetAllThreadsQuery();

  return (
    <div>
      <ul className="space-y-4">
        {data?.map((thread) => {
          return (
            <li key={thread.id} className="rounded-sm p-4 shadow-sm ring-1 ring-gray-200">
              <h3 className="font-semibold">
                <Link to={`threads/${thread.id}`}>{thread.title}</Link>
              </h3>
              <p className="line-clamp-6 text-sm">{parse(thread.body)}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
