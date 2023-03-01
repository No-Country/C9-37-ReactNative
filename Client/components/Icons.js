import Svg, { Path, Ellipse } from "react-native-svg";

/* Iconos de la App en formato SVG reciben el prop color para cambiar el color dinamicamente */

export const HomeIcon = ({ color }) => {
  return (
    <Svg height="24" viewBox="0 0 32 32" width="32px" fill={color}>
      <Path d="M29.707,15.793l-13-13c-0.391-0.391-1.023-0.391-1.414,0l-13,13c-0.391,0.391-0.391,1.023,0,1.414s1.023,0.391,1.414,0  L16,4.914l8.014,8.014C24.013,12.953,24,12.975,24,13v15H8V18c0-0.553-0.448-1-1-1s-1,0.447-1,1v11c0,0.553,0.448,1,1,1h18  c0.553,0,1-0.447,1-1V14.914l2.293,2.293C28.488,17.402,28.744,17.5,29,17.5s0.512-0.098,0.707-0.293  C30.098,16.816,30.098,16.184,29.707,15.793z"></Path>
    </Svg>
  );
};

export const SearchIcon = ({ color }) => {
  return (
    <Svg className="mr-1.5" viewBox="0 0 512 512" width="28" height="28" fill={color}>
      <Path d="M221.12,389.43A173.22,173.22,0,0,1,98.25,338.61c-67.75-67.75-67.75-178,0-245.74s178-67.75,245.74,0A173.69,173.69,0,0,1,221.12,389.43Zm0-317.39a143.37,143.37,0,0,0-101.66,42c-56,56.06-56,147.26,0,203.32A143.77,143.77,0,1,0,322.78,114.08h0A143.35,143.35,0,0,0,221.12,72Z"></Path>
      <Path d="M221.12,332.16a116.42,116.42,0,1,1,82.36-34.06A116.1,116.1,0,0,1,221.12,332.16Zm0-202.86a86.44,86.44,0,1,0,61.15,25.29A86.22,86.22,0,0,0,221.12,129.3Z"></Path>
      <Path d="M414.82,450.44a40.78,40.78,0,0,1-29-12L302.89,355.5a15,15,0,0,1,21.22-21.22L407,417.21a11,11,0,1,0,15.55-15.55l-82.93-82.93a15,15,0,1,1,21.22-21.22l82.93,82.93a41,41,0,0,1-29,70Z"></Path>
    </Svg>
  );
};

export const PawIcon = ({ color }) => {
  return (
    <Svg viewBox="0 0 512 512" height="24" width="24" fill={color}>
      <Path d="M442.8,361.82C434,336.72,413.49,324,393.69,311.7c-17.23-10.71-33.5-20.83-44.14-39C320.22,222.37,304.11,192,256.06,192s-64.21,30.38-93.61,80.69c-10.65,18.21-27,28.35-44.25,39.08-19.8,12.31-40.27,25-49.1,50.05A78.06,78.06,0,0,0,64,390.11C64,430.85,96.45,464,132.4,464s83.31-18.13,123.76-18.13S343.31,464,379.71,464,448,430.85,448,390.11A78.3,78.3,0,0,0,442.8,361.82Z"></Path>
      <Ellipse cx="72" cy="216" rx="56" ry="72"></Ellipse>
      <Ellipse cx="184" cy="120" rx="56" ry="72"></Ellipse>
      <Ellipse cx="328" cy="120" rx="56" ry="72"></Ellipse>
      <Ellipse cx="440" cy="216" rx="56" ry="72"></Ellipse>
    </Svg>
  );
};

export const MessageIcon = ({ color }) => {
  return (
    <Svg viewBox="0 0 32 32" height="24" width="24" fill={color}>
      <Path d="M28.59,4.29a2.23,2.23,0,0,0-2.27-.36L3.41,13.1a1.83,1.83,0,0,0,0,3.38l1.48.61a1,1,0,0,0,1.31-.53,1,1,0,0,0-.54-1.31L4.56,14.8l22.51-9a.22.22,0,0,1,.23,0,.24.24,0,0,1,.08.23L23.27,25.21a.4.4,0,0,1-.26.3.39.39,0,0,1-.39-.06l-8-6.24,7.83-7.91a1,1,0,0,0-1.22-1.56L9.75,16.54a1,1,0,1,0,1,1.72l4.83-2.85L13.23,17.8a2,2,0,0,0,.2,3.08l8,6.15a2.4,2.4,0,0,0,1.47.5,2.47,2.47,0,0,0,.83-.15,2.37,2.37,0,0,0,1.52-1.75L29.33,6.47A2.23,2.23,0,0,0,28.59,4.29Z"></Path>
    </Svg>
  );
};

export const ProfileIcon = ({ color }) => {
  return (
    <Svg viewBox="0 0 32 32" height="24" width="24" fill={color}>
      <Path d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z"></Path>
      <Path d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z"></Path>
    </Svg>
  );
};
export const BackIcon = ({ color }) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
      <Path
        fill={color}
        d="M28 14H8.8l4.62-4.62c.394-.394.58-.864.58-1.38 0-.984-.813-2-2-2-.531 0-.994.193-1.38.58l-7.958 7.958C2.334 14.866 2 15.271 2 16s.279 1.08.646 1.447l7.974 7.973c.386.387.849.58 1.38.58 1.188 0 2-1.016 2-2 0-.516-.186-.986-.58-1.38L8.8 18H28a2 2 0 0 0 0-4z"
      />
    </Svg>
  );
};

export const Github = ({color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <Path
          fill={color}
          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
      />
    </Svg>
  )
}