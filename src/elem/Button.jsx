import styled, { css } from "styled-components";

const Button = ({ children, ...props }) => {
  return <StBtn {...props}>{children}</StBtn>;
};

export default Button;

const StBtn = styled.button`
  cursor: pointer;
  border: 0px;
  border-radius: 5px;
  font-weight: ${({ fw }) => (fw ? fw : "")};
  margin: ${({ margin }) => (margin ? margin : "")};
  transition: 0.3s;
  :hover {
    opacity: 0.6;
  }
  color: #fff;
  background-color: #a4a19d;
  ${({ variant }) => {
    switch (variant) {
      case "large":
        return css`
          width: 375px;
          height: 55px;
          font-size: 18px;
        `;
      case "medium":
        return css`
          width: 225px;
          height: 38px;
          font-size: 16px;
        `;
      case "small":
        return css`
          width: 115px;
          height: 34px;
          font-size: 13px;
          margin-left: 10px;
        `;
      case "border-small":
        return css`
          border: 1px solid #a4a19d;
          background-color: transparent;
          width: 115px;
          height: 34px;
          font-size: 13px;
          margin-left: 10px;
          color: #a4a19d;
        `;
      default:
        break;
    }
  }}
`;
