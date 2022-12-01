import { useEffect, useRef, useState } from "react";
import { getCookie } from "../../redux/modules/customCookies";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import {
  __delNotice,
  __delNoticeAll,
  __getNoticeList,
  __readNotice,
} from "../../redux/modules/noticeSlice";
import { Div, Flex, Img, Margin, Span, Svg } from "../../elem";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";

const Notice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const noticeList = useSelector((state) => state.notice?.noticeList);
  const [modal, openModal, setModal] = useModal();
  const [newNoti, setNewNoti] = useState(0);

  const deleteHandler = (id) => {};

  console.log(noticeList);
  const ref = useRef(null);
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const token = getCookie("token");

  // useEffect(() => {
  //   console.log("첫번째 useEffect실행됐음");
  //   if (token) {
  //     const sse = new EventSource("http://43.201.55.218:8080/subscriptions", {
  //       headers: {
  //         Authorization: `${token}`,
  //       },
  //     });

  //     sse.onopen = (e) => {
  //       console.log("연결완료");
  //     };

  //     sse.onmessage = async (event) => {
  //       const res = await event.data;
  //       console.log("res =>", res);
  //       // const response = JSON.parse(e.data);
  //       // console.log(response);
  //     };

  //     // sse.addEventListener("sse", (e) => {
  //     // const response = JSON.parse(e.data);
  //     // console.log(response);
  //     //     if(e.data.startsWith('{')) {
  //     // setRealtimeAlam((prev) => [JSON.parse(e.data)])
  //     // });
  //     sse.addEventListener("sse", (e) => {
  //       console.log(e.data);
  //       if (e.data.startsWith("{")) {
  //         const msg = JSON.parse(e.data);
  //         console.log(msg);
  //       }
  //     });

  //     sse.addEventListener("error", (e) => {
  //       if (e) {
  //         console.log(e);
  //       }
  //       // return () => source.close();
  //     });
  //     return () => {
  //       if (token) {
  //         sse.close();
  //       }
  //     };
  //   }
  // }, [token]);

  const clickOutSide = (e) => {
    if (modal && !ref.current.contains(e.target)) {
      setModal(false);
    }
  };

  useEffect(() => {
    if (modal) document.addEventListener("mousedown", clickOutSide);
    return () => {
      document.removeEventListener("mousedown", clickOutSide);
    };
  });

  useEffect(() => {
    // console.log("두번째 useEffect실행됐음");
    dispatch(__getNoticeList());
  }, [dispatch, modal]);

  return (
    <div ref={ref}>
      {newNoti === 0 ? (
        <Svg variant="notification" onClick={openModal} />
      ) : (
        <Svg variant="newNotification" onClick={openModal} />
      )}

      {modal && (
        <Div variant="headerModal" width="400px" ai="flex-start">
          <Flex ai="center">
            <Margin mg="30px 0 0 0" />
            <Flex>
              <Flex fd="row" jc="space-between" width="340px">
                <Span variant="bigBronze">Update</Span>
                <Svg variant="close" onClick={openModal} />
              </Flex>
              <StBtn
                onClick={() => {
                  dispatch(__delNoticeAll());
                }}
              >
                알림 전체 지우기
              </StBtn>
            </Flex>
            <Flex fd="row">
              {noticeList.length !== 0 ? (
                <Div variant="scroll-y" width="360px" height="380px">
                  {noticeList.map((notice) => {
                    return (
                      <StNoticeDiv key={notice.id}>
                        <Flex fd="row">
                          <Flex>
                            <StTitleDiv>{notice.partyName}</StTitleDiv>
                            {notice.title ? (
                              <Flex fd="row">
                                <span>
                                  회원님이 작성한
                                  <StSpan>{notice.title}</StSpan>
                                  일정에
                                  <StSpan>{notice.writer}</StSpan>
                                  님이 참가하였습니다.
                                </span>
                                <Margin mg="10px" />
                              </Flex>
                            ) : (
                              <Flex>
                                <Flex fd="row">
                                  <span>
                                    회원님이 작성한 앨범에
                                    <StSpan>{notice.writer}</StSpan>
                                    님이 댓글을 달았습니다.
                                  </span>
                                  <Margin mg="10px" />
                                </Flex>
                                <StCommentDiv>
                                  {notice.profileUrl ? (
                                    <Img src={notice.profileUrl} />
                                  ) : (
                                    <Img src="/images/userProfile.jpg" />
                                  )}
                                  <Span variant="smallBronze" fw="700" mg="5px">
                                    {notice.writer}
                                  </Span>
                                  <Vertical />
                                  <Div width="150px" jc="flex-start">
                                    <StContentSpan>
                                      {notice.content}
                                    </StContentSpan>
                                    <Svg
                                      variant="editDelete"
                                      onClick={() => {
                                        navigate(`/${notice.url}`);
                                        localStorage.setItem(
                                          "Group",
                                          notice.partyName
                                        );
                                        openModal();
                                      }}
                                    />
                                  </Div>
                                </StCommentDiv>
                              </Flex>
                            )}
                          </Flex>
                          <Margin mg="0 10px 0 0" />
                          <Flex fd="row" ai="center">
                            {notice.status ? (
                              <Svg variant="readMsg" />
                            ) : (
                              <Svg
                                variant="newMsg"
                                onClick={() => {
                                  dispatch(__readNotice(notice.id));
                                }}
                              />
                            )}
                            <Margin mg="10px" />
                            <Svg
                              variant="cancle"
                              onClick={() => dispatch(__delNotice(notice.id))}
                            />
                          </Flex>
                        </Flex>
                      </StNoticeDiv>
                    );
                  })}
                </Div>
              ) : (
                <Div variant="null" width="360px" height="165px">
                  <Span variant="medium" color="#d9d3c7;">
                    현재 알림이 없습니다.
                  </Span>
                </Div>
              )}
            </Flex>
            <Margin mg="30px 0 0 0" />
          </Flex>
        </Div>
      )}
    </div>
  );
};
export default Notice;

const StBtn = styled.button`
  font-size: 12px;
  color: #a4a19d;
  background-color: transparent;
  border: 0;
  border-bottom: solid 1px #a4a19d;
  align-self: flex-end;
  cursor: pointer;
  margin-top: 30px;
`;

const StNoticeDiv = styled.div`
  display: flex;
  width: 335px;
  height: auto;
  font-size: 16px;
  padding-bottom: 15px;
  margin: 0 0 13px 10px;
  border-bottom: 1px solid #d9d3c7;
  line-height: 25px;
`;

const StTitleDiv = styled.div`
  display: flex;
  width: auto;
  align-self: flex-start;
  background-color: #fff;
  font-size: 18px;
  font-weight: bold;
  color: #a4a19d;
  padding: 3px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;
const StSpan = styled.span`
  padding: 2px 5px;
  margin: 0 3px;
  color: #535353;
  background-color: #ede8e1;
  border-radius: 5px;
`;

const StCommentDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #ede8e1;
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
`;

const Vertical = styled.div`
  width: 5px;
  height: 22px;
  margin: 5px;
  border-left: 1px solid #d9d3c7;
`;

const StContentSpan = styled.span`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 14px;
  color: #a4a19d;
  width: 120px;
  height: 35px;
  white-space: nowrap;
  overflow: hidden;
  margin-right: 10px;
`;
