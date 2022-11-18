export const ServerUrl = process.env.REACT_APP_BASE_URL;

const REDIRECT_URI = "http://localhost:3000/oauth";
const REST_API_KEY = "4b49e4f95cc5c012515945d2ba67ff7d";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
