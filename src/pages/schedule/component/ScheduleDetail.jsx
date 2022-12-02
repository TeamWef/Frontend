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

import { Button, Div, Flex, Margin, Span, Svg, Img } from "../../../elem";
import GroupTitle from "../../../components/GroupTitle";

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
      <GroupTitle />
      <StDiv>Schedule.</StDiv>
      <Flex jc="space-between" fd="row" width="1000px">
        <Flex fd="row" ai="center">
          <Span variant="bold" mg="0px 20px 0px 0px">
            {scheduleDetail?.title}
          </Span>
          {scheduleDetail?.profileImageUrl === null ? (
            <Svg variant="profile" />
          ) : (
            <StImg src={scheduleDetail?.profileImageUrl} alt="프로필" />
          )}

          <Span variant="smallBronze" mg="0px 0px 0px 5px">
            {scheduleDetail?.writer}
          </Span>
        </Flex>
        <Flex fd="row">
          <Button variant="border-small" onClick={openModal}>
            수정하기
          </Button>
          <Button
            variant="border-small"
            onClick={() => {
              if (window.confirm("정말 삭제하시겠습니까?")) {
                dispatch(__delSchedule(detailId));
                alert("삭제가 완료되었습니다.");
              }
              navigate(`/${partyId}/schedule`);
            }}
          >
            삭제하기
          </Button>
          <Button
            variant="border-small"
            onClick={() => {
              navigate(-1);
            }}
          >
            목록보기
          </Button>
        </Flex>
      </Flex>
      <StBorderDiv />
      <StBaseDiv>
        <Span variant="medium" asf="stretch">
          {scheduleDetail?.content}
        </Span>
      </StBaseDiv>
      <Flex width="1000px" margin="100px 0px 0px 0px">
        <Flex fd="row" ai="center" jc="left">
          <Svg variant="date" />
          <Span mg="0px 0px 0px 10px" variant="smallBronze">
            {scheduleDetail?.date}
          </Span>
        </Flex>
        <Flex fd="row" ai="center" jc="left">
          <Svg variant="clock" />
          <Span mg="0px 0px 0px 10px" variant="smallBronze">
            {scheduleDetail?.meetTime}
          </Span>
        </Flex>
        <Flex fd="row" ai="center" jc="left">
          <Svg variant="location" />
          <Span mg="0px 0px 0px 10px" variant="smallBronze">
            {scheduleDetail?.placeName || scheduleDetail.place?.placeName}
          </Span>
          <Span variant="other" mg="0px 0px 0px 10px">
            {scheduleDetail?.address || scheduleDetail.place?.address}
          </Span>
        </Flex>
      </Flex>
      <Flex width="1000px" fd="row" jc="left">
        {isParticipant ? (
          <Button
            variant="border-small"
            margin="50px 0px 0px 0px"
            onClick={(e) => {
              e.preventDefault();
              setScheduleJoin();
              dispatch(__joinSchedules({ detailId, participant }));
              setIsParticipant(!isParticipant);
            }}
          >
            참여하기
          </Button>
        ) : (
          <Button
            variant="small"
            margin="50px 0px 0px 0px"
            onClick={(e) => {
              e.preventDefault();
              setScheduleJoin();
              dispatch(__joinSchedules({ detailId, participant }));
              setIsParticipant(!isParticipant);
            }}
          >
            취소하기
          </Button>
        )}

        <Margin mg="55px 0px 0px 15px">
          {isParticipant ? <Svg variant="handOff" /> : <Svg variant="handOn" />}
        </Margin>
        {joiner?.map((item, i) => {
          return (
            <Flex fd="row" ai="center" key={i}>
              <StJoinDiv>
                {item?.profileImageUrl === null ? (
                  <StSizeDiv>
                    <Svg variant="profile" />
                  </StSizeDiv>
                ) : (
                  <StImg alt="맹짱구" src={item?.profileImageUrl} />
                )}

                <Span variant="small" mg="0px 5px">
                  {item?.memberName}
                </Span>
              </StJoinDiv>
            </Flex>
          );
        })}
      </Flex>

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

const StImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

const StDiv = styled.div`
  width: 1000px;
  margin-top: 15px;
  color: #a5a29e;
  font-weight: 500;
  font-size: 16px;
  text-align: left;
`;

const StBorderDiv = styled.div`
  width: 1020px;
  border: 1px solid #d9d3c7;
  margin: 10px 0px 20px 0px;
`;

const StBaseDiv = styled.div`
  width: 1000px;
`;

const StJoinDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  height: 30px;
  background-color: #ede8e1;
  border-radius: 5px;
  margin: 50px 0px 0px 10px;
`;

const StSizeDiv = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;
