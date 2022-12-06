export const ServerUrl = process.env.REACT_APP_BASE_URL;

//kakao login
const REDIRECT_URI =
  "https://main.daegm2i4mn3we.amplifyapp.com//members/kakao/callback";
const REST_API_KEY = "e19d1426333e06b682ab242673374c0f";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

//google login
