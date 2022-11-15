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
        <Stimg src={profileImageUrl} alt="profileImg" />
        <span>{memberName}</span>
      </StDiv>
      {modal && <EditMypage myProfile={myProfile} openModal={openModal} />}
    </>
  );
};

export default Mypage;

const StDiv = styled.div`
  margin: 10px;
`;

const Stimg = styled.img`
  width: 100px;
  height: 100px;
`;
