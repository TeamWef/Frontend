import styled, { css } from "styled-components";

const Input = ({ children, ...props }) => {
  return <StInput {...props}>{children}</StInput>;
};
export default Input;

const StInput = styled.input`
  background-color: #fff;
  border: ${({ bd }) => (bd ? bd : "0")};
  border-radius: 5px;
  display: flex;
  padding-left: 16px;
  width: ${({ width }) => (width ? width : "")};

  ${({ variant }) => {
    switch (variant) {
      case "large":
        return css`
          width: 375px;
          height: 55px;
          font-size: 20px;
          margin-bottom: 12px;
          ::placeholder {
            font-size: 16px;
            opacity: 0.5;
          }
        `;
      case "medium":
        return css`
          height: 38px;
          font-size: 14px;
          ::placeholder {
            font-size: 14px;
            opacity: 0.5;
          }
        `;
      default:
        break;
    }
  }}
`;
