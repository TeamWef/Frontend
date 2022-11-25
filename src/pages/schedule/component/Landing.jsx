import React, { useState } from "react";
import KakaoMap from "./KakaoMap";
import { useModal } from "../../../hooks/useModal";

function LandingPage({ setSchedule, schedule }) {
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
              required
            />
            <button type="submit">검색</button>
          </form>
          <KakaoMap
            searchPlace={Place}
            setSchedule={setSchedule}
            schedule={schedule}
            openModal={openModal}
          />
        </div>
      )}
    </>
  );
}

export default LandingPage;
