import { UserAvatar } from "@/components/user-avatar";
import { useAppDispatch } from "@/hooks/store";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/services/authSlice";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { Link, Outlet, useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const App = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
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
                  "fixed left-0 top-0 min-h-screen min-w-[250px] space-y-8 bg-white p-4",
                  "-translate-x-full data-[state=open]:translate-x-0"
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <h2 className="text-lg font-bold text-green-500">Giron</h2>
                  <Dialog.Close>
                    <XMarkIcon aria-hidden="true" className="aspect-square w-8" />
                  </Dialog.Close>
                </div>
                {user === undefined && (
                  <div className="flex w-full flex-col gap-4 bg-gray-100 p-4">
                    <Link
                      to="/auth/login"
                      className="inlined-flex py-2 text-center text-sm ring-1 ring-black"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/auth/register"
                      className="inlined-flex bg-black py-2 text-center text-sm text-white"
                    >
                      Create an account
                    </Link>
                  </div>
                )}
                <ul className="space-y-6">
                  <li>
                    <Link to="/" className="w-full py-2 ">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/leaderboards" className="w-full py-2 ">
                      Leaderboard
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="w-full py-2 ">
                      Categories
                    </Link>
                  </li>
                </ul>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <h1 className="text-xl font-bold text-green-500">
            <Link to="/">Giron</Link>
          </h1>
          {user !== undefined && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="ml-auto">
                <UserAvatar imgSrc={user?.avatar ?? ""} name={user?.name ?? ""} />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="end"
                  sideOffset={5}
                  className={clsx(
                    "min-w-[150px] rounded-md bg-zinc-100 p-2 text-zinc-800 shadow-md"
                  )}
                >
                  <DropdownMenu.Item asChild>
                    <Link to="/threads/new" className="inline-flex w-full py-1 text-start text-sm">
                      Create Thread
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    className="inline-flex w-full py-1 text-start text-sm"
                    onSelect={() => {
                      dispatch(logout());
                      navigate("/auth/login", { replace: true });
                    }}
                  >
                    Logout
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          )}
        </div>
      </header>
      <main className="mx-auto my-8 w-11/12">
        <Outlet />
      </main>
    </>
  );
};

export default App;
