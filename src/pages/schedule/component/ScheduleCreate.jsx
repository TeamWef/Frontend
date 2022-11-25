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

  // console.log("스케쥴 안에 무엇이 담겨있나요? =>", schedule);

  const onAddScheduleHandler = (e) => {
    e.preventDefault();
    dispatch(__addSchedule({ schedule, partyId }));
    navigate(`/${partyId}/schedulelist`);
    setSchedule({
      title: "",
      content: "",
      meetTime: "",
      date: "",
      place: { placeName: "", address: "" },
    });
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
          required
        />
        <input
          type="text"
          placeholder="내용"
          name="content"
          onChange={onChangeHandler}
          minLength={1}
          required
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
