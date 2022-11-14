import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInputs } from "../../../hooks/useInput";
import { __emailCheck, __signup } from "../../../redux/modules/membersSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, onChange, reset] = useInputs({
    email: "",
    name: "",
    password: "",
    passwordCheck: "",
  });
  const { email, name, password, passwordCheck } = values;

  const onSignup = (e) => {
    e.preventDefault();
    if (!email || !name || !password || !passwordCheck) {
      alert("모든 항목을 입력해주세요.");
      return null;
    } else if (password !== passwordCheck) {
      alert("password가 다릅니다");
      return null;
    }
    dispatch(__signup({ email, name, password }));
    reset();
    navigate("/");
  };

  return (
    <form onSubmit={onSignup}>
      <p>
        Email : <input name="email" value={email} onChange={onChange} />
        <button type="button" onClick={() => dispatch(__emailCheck(email))}>
          중복체크
        </button>
      </p>
      <p>
        name : <input name="name" value={name} onChange={onChange} />
      </p>
      <p>
        PW :{" "}
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
      </p>
      <p>
        PW check :
        <input
          type="password"
          name="passwordCheck"
          value={passwordCheck}
          onChange={onChange}
        />
      </p>
      <button type="submit">회원가입</button>
    </form>
  );
};

export default SignUp;
