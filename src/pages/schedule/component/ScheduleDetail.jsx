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
import EditKakaoMap from "../component/EditKakaoMap";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Button, Div, Flex, Margin, Span, Svg } from "../../../elem";
import GroupTitle from "../../../components/GroupTitle";

const SchdeleDetail = ({ scheduleId }) => {
  const scheduleDetail = useSelector((state) => state.schedule?.scheduleDetail);
  const participant = useSelector((state) => state.mypage?.myProfile);
  const participanter = useSelector((state) => state.schedule?.join);
  const [InputText, setInputText] = useState("");
  const [Place, setPlace] = useState("");
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

  const [modal, openModal] = useModal();
  const [map, openMap] = useModal();
  const [month, openMonth, setMonth] = useModal();
  const [value, setValue] = useState(new Date());
  const [date, setDate] = useState("");

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

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const onClickHandler = (value, event) => {
    openMonth();
    const day = moment(value).format("YYYY-MM-DD");
    setDate(day);
    console.log(date);
    setEditSchedule({ ...editSchedule, date: day });
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

      {modal && (
        <Div variant="bodyContainer">
          <StMainDiv>
            <form onSubmit={onEditScheduleHandler}>
              <Flex fd="row" jc="space-between">
                <Span variant="bold" mg="10px 0px 0px 0px">
                  Schedule
                </Span>
                <div>
                  <Button
                    variant="small"
                    type="submit"
                    onClick={() => {
                      navigate(
                        `/${partyId}/scheduledetail/${scheduleDetail?.scheduleId}`
                      );
                    }}
                  >
                    작성
                  </Button>
                  <Button
                    variant="border-small"
                    type="button"
                    onClick={() => {
                      openModal();
                    }}
                  >
                    뒤로가기
                  </Button>
                </div>
              </Flex>
              <StContentDiv>
                <StTitleInput
                  type="text"
                  placeholder="제목"
                  name="title"
                  onChange={onChangeHandler}
                  value={editSchedule.title}
                />
                <StTitleInput
                  type="text"
                  placeholder="내용"
                  name="content"
                  onChange={onChangeHandler}
                  value={editSchedule.content}
                />
              </StContentDiv>
              <Flex fd="row" ai="center" jc="left">
                <Flex fd="row" ai="center" jc="left" margin="20px 0px 0px 0px">
                  <Svg variant="time" />
                  <StTimeInput
                    type="time"
                    name="meetTime"
                    value={editSchedule.meetTime}
                    onChange={onChangeHandler}
                  />
                </Flex>
                <Flex fd="row" ai="center" jc="left" margin="20px 0px 0px 0px">
                  <Svg variant="date" />
                  {editSchedule.date === "" ? (
                    <StDateButton onClick={openMonth} type="button">
                      만날 날짜 지정하기
                    </StDateButton>
                  ) : (
                    <StSearchDiv>
                      <Span variant="other">{date}</Span>
                      <StDateBtn type="button" onClick={openMonth}>
                        ⏐ 다시 찾기
                      </StDateBtn>
                    </StSearchDiv>
                  )}
                  {month ? (
                    <StMonthDiv>
                      <Calendar
                        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                        calendarType="US"
                        locale="en-EN"
                        formatDay={(locale, date) => moment(date).format("DD")}
                        value={value}
                        name="date"
                        next2Label={null}
                        prev2Label={null}
                        onChange={setValue}
                        selectRange={false}
                        onClickDay={onClickHandler}
                      />
                    </StMonthDiv>
                  ) : null}
                </Flex>

                <Flex fd="row" ai="center" jc="left" margin="20px 0px 0px 0px">
                  <Svg variant="location" />
                  <StSearchDiv>
                    {editSchedule?.place.address !== "" ? (
                      <StBgDiv>
                        <Span variant="smallBronze">
                          {editSchedule.place?.placeName}
                        </Span>
                        <Span variant="other" asf="center" mg="0px 0px 0px 5px">
                          {editSchedule.place?.address}
                        </Span>
                        <StBtn
                          type="button"
                          onClick={() => {
                            setEditSchedule({
                              ...editSchedule,
                              place: { placeName: "", address: "" },
                            });
                          }}
                        >
                          ⏐ 다시 찾기
                        </StBtn>
                      </StBgDiv>
                    ) : (
                      <Flex>
                        <StKakaoDiv>
                          <input
                            placeholder="Address"
                            onChange={onChange}
                            value={InputText}
                          />
                          <StBtn
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setPlace(InputText);
                              setInputText("");
                              openMap();
                            }}
                          >
                            ⏐ 장소 찾기
                          </StBtn>
                        </StKakaoDiv>
                      </Flex>
                    )}
                  </StSearchDiv>
                </Flex>
              </Flex>
            </form>
          </StMainDiv>
        </Div>
      )}
      <Flex>
        {map && (
          <>
            <EditKakaoMap
              searchPlace={Place}
              setEditSchedule={setEditSchedule}
              editSchedule={editSchedule}
              openMap={openMap}
            />
          </>
        )}
      </Flex>
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

const StContentDiv = styled.div`
  width: 1100px;
  height: 335px;
  background: #ffffff;
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const StTitleInput = styled.input`
  margin: 20px 0px 0px 40px;
  width: 1000px;
  height: 30px;
  background-color: transparent;
  border: none;
  &::placeholder {
    padding: 10px;
    font-size: 18px;
  }
`;

// const StBorderDiv = styled.div`
//   width: 1006px;
//   border: 1px solid #d9d3c7;
//   margin: 10px 0px 0px 40px;
// `;

const StMainDiv = styled.div`
  background-color: #f8f5f0;
  position: absolute;
  top: -440px;
`;

const StTimeInput = styled.input`
  width: 314px;
  height: 38px;
  background-color: white;
  border-radius: 5px;
  border: none;
  margin-right: 20px;
  margin-left: 10px;
`;

const StSearchDiv = styled.div`
  width: 314px;
  height: 38px;
  background-color: white;
  border-radius: 5px;
  border: none;
  padding: 10px;
  display: flex;
  margin-left: 15px;
  margin-right: 15px;
`;

const StDateButton = styled.button`
  width: 314px;
  height: 38px;
  background-color: white;
  border-radius: 5px;
  border: none;
  padding: 10px;
  display: flex;
  margin-left: 15px;
  margin-right: 15px;
  cursor: pointer;
  color: #a4a19d;
  justify-content: center;
  align-items: center;
`;

const StBtn = styled.button`
  position: absolute;
  top: 422px;
  right: 10px;
  width: 100px;
  background-color: transparent;
  border: none;
  color: #a4a19d;
`;

const StDateBtn = styled.button`
  position: absolute;
  top: 422px;
  left: 630px;
  width: 100px;
  background-color: transparent;
  border: none;
  color: #a4a19d;
`;

const StKakaoDiv = styled.div`
  display: flex;
  align-items: center;
  & input {
    width: 230px;
    border: none;
  }
  & button {
    cursor: pointer;
  }
`;

const StBgDiv = styled.div`
  display: flex;
  background-color: white;
`;

const StMonthDiv = styled.div`
  position: absolute;
  top: 448px;
  left: 406px;

  .react-calendar {
    width: 314px;
    border: none;
    border: 1px solid #d9d3c7;
    box-shadow: 5px 5px 15px rgba(164, 161, 157, 0.15);
    border-radius: 10px;
    margin-bottom: 50px;
    color: #a4a19d;
  }

  .react-calendar__navigation {
    border-bottom: 1px solid #d9d3c7;
    margin-bottom: 5px;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #d08383;
  }

  .react-calendar__month-view__days {
    color: #a4a19d;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.3;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: transparent;
  }

  .react-calendar__navigation button {
    color: #a4a19d;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    background-color: #fff;
    cursor: pointer;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    color: #a4a19d;
  }

  .react-calendar__tile--now {
    background-color: #fff;
  }

  .react-calendar__tile--active {
    background-color: #a4a19d;
    color: #fff;
  }

  .react-calendar__navigation button:disabled {
    background-color: transparent;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: #a4a19d;
  }
  .react-calendar__tile {
    height: 25px;
    margin-top: 5px;
    padding: 5px;
    background: none;
    text-align: center;
  }
`;
