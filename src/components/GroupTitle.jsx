import styled from "styled-components";

const GroupTitle = () => {
  const Group = localStorage.getItem("Group");
  return <StDiv>{Group}</StDiv>;
};

export default GroupTitle;

const StDiv = styled.div`
  width: auto;
  padding: 0 60px;
  height: 35px;
  background-color: #ede8e1;
  color: #a4a19d;
  font-size: 18px;
  font-weight: 700;
  margin: 70px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;
