import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import members from "../modules/membersSlice";
import schedule from "../modules/scheduleSlice";
import group from "../modules/groupSlice";
import album from "../modules/albumSlice";
import mypage from "../modules/mypageSlice";

export const store = configureStore({
  reducer: {
    members,
    schedule,
    group,
    album,
    mypage,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
//
