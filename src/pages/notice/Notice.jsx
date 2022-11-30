import { useEffect, useRef } from "react";
import { getCookie } from "../../redux/modules/customCookies";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import {
  __delNotice,
  __delNoticeAll,
  __getNoticeList,
  __readNotice,
} from "../../redux/modules/noticeSlice";
import { Div, Flex, Margin, Span, Svg } from "../../elem";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";

const Notice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const noticeList = useSelector((state) => state.notice?.noticeList);
  const [modal, openModal] = useModal();

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

  useEffect(() => {
    // console.log("두번째 useEffect실행됐음");
    dispatch(__getNoticeList());
  }, [dispatch, modal]);

  return (
    <>
      <Svg variant="notification" onClick={openModal} />
      {modal && (
        <Div variant="headerModal" width="400px" height="600px">
          <Flex>
            <Flex fd="row" jc="space-between" width="360px">
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
            <Flex fd="row">
              <Div variant="scroll-y" width="360px" height="480px">
                {noticeList.map((notice) => {
                  return (
                    <StNoticeDiv>
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
                            </Flex>
                          ) : (
                            <Flex fd="row">
                              <span>
                                회원님이 작성한 앨범에
                                <StSpan>{notice.writer}</StSpan>
                                님이 댓글을 달았습니다.
                              </span>
                            </Flex>
                          )}
                        </Flex>
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
            </Flex>
          </Flex>
        </Div>
      )}
    </>
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
  width: 350px;
  height: 150px;
  font-size: 16px;
  padding: 5px 0 20px 0;
  margin-bottom: 10px;
  /* background-color: green; */
  border-bottom: 1px solid #d9d3c7;
  line-height: 25px;
`;

const StTitleDiv = styled.div`
  display: flex;
  width: auto;
  align-self: flex-start;
  background-color: #fff;
  font-size: 20px;
  font-weight: bold;
  color: #a4a19d;
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;
const StSpan = styled.span`
  padding: 2px 10px;
  margin: 3px;
  color: #535353;
  background-color: #ede8e1;
  border-radius: 5px;
`;
