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
          top: 50%;
          left: 50vw;
          transform: translate(-50%, -50%);
        `;
      case "profileEdit":
        return css`
          background-color: #f8f5f0;
          width: 290px;
          height: 320px;
          position: absolute;
          top: 40px;
          right: 0px;
          box-shadow: 2px 1px 5px 1px #bebebe;
        `;
      default:
        break;
    }
  }}
`;
