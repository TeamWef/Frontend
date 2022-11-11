import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import members from "../modules/membersSlice";
import schedule from "../modules/scheduleSlice";
import album from "../modules/albumSlice";

export const store = configureStore({
  reducer: {
    members,
    schedule,
    album,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
