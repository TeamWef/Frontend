import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Div, Flex, Input, Margin, Span, Svg } from "../../../elem";
import { useInputs } from "../../../hooks/useInput";
import { __emailCheck, __signup } from "../../../redux/modules/membersSlice";
import { checkAll, checkName, checkEmail, checkPassword } from "./check";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, onChange, reset] = useInputs({
    email: "",
    name: "",
    password: "",
    passwordCheck: "",
  });
  const [failed, setFailed] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const { email, name, password, passwordCheck } = values;
  // const focusOut = (e) => {
  //   setFailed("");
  // };
  // useEffect(() => {
  //   if (failed) document.addEventListener("focusout", focusOut);
  //   return () => {
  //     document.removeEventListener("focusout", focusOut);
  //   };
  // });
  const oncheckEmail = () => {
    if (!email) {
      return alert("Email을 입력해주세요!");
    } else if (failed.email === "Email") {
      return alert("Email 형식이 올바르지 않습니다");
    }
    dispatch(__emailCheck({ email, setIsChecked }));
  };

  const onSignup = (e) => {
    e.preventDefault();
    if (!checkAll(values)) {
      return null;
    }
    if (isChecked) {
      dispatch(__signup({ email, name, password }));
      reset();
      navigate("/");
    } else {
      alert("Email 중복 확인이 필요합니다.");
    }
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
            variant="large"
            bd={failed.name === "Name" && name ? "2px solid red" : ""}
            name="name"
            value={name}
            onChange={(e) => {
              onChange(e);
              setFailed({ ...failed, name: checkName(e.target.value) });
            }}
            placeholder="Username"
          />
          {failed.name === "Name" && name && (
            <Span variant="warning">2~4자리 한글을 입력해주세요.</Span>
          )}
          <StDiv>
            <Input
              variant="large"
              bd={failed.email === "Email" && email ? "2px solid red" : ""}
              name="email"
              value={email}
              onChange={(e) => {
                onChange(e);
                setFailed({ ...failed, email: checkEmail(e.target.value) });
                setIsChecked(false);
              }}
              placeholder="Email"
            />
            {failed.email === "Email" && email && (
              <Span variant="warning">Email 형식이 올바르지 않습니다.</Span>
            )}
            <StBtn variant="large" type="button" onClick={oncheckEmail}>
              중복확인
            </StBtn>
          </StDiv>
          <Input
            variant="large"
            bd={
              failed.password === "Password" && password ? "2px solid red" : ""
            }
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              onChange(e);
              setFailed({
                ...failed,
                password: checkPassword(e.target.value),
              });
            }}
            placeholder="Password"
          />
          {failed.password === "Password" && password && (
            <Span variant="warning">
              4~12자 영문 대/소문자 혹은 숫자를 입력해주세요.
            </Span>
          )}
          <Input
            variant="large"
            bd={
              password !== passwordCheck && passwordCheck ? "2px solid red" : ""
            }
            type="password"
            name="passwordCheck"
            value={passwordCheck}
            onChange={onChange}
            placeholder="Confirm Password"
          />
          {password !== passwordCheck && passwordCheck && (
            <Span variant="warning">Password가 다릅니다.</Span>
          )}
          <Button variant="large" type="submit">
            Sign up
          </Button>
          <Margin mg="30px" />
          <Flex ai="center">
            <UnderLine onClick={() => navigate("/")}>
              <Span variant="small">이미 회원이에요!</Span>
              <Span variant="smallBold" mg="0px 4px 0px 2px">
                로그인 하러가기
              </Span>
              <Span variant="small" mg="0px 0px 3px">
                🛵 =3
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
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid black;
  cursor: pointer;
`;
