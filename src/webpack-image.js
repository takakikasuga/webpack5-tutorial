import Heading from "./components/heading/heading.js";
import WebpackImage from "./components/image/image.js";
import _ from "lodash";

const heading = new Heading();
heading.render(_.upperFirst("webpack image"));
const webpackImage = new WebpackImage();
webpackImage.render();
