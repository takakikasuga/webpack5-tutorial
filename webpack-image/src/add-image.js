import webpackImage from "./webpack-image.jpeg";
import altText from "./altText.txt";

const addImage = () => {
  const img = document.createElement("img");
  console.log("img", img);
  img.alt = altText;
  img.width = 300;
  img.src = webpackImage;
  const body = document.querySelector("body");
  body.appendChild(img);
};

export default addImage;
