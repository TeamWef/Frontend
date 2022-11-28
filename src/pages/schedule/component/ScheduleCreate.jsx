// 작성 페이지

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Div } from "../../../elem";
import { useModal } from "../../../hooks/useModal";
import { __addSchedule } from "../../../redux/modules/scheduleSlice";
import LandingPage from "./Landing";

const ScheduleCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { partyId } = useParams();
  const [Modal, openModal] = useModal();

  const [schedule, setSchedule] = useState({
    title: "",
    content: "",
    meetTime: "",
    date: "",
    place: { placeName: "", address: "" },
  });

  const onAddScheduleHandler = (e) => {
    e.preventDefault();
    if (
      !schedule.title ||
      !schedule.content ||
      !schedule.date ||
      !schedule.meetTime ||
      !schedule.place?.placeName ||
      !schedule.place?.address
    ) {
      return alert("모든 일정을 입력해주세요!");
    }
    dispatch(__addSchedule({ schedule, partyId }));
    navigate(`/${partyId}/schedule`);
    setSchedule({
      title: "",
      content: "",
      meetTime: "",
      date: "",
      place: { placeName: "", address: "" },
    });
    alert("일정 등록이 완료되었습니다!");
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value });
  };

  return (
    <Div variant="bodyContainer">
      <form onSubmit={onAddScheduleHandler}>
        <input
          type="text"
          placeholder="제목"
          name="title"
          onChange={onChangeHandler}
          minLength={1}
        />
        <input
          type="text"
          placeholder="내용"
          name="content"
          onChange={onChangeHandler}
          minLength={1}
        />
        <input type="time" name="meetTime" onChange={onChangeHandler} />
        <input type="date" name="date" onChange={onChangeHandler} />
        <button type="submit">작성</button>
      </form>
      {schedule.place ? (
        <>
          <p>{schedule.place.placeName}</p>
          <p>{schedule.place.address}</p>
        </>
      ) : (
        <>
          <p>선택한 장소가 없습니다.</p>
        </>
      )}
      <LandingPage
        setSchedule={setSchedule}
        schedule={schedule}
        openModal={openModal}
      />
    </Div>
  );
};

export default ScheduleCreate;
