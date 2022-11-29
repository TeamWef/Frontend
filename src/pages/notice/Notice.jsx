import { useEffect, useRef } from "react";
import { getCookie } from "../../redux/modules/customCookies";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { __getNoticeList } from "../../redux/modules/noticeSlice";

const Notice = () => {
  const ref = useRef(null);
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const token = getCookie("token");

  useEffect(() => {
    console.log("첫번째 useEffect실행됐음");
    if (token) {
      const sse = new EventSource("http://43.201.55.218:8080/subscribe", {
        headers: {
          Authorization: `${token}`,
        },
      });

      sse.onopen = (e) => {
        console.log("연결완료");
      };

      sse.onmessage = async (event) => {
        const res = await event.data;
        console.log("res =>", res);
        // const response = JSON.parse(e.data);
        // console.log(response);
      };

      // sse.addEventListener("sse", (e) => {
      // const response = JSON.parse(e.data);
      // console.log(response);
      //     if(e.data.startsWith('{')) {
      // setRealtimeAlam((prev) => [JSON.parse(e.data)])
      // });
      sse.addEventListener("sse", (e) => {
        console.log(e.data);
        if (e.data.startsWith("{")) {
          const msg = JSON.parse(e.data);
          console.log(msg);
        }
      });

      sse.addEventListener("error", (e) => {
        if (e) {
          console.log(e);
        }
        // return () => source.close();
      });
      return () => {
        if (token) {
          sse.close();
        }
      };
    }
  }, [token]);

  // useEffect(() => {
  //   console.log("두번째 useEffect실행됐음");
  //   __getNoticeList();
  // });
  return <div>Notice</div>;
};
export default Notice;
