import { Outlet } from "react-router-dom";
import { getCookie } from "../../redux/modules/customCookies";
import { Header } from "../../components/Header";
import Login from "./component/Login";

export const Home = () => {
  const token = getCookie("token");

  return (
    <>
      {token ? (
        <>
          <Header />
          <Outlet></Outlet>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};
