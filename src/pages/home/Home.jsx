import { useNavigate } from "react-router-dom";
import Main from "../main/Main";
import Login from "./component/Login";

export const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return <>{token ? <Main /> : <Login />}</>;
};
