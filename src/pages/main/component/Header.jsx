import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Mypage from "../../mypage/Mypage";
import Svg from "../../../elem/Svg";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <BaseContainer>
      <CenterBox>
        <Logo
          onClick={() => {
            navigate("/");
          }}
        >
          <Svg variant={"mainIcon"} />
        </Logo>
        <UserBox>
          <Invite>
            <Svg variant={"invite"} />
          </Invite>
          <Alert>
            <Svg variant={"notification"} />
          </Alert>
          <Logout>logout</Logout>
          <UserInfo>
            <Mypage />
          </UserInfo>
        </UserBox>
      </CenterBox>
    </BaseContainer>
  );
};

const BaseContainer = styled.div`
  background-color: #ede8e1;
  width: 1980px;
  height: 74px;
`;

const CenterBox = styled.div`
  background-color: #ede8e1;
  width: 1077px;
  position: absolute;
  left: 25%;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.button`
  width: 180px;
  height: 40px;
  border: none;
  margin-top: 12px;
  background-color: transparent;
  cursor: pointer;
`;

const UserBox = styled.div`
  background-color: #ede8e1;
  width: 230px;
  height: 38px;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  right: 1%;
  @media screen and (max-width: 1435px) {
    position: absolute;
    right: 20%;
  }
  @media screen and (max-width: 1235px) {
    position: absolute;
    right: 35%;
  }
  @media screen and (max-width: 1035px) {
    position: absolute;
    right: 55%;
  }
`;

const Alert = styled.div`
  width: 30px;
  height: 20px;
  margin-left: 5px;
`;

const Invite = styled.div`
  width: 30px;
  height: 20px;
  margin-top: 4px;
`;

const Logout = styled.button`
  background-color: transparent;
  margin-top: 10px;
  margin-right: 10px;
  border: none;
  width: 30px;
  height: 18px;
`;

const UserInfo = styled.div`
  width: 100px;
  height: 36px;
  border-radius: 25px;
  margin-top: 1px;
  background-color: #f8f5f0;
`;
