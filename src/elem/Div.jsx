import styled, { css } from "styled-components";

const Div = ({ children, ...props }) => {
  return <StDiv {...props}>{children}</StDiv>;
};
export default Div;

const StDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (width ? width : "column")};
  height: ${({ height }) => (height ? height : "column")};

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
          z-index: 8;
        `;
      case "background":
        return css`
          position: fixed;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(153, 153, 153, 0.4);
          z-index: 10;
        `;
      case "groupEdit":
        return css`
          position: relative;
          width: 440px;
          height: 390px;
          background-color: #f8f5f0;
          border-radius: 5px;
          padding: 20px;
        `;
      case "bodyContainer":
        return css`
          display: flex;
          flex-direction: column;
          position: relative;
          top: 74px;
          left: 50%;
          transform: translate(-50%, 0);
          width: 1100px;
          height: auto;
        `;
      default:
        break;
    }
  }}
`;
