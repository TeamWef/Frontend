import styled, { css } from "styled-components";

const Div = ({ children, ...props }) => {
  return <StDiv {...props}>{children}</StDiv>;
};
export default Div;

const StDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (width ? width : "")};
  height: ${({ height }) => (height ? height : "")};

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
          flex-direction: column;
          position: relative;
          top: 74px;
          left: 50%;
          transform: translate(-50%, 0);
          width: 1100px;
          height: auto;
        `;
      case "nullBox":
        return css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 1070px;
          height: 227px;
          border: 2px dashed #d9d3c7;
          border-radius: 10px;
          margin-top: 40px;
        `;
      case "dropDown":
        return css`
          position: absolute;
          top: 50px;
          width: 80px;
          height: auto;
          margin-left: 215px;
          background-color: white;
          border: 1px solid #d9d3c7;
          border-radius: 5px;
          z-index: 10;
          box-shadow: 5px 5px 15px rgba(164, 161, 157, 0.15);
          display: flex;
          flex-direction: column;
        `;
      case "title":
        return css`
          width: 160px;
          height: 35px;
          background-color: #ede8e1;
          color: #a4a19d;
          margin-top: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
        `;
      default:
        break;
    }
  }}
`;
