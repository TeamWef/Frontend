// 작성 페이지

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Div, Flex, Span, Svg } from "../../../elem";
import { useModal } from "../../../hooks/useModal";
import { __addSchedule } from "../../../redux/modules/scheduleSlice";
import GroupTitle from "../../../components/GroupTitle";
import { Button } from "../../../elem";
import styled from "styled-components";
import KakaoMap from "./KakaoMap";

const ScheduleCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { partyId } = useParams();
  const [Modal, openModal] = useModal();
  const [map, openMap] = useModal();
  const [InputText, setInputText] = useState("");
  const [Place, setPlace] = useState("");

  const [schedule, setSchedule] = useState({
    title: "",
    content: "",
    meetTime: "",
    date: "",
    place: { placeName: "", address: "" },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(InputText);
    setInputText("");
  };
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
              <StTimeInput type="date" name="date" onChange={onChangeHandler} />
            </Flex>
            <Flex fd="row" ai="center" jc="left" margin="20px 0px 0px 0px">
              <Svg variant="location" />
              <StSearchDiv>
                {schedule.place ? (
                  <>
                    <Span variant="smallBronze" asf="center">
                      {schedule.place.placeName}
                    </Span>
                    <Span variant="other" asf="center" mg="0px 0px 0px 5px">
                      {schedule.place.address}
                    </Span>
                  </>
                ) : null}
                <button type="button" onClick={openMap}>
                  ⏐ 장소 찾기
                </button>
              </StSearchDiv>
            </Flex>
          </Flex>
        </form>
      </Div>

      <Flex>
        {map && (
          <div>
            <form className="inputForm" onSubmit={handleSubmit}>
              <input
                placeholder="검색어를 입력하세요"
                onChange={onChange}
                value={InputText}
                required
              />
              <button type="submit">검색</button>
            </form>
            <KakaoMap
              searchPlace={Place}
              setSchedule={setSchedule}
              schedule={schedule}
              openMap={openMap}
            />
          </div>
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
  & button {
    position: absolute;
    right: 30px;
    top: 597px;
    background-color: transparent;
    border: none;
    color: #a4a19d;
  }
`;
