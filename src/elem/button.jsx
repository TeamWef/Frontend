import styled, { css } from "styled-components";

const Button = ({ children, ...props }) => {
  return <StBtn {...props}>{children}</StBtn>;
};
export default Button;

const StBtn = styled.button`
  cursor: pointer;
  border: 0px;
  border-radius: 5px;

  ${({ variant }) => {
    switch (variant) {
      case "sign":
        return css`
          color: #fff;
          font-weight: 700;
          font-size: 24px;
          background-color: #a4a19d;
          width: 370px;
          height: 65px;
          :hover {
            opacity: 0.6;
            transition: 0.3s;
          }
        `;
      default:
        break;
    }
  }}
`;
