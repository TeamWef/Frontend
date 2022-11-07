import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/home/component/Login";
import ScheduleMain from "../pages/schedule/ScheduleMain";

const Page = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/schedule" element={<ScheduleMain />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Page;
