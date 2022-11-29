import styled, { css } from "styled-components";

const Img = ({ children, ...props }) => {
  return <StImg {...props}>{children}</StImg>;
};
export default Img;

const StImg = styled.img`
  width: ${({ width }) => (width ? width : "30px")};
  height: ${({ height }) => (height ? height : "30px")};
  border-radius: 50%;
  object-fit: cover;

  ${({ variant }) => {
    switch (variant) {
      case "profile":
        return css``;
      default:
        break;
    }
  }}
`;
