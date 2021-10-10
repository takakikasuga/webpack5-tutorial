import webpackImage from "./webpack-image.jpeg";
import "./image.scss";

class WebpackImage {
  render() {
    const img = document.createElement("img");
    img.src = webpackImage;
    img.alt = "webpackImage";
    img.classList.add("webpack-image");

    const bodyDomElement = document.querySelector("body");
    bodyDomElement.appendChild(img);
  }
}

export default WebpackImage;
