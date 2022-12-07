import styled, { css } from "styled-components";

const Img = ({ children, ...props }) => {
  return <StImg {...props}>{children}</StImg>;
};
export default Img;

const StImg = styled.img`
  width: ${({ width }) => (width ? width : "30px")};
  height: ${({ height }) => (height ? height : "30px")};
  border-radius: 50%;
  object-fit: ${({ obf }) => (obf ? obf : "cover")};
  margin: ${({ mg }) => (mg ? mg : "")};

  ${({ variant }) => {
    switch (variant) {
      case "album":
        return css`
          width: 100%;
          height: auto;
          border-radius: 5px;
        `;
      default:
        break;
    }
  }}
`;
