// import styled, { css } from "styled-components";

// const Svg = ({ variant, onClick }) => {
//   return (
//     <IconWrap>
//       <IconSvg variant={variant} onClick={onClick}></IconSvg>
//     </IconWrap>
//   );
// };

// const IconSvg = ({ variant, onClick }) => {
//   switch (variant) {
//     case "kakao":
//       return (
//         <svg
//           width="50"
//           height="50"
//           viewBox="0 0 50 50"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           xmlns:xlink="http://www.w3.org/1999/xlink"
//         >
//           <rect width="50" height="50" fill="url(#pattern0)" />
//           <defs>
//             <pattern
//               id="pattern0"
//               patternContentUnits="objectBoundingBox"
//               width="1"
//               height="1"
//             >
//               <use xlink:href="#image0_82_390" transform="scale(0.00507614)" />
//             </pattern>
//             <image
//               id="image0_82_390"
//               width="197"
//               height="197"
//               xlink:href="data:image/png;base64,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"
//             />
//           </defs>
//         </svg>
//       );
//     default:
//       break;
//   }
// };

// const IconWrap = styled.div`
//   height: 24px;
//   width: 24px;
//   overflow: hidden;
//   position: relative;
//   margin-right: 15px;
//   margin-top: 7px;
//   :hover {
//     opacity: 0.5;
//   }
// `;

// export default Svg;
