import styled, { css } from "styled-components";

const Div = ({ children, ...props }) => {
  return <StDiv {...props}>{children}</StDiv>;
};
export default Div;

const StDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ variant }) => {
    switch (variant) {
      case "sign":
        return css`
          width: 370px;
          height: 730px;
          position: absolute;
          top: 50vh;
          left: 50vw;
          transform: translate(-50%, -50%);
        `;

      case "kakao":
        return css``;
      default:
        break;
    }
  }}
`;
