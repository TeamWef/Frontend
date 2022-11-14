import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __delGroup, __getGroup } from "../../../redux/modules/groupSlice";
import EditGroupCard from "../component/EditGroupCard";

const GroupCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const groups = useSelector((state) => state?.group.group.data);
  // console.log("groups?? =>", groups);

  useEffect(() => {
    dispatch(__getGroup());
  }, [dispatch]);

  // console.log("key를 찾아서 =>", groups);

  const [isModalOpen, setModalOpen] = useState(false);
  // const onClickModal = () => {
  //   setModalOpen(!true);
  // };

  // const [editInput, setEditInput] = useState("");
  // const handleOnChange = (e) => {
  //   setEditInput(e.target.value);
  //   setEditedComment((prev) => {
  //     return { ...prev, body: e.target.value };
  //   });
  // };

  return (
    <>
      <div>
        {groups?.map((data) => {
          return (
            <div
              key={data?.partyId}
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
            >
              <ul>
                <li>{data?.partyId}</li>
                <li>
                  <h2>{data?.partyName}</h2>
                </li>
                <li>{data?.partyIntroduction}</li>
              </ul>
              <button
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                수정하기
              </button>
              <button
                onClick={() => {
                  dispatch(__delGroup(data?.partyId));
                }}
              >
                삭제하기
              </button>
              <button
                onClick={() => {
                  navigate(`/schedule/${data.partyId}`);
                }}
              >
                접속하기🌟
              </button>
              <button
                onClick={() => {
                  navigate(`/${data.partyId}/album`);
                }}
              >
                앨범보기
              </button>

              {isModalOpen && (
                <EditGroupCard
                  groups={groups}
                  isModalOpen={isModalOpen}
                  setModalOpen={setModalOpen}
                  id={data.partyId}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GroupCard;
