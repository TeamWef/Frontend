import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useModal } from "../../hooks/useModal";
import { __getMypage } from "../../redux/modules/mypageSlice";
import EditMypage from "./component/EditMypage";

const Mypage = () => {
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.mypage.myProfile);
  const { memberName, profileImageUrl } = myProfile;

  // 마이페이지 창 띄우기
  const [modal, openModal] = useModal();

  useEffect(() => {
    dispatch(__getMypage());
  }, [dispatch]);

  return (
    <>
      <StDiv onClick={openModal}>
        <StP>{memberName}</StP>
        {profileImageUrl === null ? (
          <Stimg src="/images/userProfile.jpg" />
        ) : (
          <Stimg src={profileImageUrl} alt="profileImg" />
        )}
      </StDiv>
      {modal && <EditMypage myProfile={myProfile} openModal={openModal} />}
    </>
  );
};

export default Mypage;

const StDiv = styled.div`
  display: flex;
  min-width: 110px;
  width: auto;
  justify-content: space-between;
`;

const Stimg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top: 3px;
  margin-right: 5px;
  object-fit: cover;
`;

const StP = styled.p`
  display: flex;
  justify-content: center;
  width: auto;
  margin-left: 30px;
  vertical-align: middle;
  margin-top: 10px;
  font-weight: 600;
`;
