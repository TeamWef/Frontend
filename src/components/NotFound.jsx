import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Div, Margin, Span, Svg } from "../elem";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Div variant="bodyContainer">
      <StSpan>!</StSpan>
      <Span fs="30px" color="#a4a19d" mg="10px 0px 25px">
        404
      </Span>
      <Svg variant="notFound" />
      <Span variant="mediumBronze" fw="bold" mg="0 0 20px">
        Page Not Found
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

export default NotFound;

const StSpan = styled.span`
  font-size: ${(props) => (props.fs ? props.fs : "100px")};
  font-weight: bold;
  color: #d9d3c7;
`;
