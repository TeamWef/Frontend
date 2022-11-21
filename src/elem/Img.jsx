const Img = ({ variant }) => {
  switch (variant) {
    case "kakao":
      return (
        <img width="50px" height="50px" src="/images/kakao.png" alt="kakao" />
      );
    default:
      break;
  }
};

export default Img;
