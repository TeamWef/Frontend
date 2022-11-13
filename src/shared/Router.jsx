import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/home/component/Login";
import SignUp from "../pages/home/component/SignUp";
import ScheduleMain from "../pages/schedule/ScheduleMain";
import Main from "../pages/main/Main";
import AlbumMain from "../pages/album/AlbumMain";
import AlbumDetail from "../pages/album/component/AlbumDetail";
import { Home } from "../pages/home/Home";

const Page = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/schedule/:partyId" element={<ScheduleMain />} />
        <Route path="/main" element={<Main />} />
        <Route path="/:partyid/album" element={<AlbumMain />} />
        <Route path="/:partyid/album/:id" element={<AlbumDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Page;
