import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateGroupCard from "../component/CreateGroupCard";
import {
  __delGroup,
  __getGroup,
  __updateGroup,
} from "../../../redux/modules/groupSlice";
import { useModal } from "../../../hooks/useModal";
import { useEditModal } from "../../../hooks/useEditModal";
import styled from "styled-components";
import Svg from "../../../elem/Svg";
import MainScheduleCard from "../component/MainScheduleCard";
import { Button } from "../../../elem";

const GroupCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const groups = useSelector((state) => state.group?.group);
  const [modal, openModal] = useModal();
  const [EditModal, openEditModal] = useEditModal();
  const [updateId, setUpdateId] = useState("");
  const [updatepartyId, setUpdatepartyId] = useState("");
  const [editGroup, setEditGroup] = useState({
    partyName: "",
    partyIntroduction: "",
  });

  useEffect(() => {
    dispatch(__getGroup());
  }, [dispatch]);

  const onAddGroupHandler = (e) => {
    // e.preventDefault();
    // const id = data.partyId;
    // dispatch(__updateGroup({ id, editGroup }));
    // dispatch(__getGroup());
    // setEditGroup({ partyName: "", partyIntroduction: "" });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setEditGroup({ ...editGroup, [name]: value });
  };

  const [dropdown, setDropdown] = useState(false);

  return (
    <>
      <MainTitleContainer>
        <h2>Group.</h2>
        <CreateBtn
          onClick={() => {
            openModal();
          }}
        >
          <Svg variant={"add"} />
        </CreateBtn>
        {modal ? <CreateGroupCard openModal={openModal} modal={modal} /> : null}
      </MainTitleContainer>
      {groups?.length !== 0 ? (
        <>
          <GroupMaincontainer>
            {groups?.map((data) => {
              return (
                <GroupCardContainer key={data?.partyId}>
                  <TitleContainer>
                    <h2>{data?.partyName}</h2>
                    <button
                      onClick={() => {
                        setDropdown(!dropdown);
                        updatepartyId();
                      }}
                    >
                      <Svg variant={"editDelete"} />
                    </button>
                  </TitleContainer>
                  {dropdown ? (
                    <DropBox>
                      <DropBoxButtonBorderLineNone
                        onClick={() => {
                          openEditModal();
                        }}
                      >
                        수정
                      </DropBoxButtonBorderLineNone>
                      <DropBoxButton
                        onClick={() => {
                          if (window.confirm("정말 삭제하시겠습니까?")) {
                            dispatch(__delGroup(data?.partyId));
                            alert("삭제가 완료되었습니다.");
                          }
                        }}
                      >
                        삭제
                      </DropBoxButton>
                    </DropBox>
                  ) : null}
                  <p>{data?.partyIntroduction}</p>
                  <ButtonWrap>
                    <Button
                      variant="small"
                      onClick={() => {
                        navigate(`/${data.partyId}`);
                      }}
                    >
                      Join
                    </Button>
                  </ButtonWrap>
                  {data.partyId === updateId && (
                    <BackGround>
                      <EditModalContainer>
                        <ModalTitleBox>
                          <h2>Group Edit.</h2>
                          <CloseButton
                            onClick={() => {
                              setUpdateId("");
                            }}
                          >
                            <Svg variant={"close"} />
                          </CloseButton>
                        </ModalTitleBox>
                        <form onSubmit={onAddGroupHandler}>
                          <EditModalInput
                            name="partyName"
                            type="text"
                            placeholder="Title"
                            onChange={onChangeHandler}
                          />
                          <EditModalInput
                            name="partyIntroduction"
                            type="text"
                            placeholder="Introduction"
                            onChange={onChangeHandler}
                          />
                          <EditModalEditButton
                            onClick={(e) => {
                              e.preventDefault();
                              const id = data.partyId;
                              dispatch(
                                __updateGroup({
                                  id,
                                  partyName: editGroup.partyName,
                                  partyIntroduction:
                                    editGroup.partyIntroduction,
                                })
                              );
                              setEditGroup({
                                partyName: "",
                                partyIntroduction: "",
                              });
                              setUpdateId("");
                            }}
                          >
                            Apply
                          </EditModalEditButton>
                        </form>
                      </EditModalContainer>
                    </BackGround>
                  )}
                </GroupCardContainer>
              );
            })}
          </GroupMaincontainer>
        </>
      ) : (
        <NullBox>
          <NullBoxTextBox>
            <NullBoxH3>현재 그룹이 없습니다.</NullBoxH3>
            <NullBoxH3>
              새로운 그룹을 만들어 친구들을 초대해보세요! 🍀
            </NullBoxH3>
          </NullBoxTextBox>
        </NullBox>
      )}
    </>
  );
};

export default GroupCard;

const MainTitleContainer = styled.div`
  width: 1078px;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  & h2 {
    margin-top: 40px;
  }
  & button {
  }
`;

const CreateBtn = styled.div`
  border: none;
  width: 100px;
  height: 20px;
  margin-top: 40px;
  background-color: transparent;
  cursor: pointer;
`;

const GroupMaincontainer = styled.div`
  width: 1078px;
  height: 255px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(100, 1fr);
  white-space: nowrap;
  overflow-x: auto;
  margin-top: 40px;
  &::-webkit-scrollbar {
    background: #d9d9d9;
    width: 100%;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    width: 200px;
    height: 5px;
    background: #a4a19d;
  }
  &::-webkit-scrollbar-track {
    width: 1078px;
  }
  /* overflow: hidden; */
`;

const GroupCardContainer = styled.div`
  width: 250px;
  height: 220px;
  margin: 0 auto;
  border-radius: 5px;
  background-color: white;
  margin-left: 15px;
  box-shadow: 1px 1px 1px 1px #dadada52;
  &div {
    white-space: nowrap;
    overflow-x: auto;
    overflow: hidden;
  }
  & p {
    color: #949494;
    margin-left: 20px;
    margin-top: 10px;
  }
`;

const TitleContainer = styled.div`
  width: 223px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  & h2 {
    margin-top: 23px;
  }
  & button {
    border: none;
    background-color: transparent;
    width: 20px;
    height: 10px;
    margin-top: 23px;
    font-size: 18px;
  }
`;

const GroupMoreButton = styled.button`
  width: 115px;
  height: 34px;
  background-color: #a4a19d;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 13px;
  margin-left: 27%;
  margin-top: 80px;
`;

const BackGround = styled.div`
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

const EditModalContainer = styled.div`
  position: relative;
  width: 440px;
  height: 370px;
  background-color: #f8f5f0;
  border-radius: 5px;
  padding: 20px;
`;

const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const ModalTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EditModalInput = styled.input`
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
    background-image: url("");
  }
`;

const EditModalEditButton = styled.button`
  width: 375px;
  height: 55px;
  margin-top: 20px;
  background-color: #a4a19d;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 20px;
`;

const NullBox = styled.div`
  width: 999px;
  height: 227px;
  border: 2px dashed #d9d3c7;
  border-radius: 10px;
  margin-left: 450px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const NullBoxTextBox = styled.div`
  margin-top: 90px;
`;

const NullBoxH3 = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #a4a19d;
  text-align: center;
`;

const DropBox = styled.div`
  position: absolute;
  width: 80px;
  height: 60px;
  margin-left: 215px;
  margin-top: 5px;
  background-color: white;
  border: 1px solid #d9d3c7;
  border-radius: 5px;
  z-index: 999;
  box-shadow: 5px 5px 15px rgba(164, 161, 157, 0.15);
  display: flex;
  flex-direction: column;
`;

const DropBoxButton = styled.button`
  width: 80px;
  height: 30px;
  border: none;
  border-top: 1px solid #ede8e1;
  background-color: transparent;
  color: #a4a19d;
  cursor: pointer;
`;

const DropBoxButtonBorderLineNone = styled.button`
  width: 80px;
  height: 30px;
  border: none;
  background-color: transparent;
  color: #a4a19d;
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  margin-left: 27%;
  margin-top: 50px;
`;
