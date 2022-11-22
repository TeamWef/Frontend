import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __addGroup, __getGroup } from "../../../redux/modules/groupSlice";

const CreateGroupCard = () => {
  const navigate = useNavigate();
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
    dispatch(__addGroup(group));
    // dispatch(__getGroup());
    setGroup({ partyName: "", partyIntroduction: "" });
  };

  return (
    <CreateCardContainer>
      <TitleBox>
        <h2>Group Add</h2>
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
            <GroupCloseButton
              onClick={() => {
                navigate(-1);
              }}
              type="button"
            >
              Close
            </GroupCloseButton>
            <GroupCreateButton type="submit" onClick={onAddGroupHandler}>
              Add
            </GroupCreateButton>
          </ButtonContainer>
        </form>
      </FormBox>
    </CreateCardContainer>
  );
};

export default CreateGroupCard;

const CreateCardContainer = styled.div`
  background-color: #ede8e1;
  width: 440px;
  height: 411px;
  /* margin: 0 auto; */
  border-radius: 15px;
`;

const TitleBox = styled.div`
  width: 378px;
  margin-top: 32px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  background-color: #ede8e1;
  & h2 {
    font-size: 24px;
    background-color: #ede8e1;
    margin-top: 30px;
  }
`;

const FormBox = styled.div`
  background-color: #ede8e1;
  margin-top: 30px;
  & form {
    background-color: #ede8e1;
  }
`;

const InputContainer = styled.div`
  background-color: #ede8e1;
`;

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
  background-color: #ede8e1;
  display: flex;
  justify-content: space-evenly;
`;

const GroupCreateButton = styled.button`
  background-color: #a4a19d;
  border: none;
  width: 180px;
  height: 54px;
  border-radius: 5px;
  font-size: 18px;
`;

const GroupCloseButton = styled.button`
  background-color: transparent;
  border: 1px solid gray;
  width: 180px;
  height: 54px;
  border-radius: 5px;
  font-size: 18px;
`;
