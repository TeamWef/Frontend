import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __addGroup, __getGroup } from "../../../redux/modules/groupSlice";
import Svg from "../../../elem/Svg";
import { Button, Div, Flex, Input, Margin, Span } from "../../../elem";

const CreateGroupCard = ({ openModal, modal }) => {
  const dispatch = useDispatch();
  const [group, setGroup] = useState({
    partyName: "",
    partyIntroduction: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setGroup({ ...group, [name]: value });
  };

  const onAddGroupHandler = (e) => {
    e.preventDefault();
    if (!group.partyName || !group.partyIntroduction) {
      return alert("그룹 내용을 입력해주세요!");
    }
    dispatch(__addGroup(group));
    openModal();
    alert("그룹이 생성 되었습니다!");
  };

  return (
    <Div variant="background">
      <Div variant="groupEdit">
        <Flex>
          <Flex fd="row" jc="space-between">
            <Span variant="bold">Group Add</Span>
            <Svg
              variant="close"
              onClick={() => {
                openModal();
              }}
            />
          </Flex>
          <Margin />
          <form onSubmit={onAddGroupHandler}>
            <StInput
              name="partyName"
              type="text"
              placeholder="Group title"
              onChange={onChangeHandler}
            />
            <StInput
              name="partyIntroduction"
              type="text"
              placeholder="Group Introduction"
              onChange={onChangeHandler}
            />
            <Margin mg="50px" />
            <Button variant="large" onClick={onAddGroupHandler}>
              Apply
            </Button>
          </form>
        </Flex>
      </Div>
    </Div>
  );
};

export default CreateGroupCard;

const StInput = styled.input`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  width: 375px;
  height: 55px;
  border: none;
  border-bottom: 1px solid #a4a19d;
  background-color: transparent;
  &::placeholder {
    font-size: 16px;
    font-weight: 500;
  }
`;
