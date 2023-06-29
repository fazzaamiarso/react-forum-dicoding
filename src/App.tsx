import parse from "html-react-parser";
import { useGetAllThreadsQuery } from "./api/thread";
import { ArrowLeftOnRectangleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";

function App(): JSX.Element {
  const { data } = useGetAllThreadsQuery();
  return (
    <>
      <header className="mx-auto w-11/12">
        <div className="flex items-center gap-4 py-4">
          <Dialog.Root>
            <Dialog.Trigger>
              <Bars3Icon aria-hidden="true" className="aspect-square w-8" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
              <Dialog.Content
                className={clsx(
                  "fixed left-0 top-0 min-h-screen min-w-[200px] space-y-8 bg-white p-4",
                  "-translate-x-full data-[state=open]:translate-x-0"
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <h2 className="text-lg font-bold text-green-500">Giron</h2>
                  <Dialog.Close>
                    <XMarkIcon aria-hidden="true" className="aspect-square w-8" />
                  </Dialog.Close>
                </div>
                <ul className="space-y-6">
                  <li>
                    <a href="#" className="w-full py-2 ">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="w-full py-2 ">
                      Leaderboard
                    </a>
                  </li>
                  <li>
                    <a href="#" className="w-full py-2 ">
                      Categories
                    </a>
                  </li>
                </ul>
                <button className="mt-auto inline-flex items-center gap-3">
                  <ArrowLeftOnRectangleIcon aria-hidden="true" className="aspect-square w-5" />{" "}
                  Logout
                </button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <h1 className="text-xl font-bold text-green-500">Giron</h1>
        </div>
      </header>
      <main className="mx-auto w-11/12">
        <h2>Threads</h2>
        <ul>
          {data?.map((thread) => {
            return (
              <li key={thread.id}>
                <h3>{thread.title}</h3>
                <p>{parse(thread.body)}</p>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}

export default App;
