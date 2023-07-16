import { SignalSlashIcon } from "@heroicons/react/24/solid";
import Loader from "./loader";

export const ErrorState = ({ text = "Something went wrong..." }: { text?: string }): JSX.Element => {
  return (
    <div data-testid="error-state" className="mx-auto flex w-max flex-col items-center gap-2 font-semibold">
      <SignalSlashIcon aria-hidden="true" className="aspect-square h-8" />
      <p>{text}</p>
    </div>
  );
};

export const LoadingState = ({ text = "Loading data..." }: { text?: string }): JSX.Element => {
  return (
    <div data-testid="loading-state" className="mx-auto flex w-max flex-col items-center">
      <Loader />
      <p>{text}</p>
    </div>
  );
};
