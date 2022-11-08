import { useDispatch } from "react-redux";
import { useInput } from "../../../hooks/useInput";
import { __signin } from "../../../redux/modules/membersSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, onChangeEmail, resetEmail] = useInput("");
  const [password, onChangePW, resetPW] = useInput("");

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(__signin({ email: email, password: password }));
    resetEmail();
    resetPW();
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
    </form>
  );
};

export default Login;
