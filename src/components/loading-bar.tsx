import { useTypedSelector } from "@/hooks/store";
import { useEffect, useRef } from "react";
import LoadingBar, { type LoadingBarRef } from "react-top-loading-bar";

const GlobalLoadingBar = (): JSX.Element => {
  const loading = useTypedSelector((state) => state.loading.loading);
  const ref = useRef<LoadingBarRef>(null);

  useEffect(() => {
    if (loading) ref.current?.continuousStart();
    else ref.current?.complete();
  }, [loading]);

  return <LoadingBar ref={ref} waitingTime={1000} style={{ height: "3px" }} />;
};

export default GlobalLoadingBar;
