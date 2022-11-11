import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import members from "../modules/membersSlice";
import schedule from "../modules/scheduleSlice";
import group from "../modules/groupSlice";

export const store = configureStore({
  reducer: {
    members,
    schedule,
    group,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
//
