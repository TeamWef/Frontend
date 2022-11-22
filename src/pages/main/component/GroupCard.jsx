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
import { useInput } from "../../../hooks/useInput";
import styled from "styled-components";

const GroupCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const groups = useSelector((state) => state?.group.group);

  const [modal, openModal] = useModal();
  const [updateId, setUpdateId] = useState("");

  const [editGroup, setEditGroup] = useState({
    partyName: "",
    partyIntroduction: "",
  });

  // console.log("groups ==>", groups);

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

  return (
    <>
      <MainTitleContainer>
        <h2>Group.</h2>
        <CreateBtn
          onClick={() => {
            openModal();
          }}
        >
          추가하기
        </CreateBtn>
        {modal ? <CreateGroupCard openModal={openModal} modal={modal} /> : null}
      </MainTitleContainer>
      <GroupMaincontainer>
        {groups?.map((data) => {
          return (
            <GroupCardContainer key={data?.partyId}>
              <TitleContainer>
                <h2>{data?.partyName}</h2>
                <button>・・・</button>
              </TitleContainer>
              <p>{data?.partyIntroduction}</p>
              {/* <Btn
                onClick={() => {
                  openModal();
                  setUpdateId(data.partyId);
                }}
              >
                수정하기
              </Btn> */}
              <Btn
                onClick={() => {
                  if (window.confirm("정말 삭제하시겠습니까?")) {
                    dispatch(__delGroup(data?.partyId));
                    alert("삭제가 완료되었습니다.");
                  }
                }}
              >
                삭제하기
              </Btn>
              {/* <Btn
                onClick={() => {
                  navigate(`/schedule/${data.partyId}`);
                }}
              >
                일정 등록
              </Btn> */}
              <GroupMoreButton
                onClick={() => {
                  navigate(`/schedulelist/${data.partyId}`);
                }}
              >
                Join
              </GroupMoreButton>
              {/* <Btn
                onClick={() => {
                  navigate(`/${data.partyId}/album`);
                }}
              >
                앨범보기
              </Btn> */}
              {data.partyId === updateId && (
                <>
                  <form onSubmit={onAddGroupHandler}>
                    <input
                      name="partyName"
                      type="text"
                      placeholder="그룹명을 수정하세요"
                      onChange={onChangeHandler}
                    />
                    <input
                      name="partyIntroduction"
                      type="text"
                      placeholder="그룹을 소개해 주세요!"
                      onChange={onChangeHandler}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const id = data.partyId;
                        dispatch(
                          __updateGroup({
                            id,
                            partyName: editGroup.partyName,
                            partyIntroduction: editGroup.partyIntroduction,
                          })
                        );
                        setEditGroup({
                          partyName: "",
                          partyIntroduction: "",
                        });
                        setUpdateId("");
                      }}
                    >
                      수정하기
                    </button>
                    <button
                      onClick={() => {
                        setUpdateId("");
                      }}
                    >
                      닫기
                    </button>
                  </form>
                </>
              )}
            </GroupCardContainer>
          );
        })}
      </GroupMaincontainer>
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
  margin-left: 23%;
  margin-top: 50px;
`;

const Btn = styled.button`
  background-color: white;
  border: none;
  margin-left: 10px;
  margin-top: 20px;
  width: 60px;
  height: 2rem;
  border: 1px solid gray;
  border-radius: 15px;
  display: none;
`;
