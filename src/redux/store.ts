import { TypedUseSelectorHook, useSelector } from "react-redux";
import { todoReducer } from "./tools/todoSLice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    todoReducer,
  },
});

export type RooteState = ReturnType<typeof store.getState>;
export type useDispach = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RooteState> = useSelector;
