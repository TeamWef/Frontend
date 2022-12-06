import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Div, Flex, Margin, Span, Svg } from "../../../elem";

const { kakao } = window;

const KakaoMap = ({ searchPlace, albumPlace, setAlbumPlace, openModal }) => {
  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([]);

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    // var markers = [];

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
    <StCotainer>
      <div id="myMap" style={{ display: "none" }}></div>
      <Margin mg="-10px" />
      <Div id="result-list" variant="scroll-y" width="448px" height="300px">
        {Places?.map((item, i) => (
          <StListDiv
            key={i}
            onClick={() => {
              setAlbumPlace({
                placeName: item.place_name,
                address: item.address_name,
              });
              openModal();
              setPlaces([]);
            }}
          >
            <Flex fd="row">
              <StSpan>{i < 9 ? "0" + (i + 1) : i + 1}</StSpan>
              <Flex fd="row" jc="space-between" width="370px">
                <div>
                  <h4>{item.place_name}</h4>
                  {item.road_address_name ? (
                    <>
                      <div>
                        <span>{item.road_address_name}</span>
                      </div>
                      <div>
                        <span>({item.address_name})</span>
                      </div>
                    </>
                  ) : (
                    <span>{item.address_name}</span>
                  )}
                  <span>{item.phone}</span>
                </div>
                <Margin mg="5px" />
                <Flex>
                  <Svg variant="locationBegie" />
                </Flex>
              </Flex>
            </Flex>
          </StListDiv>
        ))}
        <div id="pagination" style={{ display: "none" }}></div>
      </Div>
      <Margin mg="-10px" />
    </StCotainer>
  );
};

export default KakaoMap;

const StCotainer = styled.div`
  width: 450px;
  background-color: #fff;
  border: 1px solid #d9d3c7;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
`;
const StListDiv = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  border-top: 1px solid #faf7f2;
  border-bottom: 1px solid #faf7f2;
  color: #d9d3c7;
  :hover {
    background-color: #ede8e1;
    color: #736e69;
  }
`;

const StSpan = styled.span`
  display: flex;
  margin: 0 20px;
  font-weight: bold;
`;
