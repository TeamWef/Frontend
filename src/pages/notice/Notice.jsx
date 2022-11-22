import { useEffect, useRef } from "react";
import { getCookie } from "../../redux/modules/customCookies";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

const Notice = () => {
  const ref = useRef(null);
  const EventSource = EventSourcePolyfill || NativeEventSource;

  useEffect(() => {
    console.log("실행됐음");
    if (window.EventSource) {
      const source = new EventSource("http://3.35.8.178:8080/subscribe", {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      //콘솔 찍어보기
      console.log("eventSource", source);

      source.addEventListener("message", (e) => {
        console.log(e.data);
        // const response = JSON.parse(e.data);
        // console.log(response);
      });

      source.addEventListener(
        "error",
        (e) => {
          if (e) {
            console.log(e);
          }
        },
        []
      );
    }
  });
  return <div>Notice</div>;
};
export default Notice;
