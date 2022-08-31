import {
  configureStore,
  ThunkAction,
  Action,
  AnyAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { rootReducer } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
});

export type AppDispatch = typeof store.dispatch &
  ThunkDispatch<RootState, null, AnyAction>;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
