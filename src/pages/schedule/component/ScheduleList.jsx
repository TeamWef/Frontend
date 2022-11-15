// get 해온 게시글 리스트들이 뿌려지는 곳
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ScheduleList = () => {
  const schedule = useSelector((state) => state.schedule.schedule);
  console.log(schedule);
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        작성하기
      </button>
    </div>
  );
};
