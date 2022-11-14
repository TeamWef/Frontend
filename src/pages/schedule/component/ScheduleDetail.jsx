// 게시글 하나당 보여지는 상세 페이지임 (수정/삭제 버튼 있어야 함)
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  __getScheduleDetail,
  __delSchedule,
} from "../../../redux/modules/scheduleSlice";

const SchdeleDetail = ({ scheduleId }) => {
  const scheduleDetail = useSelector((state) => state.schedule?.scheduieDetail);
  // console.log("디테일 selector==>", scheduleDetail);
  const detailId = useParams().scheduleId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getScheduleDetail(detailId));
  }, [dispatch, detailId]);
  const navigate = useNavigate();

  // console.log("디테일 파람스 !!! schdeleId===>", detailId);

  return (
    <div>
      <h2>title : {scheduleDetail.title}</h2>
      <h3>작성자 : {scheduleDetail.writer}</h3>
      <p>내용 : {scheduleDetail.content}</p>
      <p>만나는 날짜 : {scheduleDetail.date}</p>
      <p>만나는 시간 : {scheduleDetail.meetTime}</p>
      <p>만나는 장소 : {scheduleDetail.placeName}</p>
      <p>만나는 장소의 주소 : {scheduleDetail.address}</p>
      <button>참여하기</button>
      {/* 참여자 목록 보내주실 때 byme 카테고리에 참여 true, 미참여 false값 받기 */}
      <button>수정하기</button>
      <button
        onClick={() => {
          dispatch(__delSchedule(detailId));
          navigate(-1);
        }}
      >
        삭제하기
      </button>
    </div>
  );
};

export default SchdeleDetail;
