import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/home/component/Login";
import SignUp from "../pages/home/component/SignUp";
import ScheduleMain from "../pages/schedule/ScheduleMain";
import Main from "../pages/main/Main";
import AlbumMain from "../pages/album/AlbumMain";
import AlbumDetail from "../pages/album/component/AlbumDetail";
import ScheduleCard from "../pages/schedule/component/ScheduleCard";
import ScheduleDetail from "../pages/schedule/component/ScheduleDetail";

const Page = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/schedule/:partyId" element={<ScheduleMain />} />
        <Route path="/main" element={<Main />} />
        <Route path="/album" element={<AlbumMain />} />
        <Route path="/album/:id" element={<AlbumDetail />} />
        <Route path="/shedulelist/:partyId" element={<ScheduleCard />} />
        <Route path="/sheduledetail/:scheduleId" element={<ScheduleDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Page;
