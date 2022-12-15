import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../pages/home/component/SignUp";
import Main from "../pages/main/Main";
import AlbumMain from "../pages/album/AlbumMain";
import AlbumDetail from "../pages/album/component/AlbumDetail";
import { Home } from "../pages/home/Home";
import ScheduleDetail from "../pages/schedule/component/ScheduleDetail";
import Kakao from "../pages/home/component/Kakao";
import GroupMain from "../pages/groupmain/GroupMain";
import ScheduleCreate from "../pages/schedule/component/ScheduleCreate";
import ScheduleMain from "../pages/schedule/ScheduleMain";
import NotFound from "../components/NotFound";
import Error from "../components/Error";
import Google from "../pages/home/component/Google";

const Page = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="" element={<Main />} />
          <Route path=":partyId" element={<GroupMain />} />
          <Route path=":partyId/album" element={<AlbumMain />} />
          <Route path=":partyId/album/:id" element={<AlbumDetail />} />
          <Route path=":partyId/schedule" element={<ScheduleMain />} />
          <Route path=":partyId/schedule/create" element={<ScheduleCreate />} />
          <Route
            path="/:partyId/scheduledetail/:scheduleId"
            element={<ScheduleDetail />}
          />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/members/kakao/callback" element={<Kakao />} />
        <Route path="/members/google/callback" element={<Google />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Page;
