import styled, { css } from "styled-components";

const DropDown = ({ children, ...props }) => {
  return <StBtn {...props}>{children}</StBtn>;
};

export default DropDown;

const StBtn = styled.button`
  width: 80px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #ede8e1;
  background-color: transparent;
  color: #a4a19d;
  cursor: pointer;

  ${({ variant }) => {
    switch (variant) {
      case "bottom":
        return css`
          font-size: 13px;
          width: 80px;
          height: 30px;
          border: none;
          background-color: transparent;
          color: #a4a19d;
          cursor: pointer;
        `;
      default:
        break;
    }
  }}
`;
