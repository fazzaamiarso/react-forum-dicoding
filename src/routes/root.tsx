import { Outlet } from "react-router-dom";
import GlobalLoadingBar from "@/components/loading-bar";

const Root = (): JSX.Element => {
  return (
    <div className="font-open-sans text-zinc-800">
      <GlobalLoadingBar />
      <Outlet />
    </div>
  );
};

export default Root;
