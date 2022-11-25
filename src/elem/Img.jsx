import styled, { css } from "styled-components";

const Img = ({ children, ...props }) => {
  return <StImg {...props}>{children}</StImg>;
};
export default Img;

const StImg = styled.img`
  width: ${({ width }) => (width ? width : "column")};
  height: ${({ height }) => (height ? height : "column")};

  ${({ variant }) => {
    switch (variant) {
      case "profile":
        return css`
          width: "20px";
          height: "20px";
        `;
      default:
        break;
    }
  }}
`;
