import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Div, Flex, Img, Margin, Span } from "../../../elem";
import { useInput } from "../../../hooks/useInput";
import {
  __addComment,
  __delComment,
  __updateComment,
} from "../../../redux/modules/albumSlice";

const AlbumComments = ({ id, commentList, myId }) => {
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.mypage?.myProfile);
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
    <StContainer>
      <StAddComment>
        <Flex ai="flex-start">
          <Flex fd="row" ai="center">
            {myProfile.profileImageUrl ? (
              <Img src={myProfile.profileImageUrl} alt="img" />
            ) : (
              <Img src="/images/userProfile.jpg" alt="img" />
            )}
            <Span variant="mediumBronze" mg="0 0 0 5px">
              {myProfile.memberName}
            </Span>
          </Flex>
          <Flex fd="row">
            <StInput
              placeholder="댓글 내용 작성하기"
              value={comment}
              onChange={onChange}
            />
            <Button variant="small" onClick={addCommentHandler}>
              댓글쓰기
            </Button>
          </Flex>
        </Flex>
      </StAddComment>
      <br />
      <Flex>
        <Div variant="scroll-y" width="470px" height="179px">
          {commentList?.map((comment) => {
            return (
              <StComment key={comment.id}>
                <Flex fd="row" ai="center" jc="flex-start">
                  {comment.profileImageUrl ? (
                    <Img src={comment.profileImageUrl} alt="profileImg" />
                  ) : (
                    <Img src="/images/userProfile.jpg" alt="profileImg" />
                  )}
                  <Span variant="mediumBronze" mg="0 25px 0 5px">
                    {comment.writer}
                  </Span>
                  <Span variant="smallBronze">{comment.beforeTime}</Span>
                </Flex>
                <Margin mg="5px" />
                {comment.id === updateTarget ? (
                  <>
                    <input value={Input} onChange={changeInput} />
                  </>
                ) : (
                  <Span variant="smallBronze">{comment.content}</Span>
                )}
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
              </StComment>
            );
          })}
        </Div>
      </Flex>
    </StContainer>
  );
};

export default AlbumComments;

const StInput = styled.input`
  background-color: transparent;
  border: 0;
  width: 322px;
  color: #a4a19d;
  ::placeholder {
    opacity: 0.5;
  }
`;

const StContainer = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  width: 500px;
  height: 260px;
`;

const StAddComment = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  border: 1px solid #a4a19d;
  border-radius: 5px;
`;

const StComment = styled.div`
  width: 455px;
  height: auto;
  padding-bottom: 15px;
  margin: 0 5px 15px 5px;
  border-bottom: 1px solid #d9d3c7;
`;
