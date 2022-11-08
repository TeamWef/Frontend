import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import members from "../modules/membersSlice";

export const store = configureStore({
  reducer: {
    members,
  },
  //   middleware: getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
