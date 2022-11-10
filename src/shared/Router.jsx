import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/home/component/Login";
import SignUp from "../pages/home/component/SignUp";
import ScheduleMain from "../pages/schedule/ScheduleMain";
import Main from "../pages/main/Main";
import AlbumMain from "../pages/album/AlbumMain";

const Page = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/schedule" element={<ScheduleMain />} />
        <Route path="/main" element={<Main />} />
        <Route path="/album" element={<AlbumMain />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Page;
