import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Div, Flex, Input, Margin, Span, Svg } from "../../../elem";
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
        <Flex ai="center">
          <Svg variant="logo" />
        </Flex>
        <Margin />
        <Box>
          <Span>신규가입을 환영해요!🖐</Span>
          <Span>
            다양한 <Margin mg="2px" />
            <Span variant="bold">모임을 위프와 함께</Span>해요!
          </Span>
        </Box>
        <Margin />
        <form onSubmit={onSignup}>
          <Input
            variant="sign"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Username"
          />
          <StDiv>
            <Input
              variant="sign"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
            />
            <StBtn
              variant="sign"
              type="button"
              onClick={() =>
                email
                  ? dispatch(__emailCheck(email))
                  : alert("Email을 입력해주세요")
              }
            >
              중복확인
            </StBtn>
          </StDiv>
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
          <Button variant="bronzeBtn" type="submit" fw="700">
            Sign up
          </Button>
          <Margin mg="30px" />
          <Flex ai="center">
            <UnderLine onClick={() => navigate("/")}>
              <Span variant="small">
                이미 회원이에요!
                <Margin mg="2px" />
                <Span variant="smallBold">로그인 하러가기🖐</Span>
              </Span>
            </UnderLine>
          </Flex>
        </form>
      </Flex>
    </Div>
  );
};

export default SignUp;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: flex-start;
`;

const StBtn = styled.button`
  padding-left: 10px;
  position: absolute;
  top: 20px;
  right: 15px;
  font-size: 16px;
  color: #bfbfbf;
  border: 0px;
  border-left: solid 1px #bfbfbf;
  background-color: transparent;
  cursor: pointer;
`;

const UnderLine = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  cursor: pointer;
`;
