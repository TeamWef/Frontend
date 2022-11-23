import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  Div,
  Flex,
  Icon,
  Input,
  Logo,
  Margin,
  Span,
  Svg,
} from "../../../elem";
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
      <Flex>
        <Flex ai="center">
          <Svg variant="logo" />
        </Flex>
        <Margin />
        <Span>안녕하세요.</Span>
        <Span>
          <Span variant="bold">WE ARE FRIENDS</Span> 입니다.
        </Span>
        <Span>위프에서 친구들과 일정을 관리해요🙋‍♀️</Span>
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
          <Button variant="large" type="submit" onClick={onLogin}>
            Sign in
          </Button>
        </form>
        <Flex ai="center">
          <StHr />
          <Span variant="smallBronze">SNS 계정으로 로그인</Span>
          <Flex fd="row">
            <Icon variant="kakao" onClick={onKakaoLogin} />
            <Icon variant="google" />
          </Flex>
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
      </Flex>
    </Div>
  );
};

export default Login;

const StHr = styled.hr`
  width: 370px;
  margin: 40px 0 30px 0;
`;

const UnderLine = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  cursor: pointer;
`;
