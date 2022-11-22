import styled, { css } from "styled-components";
const Logo = ({ variant }) => {
  return <StLogo variant={variant} />;
};

export default Logo;

const StLogo = styled.div`
  display: flex;
  width: 160px;
  height: 160px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  cursor: pointer;

  ${({ variant }) => {
    switch (variant) {
      case "bigLogo":
        return css`
          background-image: url("/images/logo_x2.png"); ;
        `;

      default:
        break;
    }
  }}
`;
