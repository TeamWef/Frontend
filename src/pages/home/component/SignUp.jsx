import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Div, Flex, Input, Margin, Span } from "../../../elem";
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
    <Div variant="sign">
      <Flex>
        <Logo />
        <Margin mg="30px" />
        <Box>
          <Span>신규가입을 환영해요!🖐</Span>
          <Span>
            다양한 <Margin mg="2px" />
            <Span variant="bold">모임을 위피와 함께</Span>해요!
          </Span>
        </Box>
        <Margin mg="30px" />
        <form onSubmit={onSignup}>
          <Input
            variant="sign"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
          />
          <Button
            variant="sign"
            type="button"
            onClick={() => dispatch(__emailCheck(email))}
          >
            Check
          </Button>
          <Input
            variant="sign"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Username"
          />
          <Input
            variant="sign"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
          />
          <Input
            variant="sign"
            type="password"
            name="passwordCheck"
            value={passwordCheck}
            onChange={onChange}
            placeholder="Confirm Password"
          />
          <Button variant="sign" type="submit">
            Sign up
          </Button>
        </form>
      </Flex>
    </Div>
  );
};

export default SignUp;

const Logo = styled.div`
  width: 160px;
  height: 160px;
  margin: 0 auto;
  background-color: #a4a19d;
  border-radius: 50%;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
