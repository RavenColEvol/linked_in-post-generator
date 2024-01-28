import * as ReactDOMServer from "react-dom/server";
import { Backgrounds, IColor } from "../App";
import { Blobs, Circles, Dots, Triangle } from "./backgroundPatterns";

const backgrounds = {
  dots: Dots,
  circle: Circles,
  triangle: Triangle,
  blobs: Blobs,
};

export const getBgSVG = (background: Backgrounds, color: IColor) => {
  const Component = backgrounds[background];
  return ReactDOMServer.renderToStaticMarkup(<Component {...color} />)
}

export const getBg = (background: Backgrounds, color: IColor) => {
  const uri = encodeURIComponent(getBgSVG(background, color));
  return `url("data:image/svg+xml,${uri}")`;
};
