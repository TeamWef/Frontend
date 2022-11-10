import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __delGroup, __getGroup } from "../../../redux/modules/groupSlice";

const GroupCard = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state?.group.group.data);
  // console.log("groups?? =>", groups);

  useEffect(() => {
    dispatch(__getGroup());
  }, [dispatch]);

  // console.log("key를 찾아서 =>", groups);

  const [isEdit, setIsEdit] = useState(false);
  const handleOpen = () => {
    setIsEdit(!isEdit);
  };

  // const [editInput, setEditInput] = useState("");
  // const handleOnChange = (e) => {
  //   setEditInput(e.target.value);
  //   setEditedComment((prev) => {
  //     return { ...prev, body: e.target.value };
  //   });
  // };

  return (
    <div>
      {groups?.map((data) => {
        return (
          <div key={data?.partyId}>
            <ul>
              <li>{data?.partyId}</li>
              <li>
                <h2>{data?.partyName}</h2>
              </li>
              <li>{data?.partyIntroduction}</li>
            </ul>
            <button onClick={handleOpen}>수정하기</button>
            <button
              onClick={() => {
                dispatch(__delGroup(data?.partyId));
              }}
            >
              삭제하기
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default GroupCard;
