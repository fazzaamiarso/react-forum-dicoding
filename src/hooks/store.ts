/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type AppDispatch, type RootState } from "@/store";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
