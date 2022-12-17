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
  border-bottom: ${({ bb }) => (bb ? bb : "")};
  position: ${({ posi }) => (posi ? posi : "")};
  top: ${({ top }) => (top ? top : "")};
  right: ${({ right }) => (right ? right : "")};

  transition: 0.3s;
  :hover {
    opacity: 0.5;
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
          :hover {
            background-color: #a4a19d;
            color: #fff;
          }
        `;
      case "border-medium":
        return css`
          border: 1px solid #a4a19d;
          background-color: transparent;
          width: 225px;
          height: 38px;
          font-size: 16px;
          margin-top: 10px;
          color: #a4a19d;
          :hover {
            background-color: #a4a19d;
            color: #fff;
          }
        `;
      case "drop":
        return css`
          width: 80px;
          height: 30px;
          border-radius: 0;
          background-color: transparent;
          color: #a4a19d;
          cursor: pointer;
        `;
      default:
        break;
    }
  }}
`;
