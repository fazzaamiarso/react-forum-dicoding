import { useGetAllThreadsQuery } from "./api/thread";

function App(): JSX.Element {
  const { data } = useGetAllThreadsQuery();

  return (
    <>
      <header className="w-11/12 mx-auto">
        <h1 className="text-green-500">My new Discussion App</h1>
      </header>
      <main className="w-11/12 mx-auto">
        <h2>Threads</h2>
        <ul>
          {data?.map((thread) => {
            return (
              <li key={thread.id}>
                <h3>{thread.title}</h3>
                <p>{thread.body}</p>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}

export default App;
