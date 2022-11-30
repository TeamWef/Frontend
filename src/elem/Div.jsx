import styled, { css } from "styled-components";

const Div = ({ children, ...props }) => {
  return <StDiv {...props}>{children}</StDiv>;
};
export default Div;

const StDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ jc }) => (jc ? jc : "center")};
  width: ${({ width }) => (width ? width : "")};
  height: ${({ height }) => (height ? height : "")};
  flex-direction: ${({ fd }) => (fd ? fd : "")};
  background-color: ${({ bc }) => (bc ? bc : "")};
  border-radius: ${({ br }) => (br ? br : "5px")};
  margin: ${({ mg }) => (mg ? mg : "")};
  padding: ${({ pd }) => (pd ? pd : "")};

  ${({ variant }) => {
    switch (variant) {
      case "sign":
        return css`
          width: 370px;
          height: 730px;
          position: absolute;
          top: 120px;
          left: 50vw;
          transform: translate(-50%, 0);
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
          flex-direction: column;
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
          flex-direction: column;
        `;
      case "albumBox":
        return css`
          width: 525px;
          height: 525px;
          overflow: hidden;
        `;
      case "scroll-y":
        return css`
          margin: 10px 0;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          overflow-y: auto;
          &::-webkit-scrollbar {
            background: #d9d9d9;
            width: 6px;
            height: 100%;
            border-radius: 10px;
          }
          &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: #a4a19d;
          }
          &::-webkit-scrollbar-track {
            width: 0;
            height: auto;
          }
        `;
      default:
        break;
    }
  }}
`;
