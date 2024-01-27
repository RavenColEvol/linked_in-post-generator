import * as ReactDOMServer from "react-dom/server";
import { Backgrounds, IColor } from "../App";
import { Blobs, Circles, Dots, Triangle } from "./backgroundPatterns";

const backgrounds = {
  dots: Dots,
  circle: Circles,
  triangle: Triangle,
  blobs: Blobs,
};

export const getBg = (background: Backgrounds, color: IColor) => {
  const Component = backgrounds[background];
  const uri = encodeURIComponent(
    ReactDOMServer.renderToStaticMarkup(<Component {...color} />)
  );
  return `url("data:image/svg+xml, ${uri}")`;
};
