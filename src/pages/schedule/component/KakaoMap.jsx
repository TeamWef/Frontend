import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Div, Span, Svg, Flex } from "../../../elem";

const { kakao } = window;

const KakaoMap = ({ searchPlace, setSchedule, schedule, openMap }) => {
  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([]);

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
        // 페이지 목록 보여주는 displayPagination() 추가
        displayPagination(pagination);
        setPlaces(data);
      }
    }

    // 검색결과 목록 하단에 페이지 번호 표시
    function displayPagination(pagination) {
      var paginationEl = document.getElementById("pagination"),
        fragment = document.createDocumentFragment(),
        i;

      // 기존에 추가된 페이지 번호 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= 1; i++) {
        var el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace]);

  return (
    <StContainerDiv>
      <Div id="myMap" style={{ display: "none" }}></Div>
      <Flex id="result-list">
        {Places?.map((item, i) => (
          <Flex key={i} style={{ marginTop: "20px" }}>
            <Flex fd="row" margin="-16px 20px 0px -10px" jc="space-between">
              <Span variant="other" mg="5px 0px 0px 15px">
                0{i + 1} / {item?.place_name}
              </Span>
              <StBtn
                type="button"
                onClick={() => {
                  setSchedule({
                    ...schedule,
                    place: {
                      placeName: item.place_name,
                      address: item.address_name,
                    },
                  });
                  openMap();
                }}
              >
                <Svg variant="locationBegie" />
              </StBtn>
            </Flex>
            {item?.road_address_name ? (
              <>
                {/* <Span variant="small">{item.road_address_name}</Span> */}
                <Span variant="other" mg="0px 0px 0px 30px">
                  {item?.address_name}
                </Span>
              </>
            ) : (
              <Span variant="other" mg="0px 0px 0px 30px">
                {item?.address_name}
              </Span>
            )}

            <Span variant="other" mg="0px 0px 0px 30px">
              {item.phone}
            </Span>
            <StDiv></StDiv>
          </Flex>
        ))}
        <div id="pagination" style={{ display: "none" }}></div>
      </Flex>
    </StContainerDiv>
  );
};

export default KakaoMap;

const StContainerDiv = styled.div`
  background: #ffffff;
  border: 1px solid #d9d3c7;
  box-shadow: 5px 5px 15px rgba(164, 161, 157, 0.15);
  border-radius: 5px;
  position: absolute;
  top: 623px;
  right: 20px;
  width: 314px;
  height: 290px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    background: #d9d9d9;
    width: 6px;
    height: 100%;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #a4a19d;
  }
  &::-webkit-scrollbar-track {
    width: 0;
    height: auto;
  }
`;

const StDiv = styled.div`
  background-color: transparent;
  border-bottom: 1px solid #d9d3c7;
`;

const StBtn = styled.button`
  border: none;
  position: absolute;
  right: 10px;
  background-color: transparent;
  width: 30px;
  font-size: 14px;
  cursor: pointer;
`;
