import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateGroupCard from "../component/CreateGroupCard";
import {
  __delGroup,
  __getGroup,
  __getOutGroup,
  __updateGroup,
} from "../../../redux/modules/groupSlice";
import { useModal } from "../../../hooks/useModal";
import styled from "styled-components";
import Svg from "../../../elem/Svg";
import { Button, Div, Flex, Margin, Span } from "../../../elem";
import { getCookie } from "../../../redux/modules/customCookies";
import jwt_decode from "jwt-decode";
import { useInput, useInputs } from "../../../hooks/useInput";
import { __delGroupSchedule } from "../../../redux/modules/scheduleSlice";

const GroupCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const groups = useSelector((state) => state.group?.group);
  const [createModal, openCreateModal] = useModal();
  const [editModal, openEditModal] = useModal();
  const [dropBox, openDropBox] = useModal();
  const [updateId, setUpdateId] = useState("");
  const [editGroup, onChange, reset] = useInputs({
    partyName: "",
    partyIntroduction: "",
  });

  const { partyName, partyIntroduction } = editGroup;

  const groupItem = {
    id: updateId,
    partyName: partyName,
    partyIntroduction: partyIntroduction,
  };

  //토큰 디코드
  const token = getCookie("token").replace("Bearer ", "");
  const decode = jwt_decode(token);
  const myId = decode.sub;

  useEffect(() => {
    dispatch(__getGroup());
  }, [dispatch]);

  const onEdit = (e) => {
    e.preventDefault();
    if (!editGroup.partyName || !editGroup.partyIntroduction) {
      return alert("항목이 비어있어요! 🫢 모든 항목을 입력해주세요.");
    }
    dispatch(__updateGroup(groupItem));
    setUpdateId("");
    openEditModal();
  };

  return (
    <>
      <Div variant="bodyContainer">
        <Flex>
          <Margin />
          <Flex fd="row" jc="space-between">
            <Span variant="bold">Group.</Span>
            <Div
              onClick={() => {
                openCreateModal();
              }}
            >
              <Svg variant="add" />
            </Div>
          </Flex>
          {groups?.length !== 0 ? (
            <StContainerDiv>
              {groups?.map((data) => {
                return (
                  <StCardDiv key={data?.partyId}>
                    <StTitleDiv>
                      <h2>{data?.partyName}</h2>
                      <button
                        onClick={() => {
                          openDropBox();
                          setUpdateId(data.partyId);
                        }}
                      >
                        <Svg variant="editDelete" />
                      </button>
                    </StTitleDiv>
                    <p>{data?.partyIntroduction}</p>
                    <StbuttonDiv>
                      <Button
                        variant="small"
                        onClick={() => {
                          navigate(`/${data.partyId}`);
                          localStorage.setItem("Group", data.partyName);
                        }}
                      >
                        Join
                      </Button>
                    </StbuttonDiv>
                    {dropBox &&
                      data.partyId === updateId &&
                      (data.memberEmail === myId ? (
                        <Div variant="dropDown" top="50px">
                          <Button
                            variant="drop-top"
                            onClick={() => {
                              openEditModal();
                              openDropBox();
                            }}
                          >
                            그룹 수정
                          </Button>
                          <Button
                            variant="drop-bottom"
                            top="50px"
                            onClick={() => {
                              if (window.confirm("정말 삭제하시겠습니까?")) {
                                dispatch(__delGroup(data?.partyId));
                                dispatch(__delGroupSchedule(data?.partyId));
                                alert("삭제가 완료되었습니다.");
                              }
                              openDropBox();
                            }}
                          >
                            그룹 삭제
                          </Button>
                        </Div>
                      ) : (
                        <Div variant="dropDown" top="50px">
                          <Button
                            variant="drop-bottom"
                            onClick={() => {
                              if (
                                window.confirm("정말 그룹을 나가시겠습니까?🥺")
                              ) {
                                dispatch(__getOutGroup(data?.partyId));
                                dispatch(__delGroupSchedule(data.partyId));
                                alert("다음에 또 만나요! 👋🏻 ");
                              }
                              openDropBox();
                            }}
                          >
                            그룹 나가기
                          </Button>
                        </Div>
                      ))}
                  </StCardDiv>
                );
              })}
            </StContainerDiv>
          ) : (
            <Div variant="null" width="1070px" height="227px">
              <Flex>
                <Span variant="bigBronze" asf="center">
                  현재 그룹이 없습니다.
                </Span>
                <Span variant="bigBronze" asf="center">
                  새로운 그룹을 만들어 친구들을 초대해보세요! 🍀
                </Span>
              </Flex>
            </Div>
          )}
        </Flex>
      </Div>
      {createModal && (
        <CreateGroupCard openModal={openCreateModal} modal={createModal} />
      )}
      {editModal && (
        <Div variant="background">
          <Div variant="groupEdit">
            <Flex>
              <Flex fd="row" jc="space-between">
                <Span variant="bold">Group Edit.</Span>
                <Svg
                  variant="close"
                  onClick={() => {
                    openEditModal();
                    setUpdateId("");
                  }}
                />
              </Flex>
              <Margin />
              <div>
                <form onSubmit={onEdit}>
                  <StInput
                    name="partyName"
                    type="text"
                    placeholder="Title"
                    onChange={onChange}
                    value={editGroup.partyName}
                  />
                  <StInput
                    name="partyIntroduction"
                    type="text"
                    placeholder="Introduction"
                    onChange={onChange}
                    value={editGroup.partyIntroduction}
                  />
                  <Margin mg="50px" />
                  <Button variant="large">Apply</Button>
                </form>
              </div>
            </Flex>
          </Div>
        </Div>
      )}
    </>
  );
};

export default GroupCard;

const StContainerDiv = styled.div`
  position: relative;
  width: 1075px;
  height: 255px;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(100, 1fr);
  overflow-x: auto;
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
`;

const StCardDiv = styled.div`
  position: relative;
  width: 250px;
  height: 220px;
  border-radius: 5px;
  background-color: white;
  margin-left: 15px;
  box-shadow: 1px 1px 1px 1px #dadada52;
  & p {
    white-space: normal;
    color: #949494;
    padding: 20px;
  }
`;

const StTitleDiv = styled.div`
  width: 223px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  & h2 {
    margin-top: 23px;
  }
  & button {
    width: 20px;
    height: 10px;
    margin-top: 23px;
    border: none;
    background-color: transparent;
  }
`;

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

const StbuttonDiv = styled.div`
  position: absolute;
  left: 70px;
  bottom: 20px;
`;
