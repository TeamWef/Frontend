import React, { useState } from "react";
import EditKakaoMap from "./EditKakaoMap";
import { useModal } from "../../../hooks/useModal";

function EditLanding({ editSchedule, setEditSchedule }) {
  const [InputText, setInputText] = useState("");
  const [Place, setPlace] = useState("");
  const [modal, openModal] = useModal();

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(InputText);
    setInputText("");
  };

  return (
    <>
      <button onClick={openModal}>장소 검색하기</button>
      {modal && (
        <div>
          <form className="inputForm" onSubmit={handleSubmit}>
            <input
              placeholder="검색어를 입력하세요"
              onChange={onChange}
              value={InputText}
            />
            <button type="submit">검색</button>
          </form>
          <EditKakaoMap
            searchPlace={Place}
            setEditSchedule={setEditSchedule}
            editSchedule={editSchedule}
          />
        </div>
      )}
    </>
  );
}

export default EditLanding;
