// 게시글 하나당 보여지는 상세 페이지임 (수정/삭제 버튼 있어야 함)
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  __getScheduleDetail,
  __delSchedule,
  __editSchedules,
  __joinSchedules,
} from "../../../redux/modules/scheduleSlice";
import { useModal } from "../../../hooks/useModal";
import EditLanding from "./EditLanding";
import styled from "styled-components";
import { Div } from "../../../elem";

const SchdeleDetail = ({ scheduleId }) => {
  const scheduleDetail = useSelector((state) => state.schedule?.scheduleDetail);
  console.log("디테일 selector==>", scheduleDetail);
  const detailId = useParams().scheduleId;
  const partyId = useParams().partyId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getScheduleDetail(detailId));
  }, [dispatch, detailId]);
  const navigate = useNavigate();

  console.log(useParams());

  const [editSchedule, setEditSchedule] = useState({
    title: "",
    content: "",
    meetTime: "",
    date: "",
    place: { placeName: "", address: "" },
  });

  const [scheduleJoin, setScheduleJoin] = useState(false);
  // const join = useSelector((state) => state.schedule.join);
  const joiner = scheduleDetail?.participantResponseDtoList;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setEditSchedule({ ...editSchedule, [name]: value });
  };

  const [modal, openModal] = useModal();

  const onEditScheduleHandler = (e) => {
    e.preventDefault();
    dispatch(__editSchedules({ detailId, editSchedule }));
  };

  return (
    <Div variant="bodyContainer">
      <h2>title : {scheduleDetail?.title}</h2>
      <h3>작성자 : {scheduleDetail?.writer}</h3>
      <p>id : {scheduleDetail?.scheduleId}</p>
      <p>내용 : {scheduleDetail?.content}</p>
      <p>만나는 날짜 : {scheduleDetail?.date}</p>
      <p>만나는 시간 : {scheduleDetail?.meetTime}</p>
      <p>
        만나는 장소 :
        {scheduleDetail?.placeName || scheduleDetail.place?.placeName}
      </p>
      <p>
        만나는 장소의 주소 :
        {scheduleDetail?.address || scheduleDetail.place?.address}
      </p>

      {joiner?.map((item, i) => {
        return (
          <div key={i}>
            <Profile alt="맹짱구" src={item.profileImageUrl} />
            <p>참여자 : {item.memberName}</p>
          </div>
        );
      })}

      <button
        onClick={(e) => {
          e.preventDefault();
          setScheduleJoin();
          dispatch(__joinSchedules(scheduleDetail?.scheduleId));
        }}
      >
        {scheduleJoin ? "취소하기" : "참여하기"}
      </button>
      {/* 참여자 목록 보내주실 때 byme 카테고리에 참여 true, 미참여 false값 받기 */}
      <button onClick={openModal}>수정하기</button>
      <button
        onClick={() => {
          if (window.confirm("정말 삭제하시겠습니까?")) {
            dispatch(__delSchedule(detailId));
            alert("삭제가 완료되었습니다.");
          }
          navigate(`/${partyId}/schedulelist`);
        }}
      >
        삭제하기
      </button>
      {modal && (
        <div>
          <form onSubmit={onEditScheduleHandler}>
            <input
              type="text"
              placeholder="제목"
              name="title"
              onChange={onChangeHandler}
            />
            <input
              type="text"
              placeholder="내용"
              name="content"
              onChange={onChangeHandler}
            />
            <input type="time" name="meetTime" onChange={onChangeHandler} />
            <input type="date" name="date" onChange={onChangeHandler} />
            <button
              type="submit"
              onClick={() => {
                navigate(
                  `/${partyId}/scheduledetail/${scheduleDetail?.scheduleId}`
                );
              }}
            >
              작성
            </button>
          </form>
          <EditLanding
            setEditSchedule={setEditSchedule}
            editSchedule={editSchedule}
          />
        </div>
      )}
    </Div>
  );
};

export default SchdeleDetail;

const Profile = styled.img`
  width: 50px;
  border-radius: 50%;
`;
