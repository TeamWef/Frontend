import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  __delGroup,
  __getGroup,
  __updateGroup,
} from "../../../redux/modules/groupSlice";
import { useModal } from "../../../hooks/useModal";
import { useInput } from "../../../hooks/useInput";

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

  console.log("groups ==>", groups);

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
      <div>
        {groups?.map((data) => {
          return (
            <div key={data?.partyId}>
              <p>{data?.partyId}</p>
              <h2>{data?.partyName}</h2>
              <p>{data?.partyIntroduction}</p>
              <button
                onClick={() => {
                  openModal();
                  setUpdateId(data.partyId);
                }}
              >
                수정하기
              </button>

              <button
                onClick={() => {
                  if (window.confirm("정말 삭제하시겠습니까?")) {
                    dispatch(__delGroup(data?.partyId));
                    alert("삭제가 완료되었습니다.");
                  }
                }}
              >
                삭제하기
              </button>
              <button
                onClick={() => {
                  navigate(`/schedule/${data.partyId}`);
                }}
              >
                일정 등록
              </button>
              <button
                onClick={() => {
                  navigate(`/schedulelist/${data.partyId}`);
                }}
              >
                그룹 일정 목록 보기
              </button>
              <button
                onClick={() => {
                  navigate(`/${data.partyId}/album`);
                }}
              >
                앨범보기
              </button>

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
                        setEditGroup({ partyName: "", partyIntroduction: "" });
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
          );
        })}
      </div>
    </>
  );
};

export default GroupCard;
