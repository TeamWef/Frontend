import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import schedule from "../modules/scheduleSlice";

export const store = configureStore({
  reducer: { schedule },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
