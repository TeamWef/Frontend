import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../../hooks/useInput";
import { __login } from "../../../redux/modules/membersSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, onChangeEmail, resetEmail] = useInput("");
  const [password, onChangePW, resetPW] = useInput("");

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(__login({ email: email, password: password }));
    resetEmail();
    resetPW();
    window.location.reload();
  };

  return (
    <form onSubmit={onLogin}>
      <p>
        Email : <input type="email" value={email} onChange={onChangeEmail} />
      </p>
      <p>
        PW : <input type="password" value={password} onChange={onChangePW} />
      </p>
      <button type="submit" onClick={onLogin}>
        로그인
      </button>
      <p>또는</p>
      <button onClick={() => navigate("/signup")}>회원가입</button>
    </form>
  );
};

export default Login;
