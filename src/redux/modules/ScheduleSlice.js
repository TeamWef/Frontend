import axios from "axios";
import { ServerUrl } from "../../server";

//게시글 작성
export const __addSchedule = async (payload) => {
  await axios.post(`${ServerUrl}/{partyId}/schedules`, payload);
};
