import { Link } from "react-router-dom";

const NotFound = (): JSX.Element => {
  return (
    <div className="grid min-h-screen min-w-full place-items-center  px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-violet-600">404</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-violet-900 sm:text-5xl">
          Page not found
        </h2>
        <p className="mt-6 text-base leading-7 text-zinc-500">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            replace
            className="rounded-md bg-violet-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
