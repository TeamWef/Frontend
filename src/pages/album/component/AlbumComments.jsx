import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useInput } from "../../../hooks/useInput";
import { __addComment } from "../../../redux/modules/albumSlice";

const AlbumComments = ({ id }) => {
  const dispatch = useDispatch();
  const [comment, onChange, reset] = useInput("");

  const addCommnetHandler = () => {
    dispatch(__addComment({ id, comment }));
    reset();
  };

  return (
    <div>
      <h2>AlbumComments영역임</h2>
      <input placeholder="댓글 내용 작성" value={comment} onChange={onChange} />
      <button onClick={addCommnetHandler}>추가</button>
      <br />
      <br />
      <img src="" alt="profileImg" />
      <StSpan>이름</StSpan>
      <StSpan>댓글내용</StSpan>
      <button>삭제</button>
      <br />
      <img src="" alt="profileImg" />
      <StSpan>이름</StSpan>
      <StSpan>댓글내용</StSpan>
    </div>
  );
};

export default AlbumComments;

const StSpan = styled.span`
  margin-left: 5px;
`;
