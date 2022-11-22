import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __addGroup, __getGroup } from "../../../redux/modules/groupSlice";

const CreateGroupCard = ({ openModal, modal }) => {
  const navigate = useNavigate();
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
    <MainContainer>
      <CreateCardContainer>
        <TitleBox>
          <h2>Group Add</h2>
          <CloseBtn
            onClick={() => {
              navigate("/");
            }}
          >
            X
          </CloseBtn>
        </TitleBox>
        <FormBox>
          <form onSubmit={onAddGroupHandler}>
            <InputContainer>
              <GroupCreateInput
                name="partyName"
                type="text"
                placeholder="그룹명"
                onChange={onChangeHandler}
              />
              <GroupCreateInput
                name="partyIntroduction"
                type="text"
                placeholder="그룹을 소개해 주세요!"
                onChange={onChangeHandler}
              />
            </InputContainer>
            <ButtonContainer>
              <GroupCreateButton onClick={onAddGroupHandler}>
                Add
              </GroupCreateButton>
            </ButtonContainer>
          </form>
        </FormBox>
      </CreateCardContainer>
    </MainContainer>
  );
};

export default CreateGroupCard;

const MainContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(153, 153, 153, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreateCardContainer = styled.div`
  background-color: #f8f5f0;
  width: 440px;
  height: 411px;
  margin: 0 auto;
  margin-top: 100px;
  border-radius: 15px;
  z-index: 999;
`;

const TitleBox = styled.div`
  width: 378px;
  margin-top: 32px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  & h2 {
    font-size: 24px;
    margin-top: 30px;
  }
`;

const FormBox = styled.div`
  margin-top: 30px;
`;

const InputContainer = styled.div``;

const GroupCreateInput = styled.input`
  width: 375px;
  height: 60px;
  border: none;
  background-color: white;
  border-radius: 10px;
  margin-top: 10px;
  margin-left: 31px;
  ::placeholder {
    padding-left: 15px;
    font-size: 13px;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
`;

const GroupCreateButton = styled.button`
  background-color: #a4a19d;
  color: white;
  border: none;
  width: 375px;
  height: 54px;
  border-radius: 5px;
  font-size: 18px;
`;

const CloseBtn = styled.button`
  background-color: transparent;
  border: none;
  width: 60px;
  height: 54px;
  border-radius: 5px;
  font-size: 24px;
  margin-top: 20px;
  cursor: pointer;
`;
