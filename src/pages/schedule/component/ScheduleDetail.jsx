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
import { Div, Svg } from "../../../elem";

const SchdeleDetail = ({ scheduleId }) => {
  const scheduleDetail = useSelector((state) => state.schedule?.scheduleDetail);
  // console.log("디테일 selector==>", scheduleDetail);
  const participant = useSelector((state) => state.mypage?.myProfile);
  const participanter = useSelector((state) => state.schedule?.join);

  const [isParticipant, setIsParticipant] = useState(
    scheduleDetail.isParticipant
  );
  const detailId = useParams().scheduleId;
  const partyId = useParams().partyId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getScheduleDetail(detailId));
  }, [dispatch, detailId]);
  const navigate = useNavigate();

  // console.log(useParams());

  const [editSchedule, setEditSchedule] = useState({
    title: "",
    content: "",
    meetTime: "",
    date: "",
    place: { placeName: "", address: "" },
  });

  const [scheduleJoin, setScheduleJoin] = useState(false);
  const joiner = scheduleDetail?.participantResponseDtoList;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setEditSchedule({ ...editSchedule, [name]: value });
  };

  console.log(editSchedule);

  const [modal, openModal] = useModal();

  const onEditScheduleHandler = (e) => {
    e.preventDefault();
    if (
      !editSchedule.title ||
      !editSchedule.content ||
      !editSchedule.date ||
      !editSchedule.meetTime ||
      !editSchedule.place?.placeName ||
      !editSchedule.place?.address
    ) {
      return alert("모든 일정을 입력해주세요!");
    }
    dispatch(__editSchedules({ detailId, editSchedule }));
    openModal();
    alert("수정이 완료되었습니다!");
  };

  return (
    <Div variant="bodyContainer">
      <Div variant="title">
        <h2>Group title.</h2>
      </Div>
      <p>Schedule.</p>
      <StTitleDiv>
        <h2>{scheduleDetail?.title}</h2>
        <img src={scheduleDetail?.profileImageUrl} alt="프로필" />
        <p>{scheduleDetail?.writer}</p>
      </StTitleDiv>
      <StTitleDiv>
        <button onClick={openModal}>수정</button>
        <button
          onClick={() => {
            if (window.confirm("정말 삭제하시겠습니까?")) {
              dispatch(__delSchedule(detailId));
              alert("삭제가 완료되었습니다.");
            }
            navigate(`/${partyId}/schedule`);
          }}
        >
          삭제
        </button>
      </StTitleDiv>
      <p> {scheduleDetail?.content}</p>
      <Svg variant="date" />
      <p> {scheduleDetail?.date}</p>
      <Svg variant="clock" />
      <p> {scheduleDetail?.meetTime}</p>
      <Svg variant="location" />
      <p>{scheduleDetail?.placeName || scheduleDetail.place?.placeName}</p>
      <p>{scheduleDetail?.address || scheduleDetail.place?.address}</p>

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
          dispatch(__joinSchedules({ detailId, participant }));
          setIsParticipant(!isParticipant);
        }}
      >
        {isParticipant ? "취소" : "참여"}
      </button>
      {/* 참여자 목록 보내주실 때 byme 카테고리에 참여 true, 미참여 false값 받기 */}

      {modal && (
        <div>
          <form onSubmit={onEditScheduleHandler}>
            <input
              type="text"
              placeholder="제목"
              name="title"
              onChange={onChangeHandler}
              value={editSchedule.title}
            />
            <input
              type="text"
              placeholder="내용"
              name="content"
              onChange={onChangeHandler}
              value={editSchedule.content}
            />
            <input
              type="time"
              name="meetTime"
              value={editSchedule.meetTime}
              onChange={onChangeHandler}
            />
            <input
              type="date"
              name="date"
              value={editSchedule.date}
              onChange={onChangeHandler}
            />
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
          {editSchedule.place ? (
            <>
              <p>{editSchedule.place.placeName}</p>
              <p>{editSchedule.place.address}</p>
            </>
          ) : (
            <>
              <p>선택한 장소가 없습니다.</p>
            </>
          )}
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

const StTitleDiv = styled.div`
  display: flex;
  & img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
`;
