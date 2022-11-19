import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../../hooks/useInput";
import { __login } from "../../../redux/modules/membersSlice";
import { KAKAO_AUTH_URL } from "../../../server";

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
  };

  const onKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <>
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
      </form>
      <p>또는</p>
      <button type="button" onClick={onKakaoLogin}>
        카카오로그인
      </button>
      <button type="button" onClick={() => navigate("/signup")}>
        회원가입
      </button>
    </>
  );
};

export default Login;
