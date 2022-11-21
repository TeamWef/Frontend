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
    // console.log("add 안에", id);
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
      <GroupMaincontainer>
        {/* <CreateGroupCard /> */}

        {groups?.map((data) => {
          return (
            <GroupCardContainer>
              <div key={data?.partyId}>
                <TitleContainer>
                  <h2>{data?.partyName}</h2>
                  <button>・・・</button>
                </TitleContainer>
                <p>{data?.partyIntroduction}</p>

                <Btn
                  onClick={() => {
                    openModal();
                    setUpdateId(data.partyId);
                  }}
                >
                  수정하기
                </Btn>

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

                <Btn
                  onClick={() => {
                    navigate(`/schedule/${data.partyId}`);
                  }}
                >
                  일정 등록
                </Btn>

                <GroupMoreButton
                  onClick={() => {
                    navigate(`/schedulelist/${data.partyId}`);
                  }}
                >
                  More
                </GroupMoreButton>

                <Btn
                  onClick={() => {
                    navigate(`/${data.partyId}/album`);
                  }}
                >
                  앨범보기
                </Btn>

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
              </div>
            </GroupCardContainer>
          );
        })}
      </GroupMaincontainer>
    </>
  );
};

export default GroupCard;

const GroupMaincontainer = styled.div`
  width: 1078px;
  height: 220px;
  display: flex;
  /* float: left; */
`;

const GroupCardContainer = styled.div`
  width: 250px;
  height: 220px;
  background-color: white;
  margin-left: 10px;
  & div {
    background-color: white;
  }
  & p {
    background-color: white;
    color: #949494;
    margin-left: 20px;
    margin-top: 10px;
  }
`;

const TitleContainer = styled.div`
  width: 223px;
  background-color: gray;
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
