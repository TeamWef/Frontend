import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Div, Flex, Img, Input, Margin, Span } from "../../../elem";
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
    <Div variant="sign">
      <Flex ai="center">
        <Logo />
        <Margin />
        <Flex>
          <Span>안녕하세요.</Span>
          <Span>
            <Span variant="bold">WE ARE FRIENDS</Span> 입니다.
          </Span>
          <Span>위프에서 친구들과 일정을 관리해요🙋‍♀️</Span>
        </Flex>
        <Margin />
        <form onSubmit={onLogin}>
          <Input
            variant="sign"
            type="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="Email"
          />
          <Input
            variant="sign"
            type="password"
            value={password}
            onChange={onChangePW}
            placeholder="Password"
          />
          <Button variant="sign" type="submit" onClick={onLogin}>
            Sign in
          </Button>
        </form>
        <StHr />
        <Span variant="smallBronze">SNS 계정으로 로그인</Span>
        <Kakao onClick={onKakaoLogin} />
        <UnderLine onClick={() => navigate("/signup")}>
          <Span variant="small">
            이메일로
            <Margin mg="2px" />
            <Span variant="smallBold">5초만에 회원가입</Span>
            <Margin mg="2px" />
            하기
          </Span>
        </UnderLine>
      </Flex>
    </Div>
  );
};

export default Login;

const Logo = styled.div`
  width: 160px;
  height: 160px;
  background-color: #a4a19d;
  border-radius: 50%;
`;
const StHr = styled.hr`
  width: 370px;
  margin: 40px 0 30px 0;
`;

const Kakao = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  background-color: rgb(250, 227, 1);
  background-image: url("/images/kakaologo.png");
  background-position: 50% 60%;
  background-size: 40px;
  background-repeat: no-repeat;
  border-radius: 50px;
  margin: 15px;
  cursor: pointer;
`;

const UnderLine = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  cursor: pointer;
  /* text-decoration: underline; */
`;
