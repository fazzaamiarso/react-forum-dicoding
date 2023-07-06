import { Outlet } from "react-router-dom";
import GlobalLoadingBar from "@/components/loading-bar";
import { Toaster } from "react-hot-toast";

const Root = (): JSX.Element => {
  return (
    <div className="min-h-screen w-screen bg-zinc-100 font-open-sans text-zinc-800">
      <Toaster />
      <GlobalLoadingBar />
      <Outlet />
    </div>
  );
};

export default Root;
