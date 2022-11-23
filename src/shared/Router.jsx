import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../pages/home/component/SignUp";
import ScheduleMain from "../pages/schedule/ScheduleMain";
import Main from "../pages/main/Main";
import AlbumMain from "../pages/album/AlbumMain";
import AlbumDetail from "../pages/album/component/AlbumDetail";
import { Home } from "../pages/home/Home";
import ScheduleCard from "../pages/schedule/component/ScheduleCard";
import ScheduleDetail from "../pages/schedule/component/ScheduleDetail";
import Kakao from "../pages/home/component/Kakao";
import ChatMain from "../pages/chat/ChatMain";
import Notice from "../pages/notice/Notice";

const Page = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/members/kakao/callback" element={<Kakao />} />
        <Route path="/:partyId/schedule" element={<ScheduleMain />} />
        <Route path="/:partyid/album" element={<AlbumMain />} />
        <Route path="/:partyid/album/:id" element={<AlbumDetail />} />
        <Route path="/album" element={<AlbumMain />} />
        <Route path="/album/:id" element={<AlbumDetail />} />
        <Route path="/:partyId/schedulelist" element={<ScheduleCard />} />
        <Route
          path="/:partyId/scheduledetail/:scheduleId"
          element={<ScheduleDetail />}
        />
        {/* <Route path="/chat" element={<ChatMain />} /> */}
        <Route path="/notice" element={<Notice />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Page;
