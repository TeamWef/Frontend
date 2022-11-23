import styled, { css } from "styled-components";

const Button = ({ children, ...props }) => {
  return <StBtn {...props}>{children}</StBtn>;
};

export default Button;

const StBtn = styled.button`
  cursor: pointer;
  border: 0px;
  border-radius: 5px;
  width: ${({ width }) => (width ? width : "370px")};
  height: ${({ height }) => (height ? height : "65px")};
  font-size: ${({ fs }) => (fs ? fs : "20px")};
  font-weight: ${({ fw }) => (fw ? fw : "400")};

  ${({ variant }) => {
    switch (variant) {
      case "bronzeBtn":
        return css`
          color: #fff;
          background-color: #a4a19d;
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
