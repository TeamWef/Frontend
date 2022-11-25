import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Mypage from "../../mypage/Mypage";
import Svg from "../../../elem/Svg";
import { deleteCookie } from "../../../redux/modules/customCookies";
import { Flex, Margin } from "../../../elem";

export const Header = () => {
  const navigate = useNavigate();
  const param = useParams();

  const goHome = () => {
    navigate("/");
  };

  const logoutHandler = () => {
    deleteCookie("token");
    deleteCookie("refresh-token");
    alert("로그아웃 되었습니다.");
    window.location.reload();
  };
  console.log(param);

  return (
    <BaseContainer>
      <CenterBox>
        <Svg variant="mainIcon" onClick={goHome} />
        <UserBox>
          <Flex fd="row">
            {param.partyId !== undefined && (
              <>
                <MenuBtn
                  onClick={() => {
                    navigate(`/${param.partyId}`);
                  }}
                >
                  Home
                </MenuBtn>
                <MenuBtn
                  onClick={() => {
                    navigate(`/${param.partyId}/schedule`);
                  }}
                >
                  Schedule
                </MenuBtn>
                <MenuBtn
                  onClick={() => {
                    navigate(`/${param.partyId}/album`);
                  }}
                >
                  Album
                </MenuBtn>
              </>
            )}
            <Margin mg="5px" />
            <Svg variant="invite" />
            <Svg variant="notification" />
            <MenuBtn onClick={logoutHandler}>Logout</MenuBtn>
            <Margin mg="5px" />
            <UserInfo>
              <Mypage />
            </UserInfo>
          </Flex>
        </UserBox>
      </CenterBox>
    </BaseContainer>
  );
};

const BaseContainer = styled.div`
  position: fixed;
  top: 0;
  background-color: #ede8e1;
  width: 1980px;
  height: 74px;
  z-index: 9;
`;

const CenterBox = styled.div`
  width: 1075px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: space-between;
  margin-top: 16.5px;
`;

const UserBox = styled.div``;

const UserInfo = styled.div`
  position: relative;
  width: 120px;
  max-width: 120px;
  height: 36px;
  border-radius: 25px;
  margin-top: 1px;
  background-color: #f8f5f0;
`;

const MenuBtn = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  padding: 10px;
  font-size: 13px;
  cursor: pointer;
`;
