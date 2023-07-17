import { UserAvatar } from "@/components/user-avatar";
import { useAppDispatch } from "@/hooks/store";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/services/authSlice";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { Link, Outlet, useNavigate } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Separator from "@radix-ui/react-separator";
import { type ReactNode } from "react";

const navigationLinks = [
  { label: "Home", to: "/" },
  { label: "Leaderboard", to: "/leaderboards" },
];

const AppLayout = (): JSX.Element => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="mx-auto min-h-screen max-w-2xl bg-zinc-50 sm:w-11/12">
      <header className="px-8">
        <div className="flex items-center gap-4 py-4">
          <Drawer isAuthenticated={isAuthenticated} />
          <h1 className="text-xl font-bold text-violet-500">
            <Link to="/">Giron</Link>
          </h1>
          <ul className="mx-auto hidden items-center gap-4 text-sm text-zinc-600 md:flex">
            {navigationLinks.map((link) => {
              return (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="w-full py-2 font-semibold transition-colors hover:text-violet-500 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="ml-auto">
            {isAuthenticated ? (
              <Menu
                triggerEl={<UserAvatar imgSrc={user?.avatar ?? ""} name={user?.name ?? ""} />}
              />
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth/login"
                  className="inline-flex rounded-sm px-3 py-2 text-center text-sm ring-1 ring-zinc-400"
                >
                  Log in
                </Link>
                <Link
                  to="/auth/register"
                  className="inline-flex rounded-sm bg-violet-700 px-3 py-2 text-center text-sm text-white ring-1 ring-violet-700"
                >
                  Create an account
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <Separator.Root className="h-px w-full bg-zinc-200" />
      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;

const Drawer = ({ isAuthenticated }: { isAuthenticated: boolean }): JSX.Element => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="md:hidden">
        <span className="sr-only">open drawer</span>
        <Bars3Icon aria-hidden="true" className="aspect-square w-8" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 animate-overlayShow bg-black bg-opacity-30" />
        <Dialog.Content
          className={clsx(
            "fixed left-0 top-0 min-h-screen min-w-[250px] space-y-8 bg-white p-4",
            "data-[state=open]:animate-contentShow"
          )}
        >
          <div className="flex w-full items-center justify-between">
            <h2 className="text-lg font-bold text-violet-500">Giron</h2>
            <Dialog.Close>
              <XMarkIcon aria-hidden="true" className="aspect-square w-8" />
            </Dialog.Close>
          </div>
          {!isAuthenticated && (
            <div className="flex w-full flex-col gap-4 bg-gray-100 p-4">
              <Link
                to="/auth/login"
                className="inline-flex justify-center  rounded-sm px-3 py-2 text-center text-sm ring-1 ring-zinc-400"
              >
                Log in
              </Link>
              <Link
                to="/auth/register"
                className="inline-flex justify-center rounded-sm bg-violet-700 px-3 py-2 text-center text-sm text-white ring-1 ring-violet-700"
              >
                Create an account
              </Link>
            </div>
          )}
          <ul className="space-y-6">
            {navigationLinks.map((link) => {
              return (
                <li key={link.label}>
                  <Link to={link.to} className="w-full py-2 ">
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const Menu = ({ triggerEl }: { triggerEl: ReactNode }): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = (): void => {
    dispatch(logout());
    navigate("/auth/login", { replace: true });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <span className="sr-only">open menu</span>
        {triggerEl}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={5}
          className="min-w-[150px] animate-slideDownAndFade rounded-md bg-zinc-50 p-2 text-zinc-800 shadow-md"
        >
          <DropdownMenu.Item asChild>
            <Link
              to="/threads/new"
              className="inline-flex w-full rounded-md p-2 text-start text-sm hover:bg-violet-100 hover:text-violet-800"
            >
              Create Thread
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <button
              className="inline-flex w-full rounded-md p-2 text-start text-sm hover:bg-violet-100 hover:text-violet-800"
              onClick={onLogout}
            >
              Logout
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};