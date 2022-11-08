import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import members from "../modules/membersSlice";
import schedule from "../modules/scheduleSlice";

export const store = configureStore({
  reducer: {
    members,
    schedule,
  },
  //   middleware: getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),



