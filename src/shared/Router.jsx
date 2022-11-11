import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/home/component/Login";
import SignUp from "../pages/home/component/SignUp";
import ScheduleMain from "../pages/schedule/ScheduleMain";
import Main from "../pages/main/Main";

const Page = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/schedule/:id" element={<ScheduleMain />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Page;
