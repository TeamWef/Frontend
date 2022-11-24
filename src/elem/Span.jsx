import styled, { css } from "styled-components";

const Span = ({ children, ...props }) => {
  return <StSpan {...props}>{children}</StSpan>;
};
export default Span;

const StSpan = styled.span`
  display: flex;
  font-size: 20px;
  margin: ${({ mg }) => (mg ? mg : "")};

  ${({ variant }) => {
    switch (variant) {
      case "small":
        return css`
          font-size: 14px;
        `;
      case "bold":
        return css`
          font-weight: 700;
        `;
      case "smallBold":
        return css`
          font-size: 14px;
          font-weight: 700;
        `;
      case "smallBronze":
        return css`
          font-size: 14px;
          color: #a4a19d;
        `;
      case "mediumBronze":
        return css`
          font-size: 16px;
          color: #a4a19d;
        `;
      case "bigBronze":
        return css`
          font-size: 18px;
          color: #a4a19d;
        `;
      default:
        break;
    }
  }};
`;
