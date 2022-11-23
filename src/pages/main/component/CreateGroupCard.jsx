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

  console.log("===>", group);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setGroup({ ...group, [name]: value });
  };

  const onAddGroupHandler = (e) => {
    e.preventDefault();
    dispatch(__addGroup(group));
    // dispatch(__getGroup());
    // setGroup({ partyName: "", partyIntroduction: "" });
    openModal();
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
            <Span variant="mediumBronze">Group title</Span>
            <Margin mg="12px" />
            <Input
              variant="big"
              name="partyName"
              type="text"
              placeholder="그룹이름을 설정해주세요!"
              onChange={onChangeHandler}
            />
            <Span variant="mediumBronze">Group contents</Span>
            <Margin mg="12px" />
            <Input
              variant="big"
              name="partyIntroduction"
              type="text"
              placeholder="그룹을 소개해 주세요!"
              onChange={onChangeHandler}
            />
            <Margin mg="20px" />
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
