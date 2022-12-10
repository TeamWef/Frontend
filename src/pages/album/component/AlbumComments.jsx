import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Button, Div, Flex, Img, Margin, Span, Svg } from "../../../elem";
import { useInput } from "../../../hooks/useInput";
import { useModal } from "../../../hooks/useModal";
import {
  __addComment,
  __delComment,
  __updateComment,
} from "../../../redux/modules/albumSlice";

const AlbumComments = ({ id, commentList, myId }) => {
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.mypage?.myProfile);
  const [comment, onChange, reset] = useInput("");
  const [updateTarget, setUpdateTarget] = useState("");
  const [Input, changeInput, inputReset, setInput] = useInput("");
  const [updateMode, setUpdateMode] = useState("");
  const [edit, onEdit] = useModal();

  const addCommentHandler = () => {
    if (!comment) {
      return alert("앗! 내용이 없어요!");
    }
    dispatch(__addComment({ id, comment }));
    reset();
  };

  const delCommentHandler = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(__delComment(id));
      alert("삭제가 완료되었습니다!");
    }
  };
  return (
    <StContainer>
      <StAddDiv>
        <Flex ai="flex-start">
          <Flex fd="row" ai="center">
            {myProfile.profileImageUrl ? (
              <Img src={myProfile.profileImageUrl} alt="img" />
            ) : (
              <Svg variant="profile" />
            )}
            <Span variant="mediumBronze" mg="0 0 0 5px">
              {myProfile.memberName}
            </Span>
          </Flex>
          <Flex fd="row">
            <StInput
              bc="transparent"
              placeholder="댓글을 입력해주세요 (최대 250자)"
              value={comment}
              onChange={onChange}
              maxLength="250"
            />
            <Button variant="small" onClick={addCommentHandler}>
              댓글쓰기
            </Button>
          </Flex>
        </Flex>
      </StAddDiv>
      <br />
      <Flex>
        <Div variant="scroll-y" width="470px" height="165px">
          {commentList?.map((comment) => {
            return (
              <StCommentDiv key={comment.id}>
                <Flex fd="row" ai="center" jc="space-between" width="">
                  <Flex fd="row" ai="center">
                    {comment.profileImageUrl ? (
                      <Img src={comment.profileImageUrl} alt="profileImg" />
                    ) : (
                      <Svg variant="profile" />
                    )}
                    <Span variant="mediumBronze" mg="0 25px 0 5px">
                      {comment.writer}
                    </Span>
                    <Span variant="smallBronze">{comment.beforeTime}</Span>
                  </Flex>
                  {myId === comment.memberEmail && (
                    <>
                      <Div>
                        <Svg
                          variant="editDelete"
                          onClick={() => {
                            onEdit();
                            setUpdateTarget(comment.id);
                          }}
                        />
                        <Margin mg="10px" />
                      </Div>
                      {edit && comment.id === updateTarget && (
                        <Div
                          variant="dropDown"
                          top="25px"
                          left="140px"
                          bd="1px solid #d9d3c7"
                        >
                          <Button
                            variant="drop"
                            bb="1px solid #d9d3c7"
                            onClick={() => {
                              setUpdateTarget(comment.id);
                              setInput(comment.content);
                              setUpdateMode(true);
                              onEdit();
                            }}
                          >
                            수정하기
                          </Button>
                          <Button
                            variant="drop"
                            onClick={() => delCommentHandler(comment.id)}
                          >
                            삭제하기
                          </Button>
                        </Div>
                      )}
                    </>
                  )}
                </Flex>
                <Flex fd="row" jc="flex-start">
                  {updateMode && comment.id === updateTarget ? (
                    <>
                      <StInput bc="#fff" value={Input} onChange={changeInput} />
                      <StButton
                        onClick={() => {
                          dispatch(
                            __updateComment({
                              id: comment.id,
                              content: Input,
                            })
                          );
                          setUpdateTarget("");
                          inputReset();
                          setUpdateMode(false);
                        }}
                      >
                        수정
                      </StButton>
                      <StButton
                        onClick={() => {
                          setUpdateTarget("");
                          setUpdateMode(false);
                        }}
                      >
                        취소
                      </StButton>
                    </>
                  ) : (
                    <StContentSpan>{comment.content}</StContentSpan>
                  )}
                  <Margin mg="5px" />
                </Flex>
              </StCommentDiv>
            );
          })}
        </Div>
      </Flex>
    </StContainer>
  );
};

export default AlbumComments;

const StInput = styled.input`
  background-color: ${(props) => props.bc};
  border: 0;
  width: 322px;
  color: #a4a19d;
  border-radius: 5px;
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

const StAddDiv = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  border: 1px solid #a4a19d;
  border-radius: 5px;
`;

const StCommentDiv = styled.div`
  position: relative;
  width: 455px;
  height: auto;
  padding-bottom: 15px;
  margin: 0 5px 15px 5px;
  border-bottom: 1px solid #d9d3c7;
`;

const StContentSpan = styled.span`
  margin-top: 5px;
  width: 450px;
  height: auto;
  display: block;
  align-items: center;
  font-size: 14px;
  color: #a4a19d;
  overflow-wrap: break-word;
`;

const StButton = styled.button`
  font-size: 14px;
  color: #a4a19d;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  margin: 5px;
`;
