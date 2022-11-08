// get 해온 게시글 리스트들이 뿌려지는 곳
import React from "react";
import { useNavigate } from "react-router-dom";

export const ScheduleList = () => {
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
