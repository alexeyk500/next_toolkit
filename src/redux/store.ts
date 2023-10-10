import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import todoReducer from "./features/todo-slice";
import {AnyAction} from "redux";

export const store = configureStore({
  reducer: {
    todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch & ThunkDispatch<RootState, null, AnyAction>