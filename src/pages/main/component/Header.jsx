import styled from "styled-components";

export const Header = () => {
  return (
    <BaseContainer>
      <CenterBox>
        <Logo></Logo>
        <UserBox>
          <Alert></Alert>
          <Logout>logout</Logout>
          <UserInfo></UserInfo>
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

const Logo = styled.div`
  width: 163px;
  height: 61px;
  margin-top: 6px;
  /* padding: 14px 51px 14px 51px; */
  border: 1px solid black;
  border-radius: 30px;
  background-color: #ffffff19;
`;

const UserBox = styled.div`
  background-color: #ede8e1;
  width: 300px;
  height: 38px;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  right: 1%;
  @media screen and (max-width: 1435px) {
    position: absolute;
    right: 10%;
  }
  @media screen and (max-width: 1235px) {
    position: absolute;
    right: 25%;
  }
  @media screen and (max-width: 1035px) {
    position: absolute;
    right: 35%;
  }
  @media screen and (max-width: 835px) {
    position: absolute;
    right: 50%;
  }
`;

const Alert = styled.div`
  background-color: lightgray;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  margin-top: 9px;
`;

const Logout = styled.button`
  background-color: transparent;
  margin-top: 10px;
  border: none;
  width: 37px;
  height: 18px;
`;

const UserInfo = styled.div`
  width: 183px;
  height: 36px;
  border-radius: 25px;
  margin-top: 1px;
  background-color: white;
`;
