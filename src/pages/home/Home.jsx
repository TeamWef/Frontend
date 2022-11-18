import { useNavigate } from "react-router-dom";
import { getCookie } from "../../redux/modules/customCookies";
import Main from "../main/Main";
import Login from "./component/Login";

export const Home = () => {
  const token = getCookie("token");

  return <>{token ? <Main /> : <Login />}</>;
};
