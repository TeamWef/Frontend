import { useEffect, useState } from "react";
import styled from "styled-components";

const ExpirationTime = (repeat) => {
  const [isExpired, setIsExpired] = useState(false);

  const [time, setTime] = useState(900);
  const [min, setMin] = useState(15);
  const [sec, setSec] = useState(0);
  useEffect(() => {
    setTime(900);
    setMin(15);
    setSec(0);
    setIsExpired(false);
  }, [repeat]);

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        if (Number(sec) > 0) {
          setSec(Number(sec) - 1);
        }
        if (Number(sec) === 0) {
          if (Number(min) === 0) {
            clearInterval(timer);
          } else {
            setMin(Number(min) - 1);
            setSec(59);
          }
        }
        setTime(time - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsExpired(true);
    }
  }, [time, min, sec]);

  return (
    <StDiv>
      {isExpired ? (
        <StSpan>인증시간 만료</StSpan>
      ) : (
        <StSpan fs="14px" mg="10px">
          {min}:{sec < 10 ? `0${sec}` : sec}
        </StSpan>
      )}
    </StDiv>
  );
};

export default ExpirationTime;

const StDiv = styled.div`
  position: absolute;
  width: 85px;
  top: 20px;
  right: 0px;
`;

const StSpan = styled.span`
  width: 85px;
  font-size: ${({ fs }) => (fs ? fs : "12px")};
  color: red;
  margin-left: ${({ mg }) => (mg ? mg : "")};
`;
