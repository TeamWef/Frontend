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

const Page = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/members/kakao/callback" element={<Kakao />} />
        <Route path="/schedule/:partyId" element={<ScheduleMain />} />
        <Route path="/main" element={<Main />} />
        <Route path="/:partyid/album" element={<AlbumMain />} />
        <Route path="/:partyid/album/:id" element={<AlbumDetail />} />
        <Route path="/album" element={<AlbumMain />} />
        <Route path="/album/:id" element={<AlbumDetail />} />
        <Route path="/schedulelist/:partyId" element={<ScheduleCard />} />
        <Route path="/sheduledetail/:scheduleId" element={<ScheduleDetail />} />
        <Route path="/chat" element={<ChatMain />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Page;
