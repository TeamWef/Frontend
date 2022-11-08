import { useState } from "react";
import { useDispatch } from "react-redux";
import { __addGroup } from "../../../redux/modules/groupSlice";

const CreateGroupCard = () => {
  const dispatch = useDispatch();
  const [group, setGroup] = useState({
    partyName: "",
    partyIntroduction: "",
  });

  console.log("group=>", group);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setGroup({ ...group, [name]: value });
  };

  const onAddGroupHandler = (e) => {
    e.preventDefault();
    dispatch(__addGroup(group));
  };

  return (
    <div>
      <form onSubmit={onAddGroupHandler}>
        <input
          name="partyName"
          type="text"
          placeholder="그룹명"
          onChange={onChangeHandler}
        />
        <input
          name="partyIntroduction"
          type="text"
          placeholder="그룹을 소개해 주세요!"
          onChange={onChangeHandler}
        />
        <button onClick={onAddGroupHandler}>생성하기</button>
      </form>
    </div>
  );
};

export default CreateGroupCard;
