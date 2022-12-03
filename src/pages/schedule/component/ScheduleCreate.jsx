// 작성 페이지
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Div, Flex, Span, Svg, Input } from "../../../elem";
import { useModal } from "../../../hooks/useModal";
import { __addSchedule } from "../../../redux/modules/scheduleSlice";
import GroupTitle from "../../../components/GroupTitle";
import { Button } from "../../../elem";
import styled from "styled-components";
import KakaoMap from "./KakaoMap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

const ScheduleCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { partyId } = useParams();
  const [month, openMonth] = useModal();
  const [map, openMap] = useModal();
  const [InputText, setInputText] = useState("");
  const [Place, setPlace] = useState("");
  const [value, onChangeDate] = useState(new Date());
  const [schedule, setSchedule] = useState({
    title: "",
    content: "",
    meetTime: "",
    date: "",
    place: { placeName: "", address: "" },
  });

  const date = moment(value).format("YYYY-MM-DD");

  console.log(schedule);
  console.log(date);

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const onAddScheduleHandler = (e) => {
    e.preventDefault();
    if (
      !schedule.title ||
      !schedule.content ||
      !schedule.date ||
      !schedule.meetTime ||
      !schedule.place?.placeName ||
      !schedule.place?.address
    ) {
      return alert("모든 일정을 입력해주세요!");
    }
    dispatch(__addSchedule({ schedule, partyId }));
    navigate(`/${partyId}/schedule`);
    setSchedule({
      title: "",
      content: "",
      meetTime: "",
      date: "",
      place: { placeName: "", address: "" },
    });
    alert("일정 등록이 완료되었습니다!");
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value });
  };

  return (
    <Div variant="bodyContainer">
      <GroupTitle />
      <Div width="1100px">
        <form onSubmit={onAddScheduleHandler}>
          <Flex fd="row" jc="space-between">
            <Span variant="bold" mg="10px 0px 0px 0px">
              Schedule
            </Span>
            <div>
              <Button variant="small" type="submit">
                작성
              </Button>
              <Button
                variant="border-small"
                type="button"
                onClick={() => {
                  navigate(-1);
                }}
              >
                뒤로가기
              </Button>
            </div>
          </Flex>
          <StContentDiv>
            <StTitleInput
              type="text"
              placeholder="Title"
              name="title"
              onChange={onChangeHandler}
            />
            <StBorderDiv />
            <StTitleInput
              type="text"
              placeholder="내용"
              name="content"
              onChange={onChangeHandler}
            />
          </StContentDiv>
          <Flex fd="row" ai="center" jc="left">
            <Flex fd="row" ai="center" jc="left" margin="20px 0px 0px 0px">
              <Svg variant="time" />
              <StTimeInput
                type="time"
                name="meetTime"
                onChange={onChangeHandler}
              />
            </Flex>
            <Flex fd="row" ai="center" jc="left" margin="20px 0px 0px 0px">
              <Svg variant="date" />
              <StDateButton onClick={openMonth} type="button">
                만날 날짜 지정하기
              </StDateButton>
              {/* 달력 */}
              {month ? (
                <StMonthDiv>
                  <Calendar
                    minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                    maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
                    calendarType="US"
                    formatDay={(locale, date) => moment(date).format("DD")}
                    value={value}
                    name="date"
                    next2Label={null}
                    prev2Label={null}
                    onChange={onChangeDate}
                    onClickDay={() => {
                      setSchedule({ ...schedule, date: date });
                      openMonth();
                    }}
                  />
                </StMonthDiv>
              ) : null}

              {/* <StTimeInput type="date" name="date" onChange={onChangeHandler} /> */}
            </Flex>
            <Flex fd="row" ai="center" jc="left" margin="20px 0px 0px 0px">
              <Svg variant="location" />
              <StSearchDiv>
                {schedule?.place.address !== "" ? (
                  <StBgDiv>
                    <Span variant="smallBronze">
                      {schedule.place?.placeName}
                    </Span>
                    <Span variant="other" asf="center" mg="0px 0px 0px 5px">
                      {schedule.place?.address}
                    </Span>
                    <StBtn
                      type="button"
                      onClick={() => {
                        setSchedule({
                          ...schedule,
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
      </Div>

      <Flex>
        {map && (
          <>
            <KakaoMap
              searchPlace={Place}
              setSchedule={setSchedule}
              schedule={schedule}
              openMap={openMap}
            />
          </>
        )}
      </Flex>
    </Div>
  );
};

export default ScheduleCreate;

const StContentDiv = styled.div`
  width: 1088px;
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

const StBorderDiv = styled.div`
  width: 1006px;
  border: 1px solid #d9d3c7;
  margin: 10px 0px 0px 40px;
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
  right: 10px;
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
  top: 623px;
  left: 405px;

  .react-calendar {
    width: 314px;
    border: none;
    border: 1px solid #a4a19d;
    border-radius: 10px;
    margin-bottom: 50px;
  }

  .react-calendar__navigation {
    border-bottom: 1px solid #a4a19d;
    margin-bottom: 5px;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #d08383;
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
