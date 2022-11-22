import styled, { css } from "styled-components";

const Icon = ({ variant }) => {
  return <StIcon variant={variant} />;
};

export default Icon;

const StIcon = styled.div`
  display: flex;
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
  margin: 15px 5px;
  border-radius: 50px;
  cursor: pointer;
  ${({ variant }) => {
    switch (variant) {
      case "kakao":
        return css`
          background-color: rgb(250, 227, 1);
          background-image: url("/images/kakao_x2.png");
          background-position: 50% 60%;
          background-size: 50px;
        `;
      case "google":
        return css`
          background-color: #fff;
          background-image: url("/images/google_x2.png");
          background-position: 50% 60%;
          background-size: 50px;
        `;

      default:
        break;
    }
  }}
`;
