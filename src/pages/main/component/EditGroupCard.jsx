import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { __updateGroup, __getGroup } from "../../../redux/modules/groupSlice";

const EditGroupCard = ({ id, isModalOpen, setModalOpen, groups }) => {
  const dispatch = useDispatch();
  const [editGroup, setEditGroup] = useState({
    partyName: "",
    partyIntroduction: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setEditGroup({ ...editGroup, [name]: value });
  };
  //   const partyId = useSelector((state) => state?.group.group.data);
  //   const id = partyId?.partyId;

  // console.log("id", id);
  // console.log("editGroup", editGroup);
  // console.log("::::", groups);

  const onAddGroupHandler = (e) => {
    e.preventDefault();
    dispatch(__updateGroup({ id, editGroup }));
    dispatch(__getGroup());
    setEditGroup({ partyName: "", partyIntroduction: "" });
    setModalOpen(false);
  };

  return (
    <>
      <div>
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
            placeholder="그룹을 다시 소개해 주세요!"
            onChange={onChangeHandler}
          />
          <button onClick={onAddGroupHandler}>수정하기</button>
        </form>
      </div>
    </>
  );
};

export default EditGroupCard;
