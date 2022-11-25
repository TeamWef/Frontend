import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Flex } from "../../../elem";
import { useInput } from "../../../hooks/useInput";
import {
  __addComment,
  __delComment,
  __updateComment,
} from "../../../redux/modules/albumSlice";

const AlbumComments = ({ id, commentList, myId }) => {
  const dispatch = useDispatch();
  //등록시 State
  const [comment, onChange, reset] = useInput("");

  //수정시 State
  const [updateTarget, setUpdateTarget] = useState("");
  const [Input, changeInput, inputReset, setInput] = useInput("");

  const addCommentHandler = () => {
    dispatch(__addComment({ id, comment }));
    reset();
  };

  const delCommentHandler = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(__delComment(id));
      alert("삭제가 완료되었습니다.");
    }
  };
  return (
    <Flex>
      <h2>AlbumComments영역임</h2>
      <Flex fd="row">
        <input
          placeholder="댓글 내용 작성"
          value={comment}
          onChange={onChange}
        />
        <button onClick={addCommentHandler}>추가</button>
      </Flex>
      <br />
      <Flex>
        {commentList?.map((comment) => {
          return (
            <Flex fd="row" jc="flex-start" key={comment.id}>
              <Flex fd="row">
                {comment.profileImageUrl ? (
                  <Profile src={comment.profileImageUrl} alt="profileImg" />
                ) : (
                  <Profile src="/images/userProfile.jpg" alt="profileImg" />
                )}
                <StSpan>{comment.writer}</StSpan>
              </Flex>
              {comment.id === updateTarget ? (
                <>
                  <input value={Input} onChange={changeInput} />
                </>
              ) : (
                <StSpan>{comment.content}</StSpan>
              )}
              <StSpan>{comment.beforeTime}</StSpan>
              {comment.id === updateTarget ? (
                <>
                  <button
                    onClick={() => {
                      dispatch(
                        __updateComment({ id: comment.id, content: Input })
                      );
                      setUpdateTarget("");
                      inputReset();
                    }}
                  >
                    수정 완료
                  </button>
                  <button onClick={() => setUpdateTarget("")}>취소</button>
                </>
              ) : (
                <>
                  {myId === comment.memberEmail ? (
                    <>
                      <button
                        onClick={() => {
                          setUpdateTarget(comment.id);
                          setInput(comment.content);
                        }}
                      >
                        수정
                      </button>
                      <button onClick={() => delCommentHandler(comment.id)}>
                        삭제
                      </button>
                    </>
                  ) : null}
                </>
              )}
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default AlbumComments;

const StSpan = styled.span`
  margin-left: 5px;
`;

const Profile = styled.img`
  position: relative;
  width: 20px;
  height: 20px;
`;
