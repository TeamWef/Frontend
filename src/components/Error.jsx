import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Div, Span, Svg } from "../elem";

const Error = () => {
  const navigate = useNavigate();
  return (
    <Div variant="bodyContainer">
      <StSpan>!</StSpan>
      <Span fs="30px" color="#a4a19d" mg="10px 0px 25px">
        ERROR
      </Span>
      <Svg variant="error" />
      <Span variant="mediumBronze" fw="bold" mg="30px 0">
        알수없는 오류가 발생했습니다.
      </Span>
      <Button
        variant="large"
        onClick={() => {
          navigate("/");
        }}
      >
        메인페이지로 돌아가기
      </Button>
    </Div>
  );
};

export default Error;

const StSpan = styled.span`
  font-size: ${(props) => (props.fs ? props.fs : "100px")};
  color: #d9d3c7;
`;
