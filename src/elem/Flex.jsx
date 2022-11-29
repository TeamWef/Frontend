import styled from "styled-components";

const Flex = ({ children, ...props }) => {
  return <Flexbox {...props}>{children}</Flexbox>;
};

export default Flex;

const Flexbox = styled.div`
  display: flex;
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "center")};
  align-items: ${({ ai }) => (ai ? ai : "")};
  position: ${({ posi }) => (posi ? posi : "")};
  width: ${({ width }) => (width ? width : "")};
  height: ${({ height }) => (height ? height : "")};
  margin: ${({ margin }) => (margin ? margin : "")};
`;
