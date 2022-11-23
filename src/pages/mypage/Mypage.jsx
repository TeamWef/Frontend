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
        <Stimg src={profileImageUrl} alt="profileImg" />
      </StDiv>
      {modal && <EditMypage myProfile={myProfile} openModal={openModal} />}
    </>
  );
};

export default Mypage;

const StDiv = styled.div`
  display: flex;
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
  width: 100%;
  margin-left: 30px;
  vertical-align: middle;
  margin-top: 10px;
  font-weight: 600;
`;
