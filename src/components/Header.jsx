import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Mypage from "../pages/mypage/Mypage";
import Svg from "../elem/Svg";
import { deleteCookie } from "../redux/modules/customCookies";
import { Flex, Margin } from "../elem";
import Notice from "../pages/notice/Notice";
import { Invite } from "../pages/invite/Invite";
import { Chat } from "../pages/chat/component/Chat";

export const Header = () => {
  const navigate = useNavigate();
  const param = useParams();

  const goHome = () => {
    localStorage.clear();
    navigate("/");
  };

  const logoutHandler = () => {
    deleteCookie("token");
    deleteCookie("refresh-token");
    localStorage.clear();
    navigate("/");
  };
  // console.log(param);

  return (
    <>
      <BaseContainer>
        <CenterBox>
          <Svg variant="mainIcon" onClick={goHome} />
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
            <Invite />
            <Notice />
            <MenuBtn
              onClick={() => {
                logoutHandler();
                alert("로그아웃 되었습니다.");
                window.location.reload();
              }}
            >
              Logout
            </MenuBtn>
            <Margin mg="5px" />
            <UserInfo>
              <Mypage />
            </UserInfo>
          </Flex>
        </CenterBox>
        {param.partyId !== undefined ? <Chat /> : null}
      </BaseContainer>
    </>
  );
};

const BaseContainer = styled.div`
  position: fixed;
  top: 0;
  background-color: #ede8e1;
  width: 100%;
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

const UserInfo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: auto;
  height: 36px;
  padding: 0 15px;
  border-radius: 25px;
  margin-top: 1px;
  background-color: #f8f5f0;
`;

const MenuBtn = styled.button`
  height: 40px;
  border-radius: 15px;
  background-color: transparent;
  border: none;
  display: flex;
  padding: 10px;
  font-size: 13px;
  cursor: pointer;
`;
